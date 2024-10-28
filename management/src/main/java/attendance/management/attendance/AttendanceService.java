package attendance.management.attendance;

import attendance.management.error.BizException;
import attendance.management.error.ErrorCode;
import attendance.management.jwt.JWTManager;
import attendance.management.lecture.Lecture;
import attendance.management.user.User;
import attendance.management.user.UserRepository;
import attendance.management.userandlecture.UserAndLecture;
import attendance.management.userandlecture.UserAndLectureRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final UserAndLectureRepository userAndLectureRepository;
    private final JWTManager jwtManager;

    public Attendance attadd(AttendanceReqDto attendanceReqDto) {
        User user = userRepository.findByNameAndPhoneNumber(attendanceReqDto.getUser().getName(), attendanceReqDto.getUser().getPhoneNumber()).orElseThrow(()->new BizException(ErrorCode.USER_NOT_FOUND));
        Attendance attendance = attendanceRepository.findByUser_IdxAndAdateAndType(
                user.getIdx(), attendanceReqDto.getAdate(), attendanceReqDto.getOldtype())
                .orElse(null);

        if (attendance == null) {
            attendance = new Attendance();
            attendance.setUser(userRepository
                    .findByNameAndPhoneNumber(
                            attendanceReqDto.getUser().getName(),
                            attendanceReqDto.getUser().getPhoneNumber())
                    .orElseThrow(() -> new BizException(ErrorCode.USER_NOT_FOUND)));
            attendance.setLecture(userAndLectureRepository
                    .findByUser_IdxAndState(attendance.getUser().getIdx(), 1)
                    .orElseThrow(() -> new BizException(ErrorCode.LECTURE_NOT_FOUND)).getLecture());
        }

        attendance.setManageraccept(false);
        attendance.setTeacheraccept(false);
        attendance.setType(attendanceReqDto.getType());
        attendance.setReason(attendanceReqDto.getReason());
        attendance.setApproval(attendanceReqDto.getApproval());
        attendance.setAdate(attendanceReqDto.getAdate());

        attendanceRepository.save(attendance);

        return attendance;
    }


    public AttendanceResponsePageDto studentPage(Pageable pageable, String token) {
        Long userIdx = jwtManager.extractUserIdxFromToken(token);

        Page<Attendance> page = attendanceRepository.findByUser_Idx(userIdx, pageable);

        return mapToAttendanceResponsePageDto(page);
    }

    public AttendanceResponsePageDto teacherPage(Pageable pageable, String token) {
        Long userIdx = jwtManager.extractUserIdxFromToken(token);
        Optional<UserAndLecture> userAndLecture = userAndLectureRepository.findByUser_Idx(userIdx);

        long lectureIdx = userAndLecture.orElseThrow(() -> new BizException(ErrorCode.USER_NOT_FOUND)).getLecture().getIdx();

        Page<Attendance> page = attendanceRepository.findByLecture_Idx(lectureIdx, pageable);

        return mapToAttendanceResponsePageDto(page);
    }


    public AttendanceResponsePageDto managerPage(Pageable pageable) {
        Page<Attendance> page = attendanceRepository.findAll(pageable);

        return mapToAttendanceResponsePageDto(page);
    }

    private AttendanceResponsePageDto mapToAttendanceResponsePageDto(Page<Attendance> page) {

        List<AttendanceResponseDto> filteredList = page
                .getContent()
                .stream()
                .map(attendance -> {
                    AttendanceResponseDto attendanceResponseDto = modelMapper.map(attendance, AttendanceResponseDto.class);
                    attendanceResponseDto.setUser((attendance.getUser() != null) ? attendance.getUser().getName() : "탈퇴한 회원");
                    attendanceResponseDto.setLecture((attendance.getLecture() != null) ? attendance.getLecture().getTitle() : "존재하지 않는 강좌");
                    attendanceResponseDto.setTeacheraccept(attendance.isTeacheraccept() ? "담당교사 확인 완료" : "담당교사 확인 대기중");
                    attendanceResponseDto.setManageraccept(attendance.isManageraccept() ? "행정실 확인 완료" : "행정실 확인 대기중");
                    attendanceResponseDto.setApproval((attendance.getApproval() == null) ? null : (attendance.getApproval() ? "승인됨" : "대기중"));
                    return attendanceResponseDto;
                })
                .collect(Collectors.toList());

        AttendanceResponsePageDto attendanceResponsePageDto = modelMapper.map(page, AttendanceResponsePageDto.class);
        attendanceResponsePageDto.setList(filteredList);
        attendanceResponsePageDto.setTotalElements(page.getTotalElements());

        return attendanceResponsePageDto;

    }

    public List<AttendanceResponseListDto> studentList(AttendanceListReqDto attendanceListReqDto) {
        User user = attendanceListReqDto.getUser();
        user = userRepository.findByNameAndPhoneNumber(user.getName(), user.getPhoneNumber()).orElseThrow(()->new BizException(ErrorCode.USER_NOT_FOUND));

        List<Attendance> attendanceList = attendanceRepository.findByUser_IdxAndAdate(user.getIdx(), attendanceListReqDto.getMonth());

        if(attendanceList.isEmpty()){
            Lecture lecture = userAndLectureRepository.findByUser_IdxAndState(user.getIdx(), 1).orElseThrow(()->new BizException(ErrorCode.LECTURE_NOT_FOUND)).getLecture();
            attendanceList.add(new Attendance(null, null, null, null, null, lecture, false, false, null));
        }

        List<AttendanceResponseListDto> attendanceResponseDtoList = attendanceList
                .stream()
                .map(attendance -> {
                    AttendanceResponseListDto attendanceResponseListDto = modelMapper.map(attendance, AttendanceResponseListDto.class);
                    attendanceResponseListDto.setLecture(attendance.getLecture().getTitle());
                    attendanceResponseListDto.setTeacheraccept(attendance.isTeacheraccept() ? "담당교사 확인 완료" : "담당교사 확인 대기중");
                    attendanceResponseListDto.setManageraccept(attendance.isManageraccept() ? "행정실 확인 완료" : "행정실 확인 대기중");
                    attendanceResponseListDto.setApproval((attendance.getApproval() == null) ? null : (attendance.getApproval() ? "승인됨" : "대기중"));
                    return attendanceResponseListDto;
                }).toList();

        return attendanceResponseDtoList;
    }

    public Attendance attdelete(long idx) {
        Attendance attendance = attendanceRepository.findById(idx).orElseThrow(()->new BizException(ErrorCode.ATTENDANCE_NOT_FOUND));
        attendanceRepository.delete(attendance);
        return attendance;
    }
}
