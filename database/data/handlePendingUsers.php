<?php
require './connectDB.php';


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "DELETE":
        try {
            if ($connection != null) {
                $id = htmlspecialchars(isset($_GET['id']) ? $_GET['id'] : '');
                $classId = htmlspecialchars(isset($_GET['classId']) ? $_GET['classId'] : '');
                $sql = "DELETE FROM `results` WHERE studentId = ? AND classId = ?";

                $statement = $connection->prepare($sql);
                $statement->execute([$id, $classId]);

                if ($statement->rowCount() > 0) {
                    $response = ['status' => 1, 'message' => 'Delete student pending successfully!'];
                } else {
                    $response = ['status' => 0, 'message' => 'Something went wrong!'];
                }
                echo json_encode($response);
            }
        } catch (PDOException $e) {
            echo "Cannot query data. Error: " . $e->getMessage();
        }
        break;
    case "GET":
        try {
            if ($connection != null) {
                $id = htmlspecialchars(isset($_GET['id']) ? $_GET['id'] : '');
                $sql = "SELECT * FROM `results` JOIN `students` ON `results`.`studentId` =  `students`.`studentId` WHERE `results`.classId = ? AND `results`.`status` = 0";

                $statement = $connection->prepare($sql);
                $statement->execute([$id]);
                $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                $pending = $statement->fetchAll();

                echo json_encode($pending);
            }
        } catch (PDOException $e) {
            echo "Cannot query data. Error: " . $e->getMessage();
        }
        break;

    case "POST":
        try {
            if ($connection != null) {
                $id = htmlspecialchars(isset($_GET['id']) ? $_GET['id'] : '');
                $classId = htmlspecialchars(isset($_GET['classId']) ? $_GET['classId'] : '');
                $sql = "UPDATE `results` SET `status` = 1 WHERE studentId = ? AND classId = ?";

                $statement = $connection->prepare($sql);
                $statement->execute([$id, $classId]);

                if ($statement->rowCount() > 0) {
                    $response = ['status' => 1, 'message' => 'Add pending student to class successfully!'];
                } else {
                    $response = ['status' => 0, 'message' => 'Something went wrong!'];
                }
                echo json_encode($response);
            }
        } catch (PDOException $e) {
            echo "Cannot query data. Error: " . $e->getMessage();
        }
        break;
}
