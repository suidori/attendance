package attendance.management.attendance;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AttendanceResponseListDto {

    private String type;
    private String reason;
    private LocalDate adate;
    private String lecture;
    private String teacheraccept;
    private String manageraccept;
}
