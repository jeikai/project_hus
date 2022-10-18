<?php
    include './database.php';
    $path = explode('/', $_SERVER['REQUEST_URI']); 
    $sql = "SELECT * FROM classes JOIN results ON results.classId = classes.classId JOIN students ON results.studentId = students.studentId WHERE students.studentId = $path[3]";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();
    echo json_encode($result);
?>