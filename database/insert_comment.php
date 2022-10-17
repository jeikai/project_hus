<?php 
  
    include './database.php';
    // $path = explode('/', $_SERVER['REQUEST_URI']);
    // $sql = "SELECT * FROM comments WHERE classId = $path[3]";
    $id = $_POST['id'];
    $input = $_POST['input'];
    $name = $_POST['name'];
    $sql = "INSERT INTO comments (postId, commentContent, commentName) VALUES (?, ?, ?)";
    $connection->prepare($sql)->execute([$id, $input, $name]);
    // $statement = $connection->prepare($sql);
    // $statement->execute();
    // $result = $statement->fetchAll();
    // echo json_encode($result);
    echo 0;



?>