<?php
    include './database.php';
    $path = explode('/', $_SERVER['REQUEST_URI']);
    // $sql = "SELECT * FROM exercise WHERE classId = $path[3]";
    $sql = "SELECT students.studentId, schedule.startLesson, schedule.endLesson, 
                schedule.DAY, classes.className 
            FROM schedule JOIN classes ON schedule.classId = classes.classId 
            JOIN results ON results.classId = classes.classId 
            JOIN students ON students.studentId = results.studentId 
            WHERE students.studentId = $path[3]";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();
    echo json_encode($result);
?>