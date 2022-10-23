<?php 
    include './database.php';
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch($method) {
        case 'POST':
            $email = $_POST['email'];
            $password = $_POST['password'];
            $name = $_POST['name'];
            // echo json_encode($email);
            // echo json_encode($password);
            $sql = "SELECT * FROM students WHERE email = '$email'";
            $statement = $connection->prepare($sql);
            $statement->execute();
            $result = $statement->fetchAll();
            $count = $statement->rowCount();
            if($count == 0) {
                // echo json_encode($result);    
                $sql = "INSERT INTO students (studentName, studentPassword, email) VALUES (?, ?, ?)";
                $connection->prepare($sql)->execute([$name, $password, $email]);
                $sql = "SELECT * FROM students WHERE email = '$email'";
                $statement = $connection->prepare($sql);
                $statement->execute();
                $result = $statement->fetchAll();
                echo json_encode($result);
            }else{
                echo 0;
            }
            // echo json_encode($count);
            break;
        }
?>