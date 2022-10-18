<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "SELECT * FROM Schedule JOIN Classes ON Schedule.classId = Classes.classId JOIN Results ON 
            Classes.classId = Results.classId WHERE Results.studentId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
            break;
    }
?>