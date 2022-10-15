<?php 
    
    include './database.php';
    $path = explode('/', $_SERVER['REQUEST_URI']); 
    $sql = "SELECT * FROM comments";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();
    echo json_encode($result);
?>