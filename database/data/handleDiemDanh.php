<?php
require './connectDB.php';


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        try {
            $classId = htmlspecialchars(isset($_POST['classId']) ? $_POST['classId'] : '');
            if ($connection != null) {
                $sql = "SELECT * FROM `results` WHERE classId = ?";

                $statement = $connection->prepare($sql);
                $statement->execute([$classId]);
                $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                $students = $statement->fetchAll();

                $date = date('Y-m-d h:i:s a', time());

                foreach ($students as $student) {
                    $diemdanh = $_POST[$student['studentId']];
                    $studentId = $student['studentId'];
                    $sql = "INSERT INTO `diemdanh` ( `studentId`, `classId`, `DAY`, `status`) VALUES (?, ?, ?, ?)";

                    $statement = $connection->prepare($sql);
                    $statement->execute([$studentId, $classId, $date, $diemdanh]);
                }
                $response = ['status' => 1, 'message' => 'Diem danh thanh cong!!!'];
                echo json_encode($response);
            }
        } catch (PDOException $e) {
            echo "Cannot query data. Error: " . $e->getMessage();
        }
}
