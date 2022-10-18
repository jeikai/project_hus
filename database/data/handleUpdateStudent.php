<?php
require './connectDB.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $sql = "SELECT * FROM students WHERE studentId = :id";

        try {
            if ($connection != null) {

                $statement = $connection->prepare($sql);
                $statement->bindParam(':id', $path[4]);
                $statement->execute();
                $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                $student = $statement->fetch();
                echo json_encode($student);
            }
        } catch (PDOException $e) {
            echo "Cannot query data. Error: " . $e->getMessage();
        }
        break;

    case 'POST':
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if ($path[4] == 'update') {
            try {
                if ($connection != null) {

                    $id = htmlspecialchars(isset($_POST['id']) ? $_POST['id'] : '');
                    $old_image = htmlspecialchars(isset($_POST['old_image']) ? $_POST['old_image'] : '');
                    $image = (isset($_FILES['file']['name']) ? $_FILES['file']['name'] : '');
                    $phoneNumber = htmlspecialchars(isset($_POST['phoneNumber']) ? $_POST['phoneNumber'] : '');
                    $birthDate = htmlspecialchars(isset($_POST['birthDate']) ? $_POST['birthDate'] : '');
                    $studentNewPassword = htmlspecialchars(isset($_POST['studentNewPassword']) ? $_POST['studentNewPassword'] : '');
                    $studentName = htmlspecialchars(isset($_POST['studentName']) ? $_POST['studentName'] : '');
                    $email = htmlspecialchars(isset($_POST['email']) ? $_POST['email'] : '');

                    if (!empty($phoneNumber)) {
                        $sql = "SELECT * FROM students WHERE phoneNumber = ? AND studentId != ?";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($sql);
                        $statement->execute([$phoneNumber, $id]);

                        if ($statement->rowCount() == 0) {
                            $new_query = "UPDATE students SET phoneNumber = ? WHERE studentId = ?";
                            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $statement = $connection->prepare($new_query);
                            $statement->execute([$phoneNumber, $id]);
                        } else {
                            $response = ['status' => 0, 'message' => 'Phone have been used'];
                            echo json_encode($response);
                            exit();
                        }
                    }

                    if (!empty($email)) {
                        $sql = "SELECT * FROM students WHERE email = ? AND studentId != ?";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($sql);
                        $statement->execute([$email, $id]);

                        if ($statement->rowCount() == 0) {
                            $new_query = "UPDATE students SET email = ? WHERE studentId = ?";
                            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $statement = $connection->prepare($new_query);
                            $statement->execute([$email, $id]);
                        } else {
                            $response = ['status' => 0, 'message' => 'Email have been used'];
                            echo json_encode($response);
                            exit();
                        }
                    }

                    if (!empty($image)) {
                        $path = "../../public/assets/studentImgs";
                        $permitted_extensions = ['png', 'jpg', 'jpeg', 'gif'];
                        $imageExt = pathinfo($image, PATHINFO_EXTENSION);
                        $imageSize = $_FILES['file']['size'];
                        $file_name = time() . "-" . $image;


                        if (!in_array($imageExt, $permitted_extensions)) {
                            $response =  ['status' => 0, 'message' => "Invalid new's image type."];
                            echo json_encode($response);
                            exit();
                        } else if ($imageSize > 100000000) {
                            $response =  ['status' => 0, 'message' => "The new's image is too large."];
                            echo json_encode($response);
                            exit();
                        }
                        if ($old_image != '') {
                            if (file_exists("../../public/assets/studentImgs/" . $old_image)) {
                                unlink("../../public/assets/studentImgs/" . $old_image);
                            }
                        }

                        if (move_uploaded_file($_FILES['file']['tmp_name'], $path . "/" . $file_name)) {
                            $new_query = "UPDATE students SET studentImage = ? WHERE studentId = ?";
                            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $statement = $connection->prepare($new_query);
                            $statement->execute([$file_name, $id]);
                        }
                    }

                    if (!empty($birthDate)) {
                        $new_query = "UPDATE students SET birthDate = ? WHERE studentId = ?";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($new_query);
                        $statement->execute([$birthDate, $id]);
                    }
                    if (!empty($studentName)) {
                        $new_query = "UPDATE students SET studentName = ? WHERE studentId = ?";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($new_query);
                        $statement->execute([$studentName, $id]);
                    }
                    if (!empty($studentNewPassword)) {
                        $new_query = "UPDATE students SET studentPassword = ? WHERE studentId = ?";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($new_query);
                        $statement->execute([$studentNewPassword, $id]);
                    }



                    $response = ['status' => 1, 'message' => 'New have been updated successfully.'];
                    echo json_encode($response);
                }
            } catch (PDOException $e) {
                echo "Cannot query data. Error: " . $e->getMessage();
            }
        }
        break;
}
