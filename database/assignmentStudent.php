<?php 
    
    include './database.php';
    $path = explode('/', $_SERVER['REQUEST_URI']); 
    $sql = "SELECT * FROM assignment WHERE classId = $path[3] ORDER BY `assignment`.`date` DESC";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();
    echo json_encode($result);
?>