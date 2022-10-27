<?php
require './connectDB.php';


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        try {
            $classId = htmlspecialchars(isset($_GET['classId']) ? $_GET['classId'] : '');
            if ($connection != null) {
                $sql = "SELECT * FROM `diemdanh` WHERE classId = ? GROUP BY `DAY`";

                $statement = $connection->prepare($sql);
                $statement->execute([$classId]);
                $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                $diemdanh = $statement->fetchAll();
                echo (json_encode($diemdanh));
            }
        } catch (PDOException $e) {
            echo "Cannot query data. Error: " . $e->getMessage();
        }
        break;
}
