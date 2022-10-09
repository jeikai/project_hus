<?php 
    
    include './database.php';
    $id = $_GET['id'];
    $sql = "SELECT * FROM students WHERE id = $id";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();
    echo json_encode($result);
?>