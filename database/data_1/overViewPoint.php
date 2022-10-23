<?php
    include '../database.php';
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $sql = "SELECT * FROM `results` JOIN classes ON results.classId = classes.classId
    JOIN schedule ON classes.classId = schedule.classId JOIN teachers ON teachers.teacherId = schedule.teacherId GROUP BY className 
    HAVING results.studentId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[4]]);
            $result = $statement->fetchAll();
            echo json_encode($result);
?>