package attendance.management.attendance;

import attendance.management.utility.PageUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("attendance")
@CrossOrigin
@RequiredArgsConstructor
@Slf4j
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/getuser")
    public ResponseEntity<List<AttendanceResponseListDto>> studentList(
            @RequestBody AttendanceListReqDto attendanceListReqDto
            ) {
        List<AttendanceResponseListDto> attendanceResponseDtos = attendanceService.studentList(attendanceListReqDto);
        return ResponseEntity.ok(attendanceResponseDtos);
    }

    @PostMapping("/attupdate")
    public ResponseEntity<Attendance> unlogged(@RequestBody AttendanceReqDto attendanceReqDto) {
        Attendance attendance = attendanceService.attadd(attendanceReqDto);
        return ResponseEntity.ok(attendance);
    }

    @DeleteMapping("/attdelete/{idx}")
    public ResponseEntity<Attendance> delete(@PathVariable("idx") long idx) {
        Attendance attendance = attendanceService.attdelete(idx);
        return ResponseEntity.ok(attendance);
    }

    @GetMapping("/student")
    public ResponseEntity<AttendanceResponsePageDto> studentFindAll(
            @RequestParam(name = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestHeader("Authorization") String token
    ) {
        AttendanceResponsePageDto attendanceResponsePageDto = attendanceService.studentPage(PageUtil.getPageable(pageNum, size), token);
        return ResponseEntity.ok(attendanceResponsePageDto);
    }

    @GetMapping("/teacher")
    public ResponseEntity<AttendanceResponsePageDto> teacherFindAll(
            @RequestParam(name = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestHeader("Authorization") String token
    ) {
        AttendanceResponsePageDto attendanceResponsePageDto = attendanceService.teacherPage(PageUtil.getPageable(pageNum, size), token);
        return ResponseEntity.ok(attendanceResponsePageDto);
    }

    @GetMapping("/manager")
    public ResponseEntity<AttendanceResponsePageDto> managerFindAll(
            @RequestParam(name = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestHeader("Authorization") String token
    ) {
        AttendanceResponsePageDto attendanceResponsePageDto = attendanceService.managerPage(PageUtil.getPageable(pageNum, size));
        return ResponseEntity.ok(attendanceResponsePageDto);
    }

//    @GetMapping("/attview")
//    public ResponseEntity<Attendance> attview(@RequestParam(name = "id") long id) {
//        Attendance attendance = attendanceService.attview(id);
//        return ResponseEntity.ok(attendance);
//    }

}
