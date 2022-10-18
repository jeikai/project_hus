<?php 
    
    include './database.php';
    // $id = $_GET['id'];
    // $sql = "SELECT * FROM users";
    $path = explode('/', $_SERVER['REQUEST_URI']);
    // echo json_encode($path[4]);  
    $sql = "SELECT * FROM students JOIN results ON students.studentId = results.studentId WHERE classId = $path[3]";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();
    echo json_encode($result);
?>