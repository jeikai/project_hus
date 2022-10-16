<?php
require './connectDB.php';


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $id = htmlspecialchars(isset($path[3]) ? $path[3] : '');
        $sql = 'SELECT `id` AS trueId, row_number()over(order by `create_at` DESC) AS Id, title AS title, image AS image, description AS description FROM `news` ORDER BY `create_at` DESC';
        try {
            if ($connection != null) {

                if (isset($id) && is_numeric($id)) {
                    $sql = 'SELECT `id` AS trueId, title AS title, image AS image, description AS description FROM `news` WHERE `id` = :id';
                    $statement = $connection->prepare($sql);
                    $statement->bindParam(':id', $id);
                    $statement->execute();
                    $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                    $new = $statement->fetch();
                    echo json_encode($new);
                } else {
                    $statement = $connection->prepare($sql);
                    $statement->execute();
                    $result = $statement->setFetchMode(PDO::FETCH_ASSOC);
                    $news = $statement->fetchAll();
                    echo json_encode($news);
                }
            }
        } catch (PDOException $e) {
            echo "Cannot query data. Error: " . $e->getMessage();
        }

        break;

    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $id = htmlspecialchars(isset($path[3]) ? $path[3] : '');

        try {
            if ($connection != null) {
                $delete_query = "DELETE FROM `news` WHERE id = :id";

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


    case "POST":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $method = htmlspecialchars(isset($path[3]) ? $path[3] : '');


        /*update new in hear*/
        if (is_string($method) && isset($method) && $method == "update") {
            $name = htmlspecialchars(isset($_POST['name']) ? $_POST['name'] : '');
            $description = (isset($_POST['description']) ? $_POST['description'] : '');
            $image = isset($_FILES['file']['name']) ? $_FILES['file']['name'] : '';
            $id = htmlspecialchars(isset($_POST['id']) ? $_POST['id'] : '');
            $old_image = htmlspecialchars(isset($_POST['old_image']) ? $_POST['old_image'] : '');

            if (empty($image)) {
                try {
                    if ($connection != null) {
                        $update_new = "UPDATE  news  SET title = ?, image = ? , description = ?  WHERE  `id` = ?";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($update_new);
                        $statement->execute([$name, $old_image, $description, $id]);
                        if ($statement->rowCount() > "0") {
                            $response = ['status' => 1, 'message' => 'New have been updated successfully.'];
                            echo json_encode($response);
                        } else {
                            $response = ['status' => 0, 'message' => 'Something went wrong!!!'];
                            echo json_encode($response);
                        }
                    }
                } catch (PDOException $e) {
                    echo "Cannot query data. Error: " . $e->getMessage();
                }
            } else {
                /*If update have a new img*/

                $path = "../public/assets/newImgs";
                $permitted_extensions = ['png', 'jpg', 'jpeg', 'gif'];
                $imageExt = pathinfo($image, PATHINFO_EXTENSION);
                $imageSize = $_FILES['file']['size'];
                $file_name = time() . "-" . $image;

                if (!empty($image)) {
                    if (!in_array($imageExt, $permitted_extensions)) {
                        $response =  ['status' => 0, 'message' => "Invalid new's image type."];
                        echo json_encode($response);
                        exit();
                    } else if ($imageSize > 100000000) {
                        $response =  ['status' => 0, 'message' => "The new's image is too large."];
                        echo json_encode($response);
                        exit();
                    }
                }
                if (file_exists("../public/assets/newImgs/" . $old_image)) {
                    unlink("../public/assets/newImgs/" . $old_image);
                }

                try {
                    if ($connection != null) {
                        if (move_uploaded_file($_FILES['file']['tmp_name'], $path . "/" . $file_name)) {
                            $update_new = "UPDATE  news  SET title = ?, image = ? , description = ?  WHERE  `id` = ?";
                            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $statement = $connection->prepare($update_new);
                            $statement->execute([$name, $file_name, $description, $id]);


                            if ($statement->rowCount() > "0") {
                                $response = ['status' => 1, 'message' => 'New have been updated successfully.'];
                                echo json_encode($response);
                            } else {
                                $response = ['status' => 0, 'message' => 'Something went wrong!!!'];
                                echo json_encode($response);
                            }
                        } else {
                            $response = ['status' => 0, 'message' => 'Something wrong with file path!!!'];
                            echo json_encode($response);
                        }
                    }
                } catch (PDOException $e) {
                    echo "Cannot query data. Error: " . $e->getMessage();
                }
            }

            /*Insert new hear*/
        } else {
            $name = htmlspecialchars(isset($_POST['name']) ? $_POST['name'] : '');
            $description = (isset($_POST['description']) ? $_POST['description'] : '');
            $image = isset($_FILES['file']['name']) ? $_FILES['file']['name'] : '';

            $path = "../public/assets/newImgs";
            $permitted_extensions = ['png', 'jpg', 'jpeg', 'gif'];
            $imageExt = pathinfo($image, PATHINFO_EXTENSION);
            $imageSize = $_FILES['file']['size'];
            $file_name = time() . "-" . $image;

            if (!empty($image)) {
                if (!in_array($imageExt, $permitted_extensions)) {
                    $response =  ['status' => 0, 'message' => "Invalid new's image type."];
                    echo json_encode($response);
                    exit();
                } else if ($imageSize > 100000000) {
                    $response =  ['status' => 0, 'message' => "The new's image is too large."];
                    echo json_encode($response);
                    exit();
                }
            }

            try {
                if ($connection != null) {
                    if (move_uploaded_file($_FILES['file']['tmp_name'], $path . "/" . $file_name)) {
                        $new_query = "INSERT INTO news(title, image, description) VALUES (? , ? , ?)";
                        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $statement = $connection->prepare($new_query);
                        $statement->execute([$name, $file_name, $description]);

                        $response = ['status' => 1, 'message' => 'New created successfully.'];
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
}
