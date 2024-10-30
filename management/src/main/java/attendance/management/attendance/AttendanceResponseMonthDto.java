package attendance.management.attendance;

import lombok.Data;

@Data
public class AttendanceResponseMonthDto {

    private String user;
    private String adate;
    private String type;
    private String approval;
}
