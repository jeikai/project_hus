<?php
    include './database.php';
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $sql = "SELECT * FROM exercisedetails RIGHT JOIN exercise ON exercisedetails.exerciseId = exercise.ExerciseId 
    JOIN classes ON exercise.classId = classes.classId 
    WHERE exercise.classId IN (SELECT classId FROM results WHERE classId = $path[3] AND studentId = $path[4]) GROUP BY ExerciseName";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();
    echo json_encode($result);
?>