package attendance.management.lecture;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LectureRepository extends JpaRepository<Lecture, Long> {
    Optional<Lecture> findByTitle(String title);
    List<Lecture> findByIdx(Long idx);
}
