<?php
require './connectDB.php';


$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        try {
            if ($connection != null) {
                $sql = "SELECT * FROM `students` UNION SELECT * FROM `teachers`";

                $statement = $connection->prepare($sql);
                $statement->execute();
                $numUser = $statement->rowCount();

                $sql = "SELECT * FROM `news`";
                $statement = $connection->prepare($sql);
                $statement->execute();
                $numNews = $statement->rowCount();

                $sql = "SELECT * FROM `classes`";
                $statement = $connection->prepare($sql);
                $statement->execute();
                $numClass = $statement->rowCount();
                $response = ["numUser" => $numUser, "numClass" => $numClass, "numNews" => $numNews];
                echo json_encode($response);
            }
        } catch (PDOException $e) {
            echo "Cannot query data. Error: " . $e->getMessage();
        }
        break;
}
