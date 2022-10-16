<?php
require './connectDB.php';


$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $id = htmlspecialchars(isset($path[3]) ? $path[3] : '');
        try {
            if ($connection != null) {
                $delete_query = "DELETE FROM `classes` WHERE classId = :id";

                $delete_query = $connection->prepare($delete_query);
                $delete_query->bindParam(':id', $id);
                $delete_query->execute();

                if ($delete_query->rowCount() > 0) {
                    $response = ['status' => 1, 'message' => 'New deleted successfully!'];
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
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $id = htmlspecialchars(isset($path[3]) ? $path[3] : '');
        $sql = 'SELECT classId AS trueId, row_number()over(order by classId DESC) AS Id, className AS className, classImage AS classImage FROM `classes` ORDER BY `classId` DESC';
        try {
            if ($connection != null) {

                if (!empty($id) && is_numeric($id)) {
                    $sql = 'SELECT `classId` AS trueId, className AS className, classImage AS classImage FROM `classes`  WHERE `id` = :id';
                    $statement = $connection->prepare($sql);
                    $statement->bindParam(':id', $id);
                    $statement->execute();
                    $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                    $class = $statement->fetch();
                    echo json_encode($class);
                } else {
                    $statement = $connection->prepare($sql);
                    $statement->execute();
                    $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                    $class = $statement->fetchAll();
                    echo json_encode($class);
                }
            }
        } catch (PDOException $e) {
            echo "Cannot query data. Error: " . $e->getMessage();
        }
        break;

    case "POST":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $method = htmlspecialchars(isset($path[3]) ? $path[3] : '');


        /*update class in hear*/
        if (is_string($method) && isset($method) && $method == "update") {
            $name = htmlspecialchars(isset($_POST['name']) ? $_POST['name'] : '');
            $trueId = htmlspecialchars(isset($_POST['trueId']) ? $_POST['trueId'] : '');
            $old_image = htmlspecialchars(isset($_POST['old_image']) ? $_POST['old_image'] : '');
            $image = isset($_FILES['file']['name']) ? $_FILES['file']['name'] : '';


            /*If have image*/
            if (!empty($image)) {
                $path = "../public/assets/classImgs";
                $permitted_extensions = ['png', 'jpg', 'jpeg', 'gif'];
                $imageExt = pathinfo($image, PATHINFO_EXTENSION);
                $imageSize = $_FILES['file']['size'];
                $file_name = time() . "-" . $image;

                if (!empty($image)) {
                    if (!in_array($imageExt, $permitted_extensions)) {
                        $response =  ['status' => 0, 'message' => "Invalid class's image type."];
                        echo json_encode($response);
                        exit();
                    } else if ($imageSize > 100000000) {
                        $response =  ['status' => 0, 'message' => "The class's image is too large."];
                        echo json_encode($response);
                        exit();
                    }
                }
                if (file_exists("../public/assets/classImgs/" . $old_image)) {
                    unlink("../public/assets/classImgs/" . $old_image);
                }
                try {
                    if ($connection != null) {
                        if (move_uploaded_file($_FILES['file']['tmp_name'], $path . "/" . $file_name)) {
                            $update_class = "UPDATE  classes  SET className = ?, classImage = ?  WHERE  `classId` = ?";
                            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $statement = $connection->prepare($update_class);
                            $statement->execute([$name, $file_name, $trueId]);

                            $response = ['status' => 1, 'message' => 'Class updated successfully.'];
                            echo json_encode($response);
                        } else {
                            $response = ['status' => 0, 'message' => 'Something went wrong.'];
                            echo json_encode($response);
                        }
                    }
                } catch (PDOException $e) {
                    echo "Cannot query data. Error: " . $e->getMessage();
                }

                /*If dont have image*/
            } else {
                try {
                    if ($connection != null) {
                        $update_class = "UPDATE  classes  SET className = ?, classImage = ?  WHERE  `classId` = ?";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($update_class);
                        $statement->execute([$name, $old_image, $trueId]);
                        if ($statement) {
                            $response = ['status' => 1, 'message' => 'Class updated successfully.'];
                            echo json_encode($response);
                        } else {
                            $response = ['status' => 0, 'message' => 'Something went wrong.'];
                            echo json_encode($response);
                        }
                    }
                } catch (PDOException $e) {
                    echo "Cannot query data. Error: " . $e->getMessage();
                }
            }

            /*Insert class hear*/
        } else {
            $name = htmlspecialchars(isset($_POST['name']) ? $_POST['name'] : '');
            $image = isset($_FILES['file']['name']) ? $_FILES['file']['name'] : '';

            if (!empty($image)) {
                $path = "../public/assets/classImgs";
                $permitted_extensions = ['png', 'jpg', 'jpeg', 'gif'];
                $imageExt = pathinfo($image, PATHINFO_EXTENSION);
                $imageSize = $_FILES['file']['size'];
                $file_name = time() . "-" . $image;
                if (!empty($image)) {
                    if (!in_array($imageExt, $permitted_extensions)) {
                        $response =  ['status' => 0, 'message' => "Invalid class's image type."];
                        echo json_encode($response);
                        exit();
                    } else if ($imageSize > 100000000) {
                        $response =  ['status' => 0, 'message' => "The class's image is too large."];
                        echo json_encode($response);
                        exit();
                    }
                }


                try {
                    if ($connection != null) {
                        if (move_uploaded_file($_FILES['file']['tmp_name'], $path . "/" . $file_name)) {
                            $class_query = "INSERT INTO classes( className, classImage) VALUES ( ? , ?)";
                            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $statement = $connection->prepare($class_query);
                            $statement->execute([$name, $file_name]);

                            $response = ['status' => 1, 'message' => 'Class created successfully.'];
                            echo json_encode($response);
                        } else {
                            $response = ['status' => 0, 'message' => 'Something went wrong.'];
                            echo json_encode($response);
                        }
                    }
                } catch (PDOException $e) {
                    echo "Cannot query data. Error: " . $e->getMessage();
                }
            } else {

                try {
                    if ($connection != null) {
                        $class_query = "INSERT INTO classes(className, classImage) VALUES (? , ? )";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($class_query);
                        $statement->execute([$name, $image]);
                        if ($statement) {
                            $response = ['status' => 1, 'message' => 'Class created successfully.'];
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
        }
        break;
}
