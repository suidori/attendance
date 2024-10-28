package attendance.management.attendance;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Page<Attendance> findByUser_Idx(Long userId, Pageable pageable);
    Page<Attendance> findByLecture_Idx(Long lectureId, Pageable pageable);

    @Query("SELECT a FROM Attendance a WHERE a.user.idx = :useridx AND FUNCTION('DATE_FORMAT', a.adate, '%Y-%m') = :adate")
    List<Attendance> findByUser_IdxAndAdate(@Param("useridx") Long userIdx, @Param("adate") String yearMonth);
}
