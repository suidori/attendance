package attendance.management.lecture;

import attendance.management.sign.LoginUserDetails;
import attendance.management.userandlecture.UserAndLecture;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Slf4j
@RequiredArgsConstructor
@RequestMapping("lecture")
public class LectureController {

    private final LectureService lectureService;

    @PostMapping("save")
    public ResponseEntity<Lecture> save(@Valid @RequestBody LectureReqDto lectureReqDto) {
        Lecture lecture = lectureService.save(lectureReqDto);
        return ResponseEntity.ok(lecture);
    }

    @PostMapping("join")
    public ResponseEntity<UserAndLecture> join(@RequestBody LectureReqDto lectureReqDto,
                                               @RequestHeader("Authorization") String token) {
        UserAndLecture lecture = lectureService.join(lectureReqDto, token);
        return ResponseEntity.ok(lecture);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Lecture>> findAll() {
        return ResponseEntity.ok(lectureService.findAll());
    }

    @GetMapping("/mylecture")
    public ResponseEntity<List<Lecture>> myLecture(@AuthenticationPrincipal LoginUserDetails loginUserDetails) {
        if (loginUserDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(lectureService.myLecture(loginUserDetails));
    }

}
