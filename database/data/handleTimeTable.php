<?php
require './connectDB.php';


$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "DELETE":
        $id = htmlspecialchars(isset($_GET['id']) ? $_GET['id'] : '');
        $delete = htmlspecialchars(isset($_GET['delete']) ? $_GET['delete'] : '');
        if ($delete == true &&  $delete != '') {
            try {
                if ($connection != null) {

                    $sql = 'DELETE FROM `timetable` WHERE timetableId = ?';
                    $statement = $connection->prepare($sql);
                    $statement->execute([$id]);
                    if (($statement->rowCount()) == 1) {
                        $response = ['status' => 1, 'message' => 'Timetable deleted successfully.'];
                        echo json_encode($response);
                    } else {
                        $response = ['status' => 0, 'message' => 'Something went wrong!'];
                        echo json_encode($response);
                    }
                }
            } catch (PDOException $e) {
                echo "Cannot query data. Error: " . $e->getMessage();
            }
        }
        break;
    case "GET":
        $id = htmlspecialchars(isset($_GET['id']) ? $_GET['id'] : '');
        $delete = htmlspecialchars(isset($_GET['delete']) ? $_GET['delete'] : '');

        if ($delete == '') {
            try {
                if ($connection != null) {

                    $sql = 'SELECT * FROM `timetable` WHERE classId = ?';
                    $statement = $connection->prepare($sql);
                    $statement->execute([$id]);
                    $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                    $class = $statement->fetchAll();
                    echo json_encode($class);
                }
            } catch (PDOException $e) {
                echo "Cannot query data. Error: " . $e->getMessage();
            }
        }
        break;

    case "POST":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        // $method = htmlspecialchars(isset($path[4]) ? $path[4] : '');

        $edit = htmlspecialchars(isset($_POST['edit']) ? $_POST['edit'] : '');
        $classId = htmlspecialchars(isset($_POST['classId']) ? $_POST['classId'] : '');
        $startLesson = htmlspecialchars(isset($_POST['startLesson']) ? $_POST['startLesson'] : '');
        $endLesson = htmlspecialchars(isset($_POST['endLesson']) ? $_POST['endLesson'] : '');
        $day = htmlspecialchars(isset($_POST['DAY']) ? $_POST['DAY'] : '');
        $timetableId = htmlspecialchars(isset($_POST['timetableId']) ? $_POST['timetableId'] : '');

        if ($edit == '') {
            try {
                if ($connection != null) {
                    $sql = "INSERT INTO timetable(classId, startLesson, endLesson, `DAY`) VALUES (? , ? , ?, ?)";
                    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $statement = $connection->prepare($sql);
                    $statement->execute([$classId, $startLesson, $endLesson, $day]);
                    if ($statement) {
                        $response = ['status' => 1, 'message' => 'Timetable created successfully.'];
                        echo json_encode($response);
                    } else {
                        $response = ['status' => 0, 'message' => 'Something went wrong!'];
                        echo json_encode($response);
                    }
                }
            } catch (PDOException $e) {
                echo "Cannot query data. Error: " . $e->getMessage();
            }
        } else if ($edit == true && $edit != '') {
            try {
                if ($connection != null) {
                    $sql = "UPDATE timetable SET startLesson = ?, endLesson = ?, `DAY` = ? WHERE timetableId = ? AND classId = ?";
                    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $statement = $connection->prepare($sql);
                    $statement->execute([$startLesson, $endLesson, $day, $timetableId, $classId]);
                    if ($statement) {
                        $response = ['status' => 1, 'message' => 'Timetable edited successfully.'];
                        echo json_encode($response);
                    } else {
                        $response = ['status' => 0, 'message' => 'Something went wrong!'];
                        echo json_encode($response);
                    }
                }
            } catch (PDOException $e) {
                echo "Cannot query data. Error: " . $e->getMessage();
            }
        }


        break;
}
