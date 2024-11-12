DELETE FROM `attendance`
WHERE DAYOFWEEK(`adate`) IN (1, 7);
