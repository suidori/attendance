package attendance.management.attendance;

import lombok.Data;

@Data
public class AttendanceResponseMonthDto {

    private Long useridx;
    private String user;
    private String adate;
    private String type;
    private String approval;
}
