<?php 
    include './database.php';
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch($method) {
        case 'POST':
            $email = $_POST['email'];
            $password = $_POST['password'];
            // echo json_encode($email);
            // echo json_encode($password);
            $sql = "SELECT * FROM students WHERE email = '$email' AND studentPassword = '$password'";
            $statement = $connection->prepare($sql);
            $statement->execute();
            $result = $statement->fetchAll();
            $count = $statement->rowCount();
            if($count == 1) {
                echo json_encode($result);    
            }else{
                echo 0;
            }
            // echo json_encode($count);
            break;
        }
?>