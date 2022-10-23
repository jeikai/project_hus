<?php
    include '../database.php';
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $sql = "SELECT * FROM Schedule JOIN Classes ON Schedule.classId = Classes.classId JOIN Results ON 
    Classes.classId = Results.classId WHERE Results.studentId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[4]]);
            $result = $statement->fetchAll();
            echo json_encode($result);
?>