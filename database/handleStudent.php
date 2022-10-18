<?php
    include './connetdb.php';
    $path = explode('/', $_SERVER['REQUEST_URI']); 
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case 'GET':
        $sql = "SELECT * FROM Results WHERE classId = $path[3]";
        $statement = $connection->prepare($sql);
        $statement->execute();
        $result = $statement->fetchAll();
        $result = $statement->rowCount();
        echo json_encode($result);
        break;
        }
?>