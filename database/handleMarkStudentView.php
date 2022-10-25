<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
                $sql = "SELECT * FROM exercisedetails JOIN students
                ON exercisedetails.studentId = students.studentId  WHERE exerciseId = ?";
                $statement = $connection->prepare($sql);
                $statement->execute([$path[3]]);
                $result = $statement->fetchAll();
                echo json_encode($result);
            break;
    }
?>