<?php
require './connectDB.php';


$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $email = $_POST['email'];
        $password = $_POST['password'];
        // echo json_encode($email);
        // echo json_encode($password);

        try {
            if ($connection != null) {
                $sql = "SELECT * FROM teachers WHERE email = '$email' AND teacherPassword = '$password'";
                $statement = $connection->prepare($sql);
                $statement->execute();
                $result = $statement->fetch();
                $count = $statement->rowCount();
                if ($count == 1) {
                    echo json_encode($result);
                } else {
                    echo 0;
                }
            }
        } catch (PDOException $e) {
            echo "Cannot query data. Error: " . $e->getMessage();
        }
        break;
}
