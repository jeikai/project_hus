<?php
    include '../database.php';
    // $path = explode('/', $_SERVER['REQUEST_URI']); 
    $classId = $_POST['classId'];
    $studentId = $_POST['studentId'];
    $sql = "SELECT * FROM results WHERE classId = $classId AND studentId = $studentId";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();
    if(count($result) == 1){
        $response = 'error';
        echo json_encode($response);
    }else if(count($result) == 0){
        $sql = "INSERT INTO results (classId, studentId) VALUES (?, ?)";
        $connection->prepare($sql)->execute([$classId, $studentId]);
        $response = 'success';
        echo json_encode($response);
    }
?>