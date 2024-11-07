package attendance.management.lecture;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class LectureReqDto {

    private String title;

    private String content;

    private LocalDate startDate;
    private LocalDate endDate;

    private LocalTime startTime;
    private LocalTime endTime;

    private String password;

}
