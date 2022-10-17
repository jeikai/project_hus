<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "SELECT * FROM Schedule a JOIN Classes b ON a.classId = b.classId WHERE a.teacherId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
            break;
    }
?>