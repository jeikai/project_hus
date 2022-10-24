<?php
    include '../database.php';
    $path = explode('/', $_SERVER['REQUEST_URI']); 
    $sql = "SELECT * FROM classes WHERE classId = $path[4]";
    $statement = $connection->prepare($sql);
    $statement->execute();
    // $count = $statement->rowCount();
    $result = $statement->fetchAll();
    if(count($result) != 1){
        $response = 'error';
        echo json_encode($response);
    }else if(count($result) == 1){
        echo json_encode($result);
    }
?>