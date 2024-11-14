UPDATE `vacation` v
JOIN `userandlecture` ul ON v.useridx = ul.user
SET v.lecture = ul.lecture
WHERE v.lecture IS NULL;
