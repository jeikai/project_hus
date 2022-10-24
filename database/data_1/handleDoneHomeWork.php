<?php
    include '../database.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch  ($method) {
        case 'GET':
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "SELECT * FROM exercisedetails WHERE exerciseId = ? AND studentId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[4], $path[5]]);
            $result = $statement->fetchAll();
            echo json_encode($result);
            break;
        case 'POST':
            $exerciseId = $_POST['exerciseId'];
            $studentId = $_POST['studentId'];
            $oldFile = $_POST['oldFile'];
            // echo json_encode($oldFile);
            // $file = $_POST['file'];
            $permitted_extensions = ['pdf', 'docx'];        
            $file_name = $_FILES['file']['name'];

                if (file_exists("../../src/data/application/pdf/" . $oldFile)) {
                    unlink("../../src/data/application/pdf/" . $oldFile);
                }

                $file_size = $_FILES['file']['size'];
                $file_tmp_name = $_FILES['file']['tmp_name'];  
                $generated_file_name = time().'-'.$file_name;
                $destination_path = "../../src/data/application/pdf/${generated_file_name}";
                $file_extension = explode('.', $file_name);
                $file_extension = strtolower(end($file_extension));
                if(in_array($file_extension, $permitted_extensions)) {
                    if($file_size <= 1000000000) {
                        move_uploaded_file($file_tmp_name, $destination_path);
                        try {
                            if($connection != null){
                                $sql = "UPDATE ExerciseDetails SET fileUpload = ? WHERE exerciseId = ? AND studentId = ? ";
                                $connection->prepare($sql)->execute([$generated_file_name, $exerciseId, $studentId]);
                                echo 0;
                            }
                        } catch (PDOException $e) {
                            // echo "Cannot execute sql: " . $e->getMessage();
                        }
                    }
                }
                break; 
            }
