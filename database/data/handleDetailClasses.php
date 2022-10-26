<?php
require './connectDB.php';


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $status = htmlspecialchars(isset($path[4]) ? $path[4] : '');
        $id = htmlspecialchars(isset($path[5]) ? $path[5] : '');
        $classId = htmlspecialchars(isset($path[6]) ? $path[6] : '');

        if ($status == "Teacher") {
            try {
                if ($connection != null) {
                    $delete_query = "DELETE FROM `schedule` WHERE teacherId = :id AND classId = :classId";

                    $delete_query = $connection->prepare($delete_query);
                    $delete_query->bindParam(':id', $id);
                    $delete_query->bindParam(':classId', $classId);
                    $delete_query->execute();

                    if ($delete_query->rowCount() > 0) {
                        $response = ['status' => 1, 'message' => 'Teacher deleted successfully!'];
                    } else {
                        $response = ['status' => 0, 'message' => 'Something went wrong!'];
                    }
                    echo json_encode($response);
                }
            } catch (PDOException $e) {
                echo "Cannot query data. Error: " . $e->getMessage();
            }
        } else if ($status == "Student") {
            try {
                if ($connection != null) {
                    $delete_query = "DELETE FROM `results` WHERE studentId = :id AND classId = :classId";

                    $delete_query = $connection->prepare($delete_query);
                    $delete_query->bindParam(':id', $id);
                    $delete_query->bindParam(':classId', $classId);
                    $delete_query->execute();

                    if ($delete_query->rowCount() > 0) {
                        $response = ['status' => 1, 'message' => 'Student deleted successfully!'];
                    } else {
                        $response = ['status' => 0, 'message' => 'Something went wrong!'];
                    }
                    echo json_encode($response);
                }
            } catch (PDOException $e) {
                echo "Cannot query data. Error: " . $e->getMessage();
            }
        }

        break;

    case 'GET':
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $id = htmlspecialchars(isset($path[4]) ? $path[4] : '');

        if (!empty($id) && $id != '' && is_numeric($id)) {
            $sql = 'SELECT `teachers`.`teacherId` AS trueId, row_number()over(order by `teachers`.`teacherId`) AS Id, `teachers`.`teacherName` AS Name, `teachers`.`teacherPhone`  AS Phone, `teachers`.`email`  AS Email, `classes`.`className`  AS ClassName, "Teacher" AS Role 
            FROM `teachers` JOIN `schedule` ON `teachers`.`teacherId` = `schedule`.`teacherId` JOIN  `classes` ON  `schedule`.`classId` = `classes`.`classId` WHERE `classes`.`classId` = :id
            UNION
            SELECT `students`.`studentId`  AS trueId, (row_number()over(order by  `students`.`studentId`) + :number1) AS Id , `students`.`studentName`  AS Name, `students`.`phoneNumber`  AS Phone, `students`.`email` AS Email, `classes`.`className`  AS ClassName,  "Student" AS Role 
            FROM `students` JOIN `results` ON  `students`.`studentId` =  `results`.`studentId` JOIN `classes` ON `results`.`classId` = `classes`.`classId` WHERE `classes`.`classId` = :id AND `results` . `status` = 1';
            try {
                if ($connection != null) {
                    $number = "SELECT * FROM `schedule` WHERE `schedule`.`classId` = :id";
                    $number = $connection->prepare($number);
                    $number->bindParam(':id', $id);
                    $number->execute();
                    $number = $number->rowCount();

                    $statement = $connection->prepare($sql);
                    $statement->bindParam(':number1', $number);
                    $statement->bindParam(':id', $id);
                    $statement->execute();
                    $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                    $userInClass = $statement->fetchAll();
                    echo json_encode($userInClass);
                }
            } catch (PDOException $e) {
                echo "Cannot query data. Error: " . $e->getMessage();
            }
        }
        break;

    case "POST":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $id = htmlspecialchars(isset($path[4]) ? $path[4] : '');
        $role = htmlspecialchars(isset($path[5]) ? $path[5] : '');
        $emails = $_POST['emails'];

        if (is_string($role) && isset($role) && $role == "teacher") {
            foreach ($emails as $email) {
                try {
                    if ($connection != null) {
                        $find_id = "SELECT teacherId FROM teachers WHERE email = ?";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($find_id);
                        $statement->execute([$email]);
                        $teacher_id = $statement->fetch();

                        if (isset($teacher_id["teacherId"])) {
                            //check if already in class
                            $already_in_class = "SELECT * FROM schedule WHERE classId = ? && teacherId =?";
                            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $statement = $connection->prepare($already_in_class);
                            $statement->execute([$id, $teacher_id["teacherId"]]);
                            $number = $statement->rowCount();
                            if ($number == 0) {
                                $add_to_class = "INSERT INTO schedule(classId, teacherId) VALUES (?, ?)";
                                $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                                $statement = $connection->prepare($add_to_class);
                                $statement->execute([$id, $teacher_id["teacherId"]]);
                            }
                        }
                    }
                } catch (PDOException $e) {
                    echo "Cannot query data. Error: " . $e->getMessage();
                }
            }
            $response = ['status' => 1, 'message' => 'Teacher(s) added to class successfully.'];
            echo json_encode($response);
        } else if (is_string($role) && isset($role) && $role == "student") {
            foreach ($emails as $email) {
                try {
                    if ($connection != null) {
                        $find_id = "SELECT studentId FROM students WHERE email = ?";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($find_id);
                        $statement->execute([$email]);
                        $student_id = $statement->fetch();

                        if (isset($student_id["studentId"])) {
                            //check if already in class
                            $already_in_class = "SELECT * FROM results WHERE classId = ? && studentId =?";
                            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $statement = $connection->prepare($already_in_class);
                            $statement->execute([$id, $student_id["studentId"]]);
                            $number = $statement->rowCount();
                            if ($number == 0) {
                                $add_to_class = "INSERT INTO results(classId, studentId, `status`) VALUES (?, ?, 1)";
                                $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                                $statement = $connection->prepare($add_to_class);
                                $statement->execute([$id, $student_id["studentId"]]);
                            }
                        }
                    }
                } catch (PDOException $e) {
                    echo "Cannot query data. Error: " . $e->getMessage();
                }
            }
            $response = ['status' => 1, 'message' => 'Students added to class successfully.'];
            echo json_encode($response);
        }

        break;
}
