<?php
    include './database.php';
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $sql = "SELECT * FROM documents WHERE classId = $path[3]";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();
    echo json_encode($result);
?>