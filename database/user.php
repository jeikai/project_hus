<?php 
    include './database.php';
    $path = explode('/', $_SERVER['REQUEST_URI']); 
    $sql = "SELECT * FROM students WHERE studentId = $path[3]";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();
    echo json_encode($result);
?>