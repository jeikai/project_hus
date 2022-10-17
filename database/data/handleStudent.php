<?php
require './connectDB.php';


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $user = json_decode(file_get_contents('php://input'));
        //get user date
        $name = htmlspecialchars(isset($user->name) ? $user->name : '');
        $phone = htmlspecialchars(isset($user->phone) ? $user->phone : '');
        $email = htmlspecialchars(isset($user->email) ? $user->email : '');
        $password = htmlspecialchars(isset($user->password) ? $user->password : '');
        $status = htmlspecialchars(isset($user->status) ? $user->status : '');


        if ($status == 'students') {
            //Check if the email have already used
            $check_email_query = "SELECT email FROM students WHERE email='$email'";


            $check_phone_query = "SELECT phoneNumber FROM students WHERE phoneNumber='$phone'";
            try {
                if ($connection != null) {
                    //Check if the email, phone have already used
                    $check_email_query = $connection->prepare($check_email_query);
                    $check_email_query->execute();
                    $check_phone_query = $connection->prepare($check_phone_query);
                    $check_phone_query->execute();

                    if ($check_email_query->rowCount() > 0 || $check_phone_query->rowCount() > 0) {
                        $response = ['status' => 0, 'message' => 'Phone or email have already been used.'];
                        echo json_encode($response);
                        exit;
                    } else {
                        $insert_query = "INSERT INTO students(studentPassword, studentName, phoneNumber, email) VALUES (?, ?, ?, ?)";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($insert_query);
                        $statement->execute([$password, $name, $phone, $email]);

                        $response = ['status' => 1, 'message' => 'Sutdent created successfully.'];
                        echo json_encode($response);
                    }

                    // $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                    // $students = $statement->fetchAll();
                    // echo json_encode($students);
                }
            } catch (PDOException $e) {
                echo "Cannot query data. Error: " . $e->getMessage();
            }
        }


        if ($status == 'teachers') {
            //Check if the email have already used
            $check_email_query = "SELECT email FROM teachers WHERE email='$email'";


            $check_phone_query = "SELECT teacherPhone FROM teachers WHERE teacherPhone='$phone'";
            try {
                if ($connection != null) {
                    //Check if the email, phone have already used
                    $check_email_query = $connection->prepare($check_email_query);
                    $check_email_query->execute();
                    $check_phone_query = $connection->prepare($check_phone_query);
                    $check_phone_query->execute();

                    if ($check_email_query->rowCount() > 0 || $check_phone_query->rowCount() > 0) {
                        $response = ['status' => 0, 'message' => 'Phone or email have already been used.'];
                        echo json_encode($response);
                        exit;
                    } else {
                        $insert_query = "INSERT INTO teachers(teacherPassword, teacherName, teacherPhone, email) VALUES (?, ?, ?, ?)";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($insert_query);
                        $statement->execute([$password, $name, $phone, $email]);

                        $response = ['status' => 1, 'message' => 'Teacher created successfully.'];
                        echo json_encode($response);
                    }

                    // $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                    // $students = $statement->fetchAll();
                    // echo json_encode($students);
                }
            } catch (PDOException $e) {
                echo "Cannot query data. Error: " . $e->getMessage();
            }
        }



        break;

    case 'GET':


        $sql = 'SELECT teacherId AS trueId, row_number()over(order by teacherId) AS Id, teacherName AS Name, teacherPhone AS Phone, email AS Email, teacherPassword AS Password, "Teacher" AS Role  FROM `teachers`
        UNION
        SELECT studentId AS trueId, (row_number()over(order by studentId) + :number1) AS Id , studentName AS Name, phoneNumber AS Phone, email AS Email, studentPassword AS Password,  "Student" AS Role FROM `students` ';
        try {
            if ($connection != null) {
                $number = "SELECT * FROM `teachers`";
                $number = $connection->prepare($number);
                $number->execute();
                $number = $number->rowCount();

                $statement = $connection->prepare($sql);
                $statement->bindParam(':number1', $number);
                $statement->execute();
                $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                $students = $statement->fetchAll();
                echo json_encode($students);
            }
        } catch (PDOException $e) {
            echo "Cannot query data. Error: " . $e->getMessage();
        }
        break;

    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $status = htmlspecialchars(isset($path[4]) ? $path[4] : '');
        $id = htmlspecialchars(isset($path[5]) ? $path[5] : '');

        if ($status == "Teacher") {
            try {
                if ($connection != null) {
                    $delete_query = "DELETE FROM `teachers` WHERE teacherId = :id";

                    $delete_query = $connection->prepare($delete_query);
                    $delete_query->bindParam(':id', $id);
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
                    $delete_query = "DELETE FROM `students` WHERE studentId = :id";

                    $delete_query = $connection->prepare($delete_query);
                    $delete_query->bindParam(':id', $id);
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
    case 'PUT':
        $user = json_decode(file_get_contents('php://input'));
        $path = explode('/', $_SERVER['REQUEST_URI']);
        //get user data
        $name = htmlspecialchars(isset($user->Name) ? $user->Name : '');
        $phone = htmlspecialchars(isset($user->Phone) ? $user->Phone : '');
        $email = htmlspecialchars(isset($user->Email) ? $user->Email : '');
        $password = htmlspecialchars(isset($user->Password) ? $user->Password : '');
        $status = htmlspecialchars(isset($user->Role) ? $user->Role : '');
        $id = htmlspecialchars(isset($path[4]) ? $path[4] : '');

        if ($status == 'Student') {
            //Check if the email have already used
            $check_email_query = "SELECT email FROM students WHERE email='$email' AND studentId != :id";


            $check_phone_query = "SELECT phoneNumber FROM students WHERE phoneNumber='$phone' AND studentId != :id";
            try {
                if ($connection != null) {
                    //Check if the email, phone have already used
                    $check_email_query = $connection->prepare($check_email_query);
                    $check_email_query->bindParam(':id', $id);
                    $check_email_query->execute();

                    $check_phone_query = $connection->prepare($check_phone_query);
                    $check_phone_query->bindParam(':id', $id);
                    $check_phone_query->execute();

                    if ($check_email_query->rowCount() > 0 || $check_phone_query->rowCount() > 0) {
                        $response = ['status' => 0, 'message' => 'Phone or email have already been used.'];
                        echo json_encode($response);
                        exit;
                    } else {
                        $update_query = "UPDATE students  SET studentPassword = ? , studentName = ?, phoneNumber =? , email = ?  WHERE  studentId =?";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($update_query);
                        $statement->execute([$password, $name, $phone, $email, $id]);

                        $response = ['status' => 1, 'message' => 'Sutdent updated successfully.'];
                        echo json_encode($response);
                    }

                    // $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                    // $students = $statement->fetchAll();
                    // echo json_encode($students);
                }
            } catch (PDOException $e) {
                echo "Cannot query data. Error: " . $e->getMessage();
            }
        }


        if ($status == 'Teacher') {
            //Check if the email have already used
            $check_email_query = "SELECT email FROM teachers WHERE email='$email' AND teacherId != :id";


            $check_phone_query = "SELECT teacherPhone FROM teachers WHERE teacherPhone='$phone' AND teacherId != :id";
            try {
                if ($connection != null) {
                    //Check if the email, phone have already used
                    $check_email_query = $connection->prepare($check_email_query);
                    $check_email_query->bindParam(':id', $id);
                    $check_email_query->execute();

                    $check_phone_query = $connection->prepare($check_phone_query);
                    $check_phone_query->bindParam(':id', $id);
                    $check_phone_query->execute();

                    if ($check_email_query->rowCount() > 0 || $check_phone_query->rowCount() > 0) {
                        $response = ['status' => 0, 'message' => 'Phone or email have already been used.'];
                        echo json_encode($response);
                        exit;
                    } else {
                        $insert_query = "UPDATE teachers  SET teacherPassword = ? , teacherName = ?, teacherPhone =? , email = ?  WHERE  teacherId =?";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($insert_query);
                        $statement->execute([$password, $name, $phone, $email, $id]);

                        $response = ['status' => 1, 'message' => 'Teacher updated successfully.'];
                        echo json_encode($response);
                    }

                    // $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                    // $students = $statement->fetchAll();
                    // echo json_encode($students);
                }
            } catch (PDOException $e) {
                echo "Cannot query data. Error: " . $e->getMessage();
            }
        }

        break;
}
