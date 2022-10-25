<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
                $sql = "SELECT * FROM Exercise  WHERE classId = ?";
                $statement = $connection->prepare($sql);
                $statement->execute([$path[3]]);
                $result = $statement->fetchAll();
                echo json_encode($result);
            break;
    }
?>