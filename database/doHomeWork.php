<?php 
    
    include './database.php';
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'POST':
            $exerciseId = $_POST['exerciseId'];
            $studentId = $_POST['studentId'];
            // echo json_encode($id);
            // echo 0;
                $permitted_extensions = ['pdf', 'docx'];        
                $file_name = $_FILES['file']['name'];
                $file_size = $_FILES['file']['size'];
                $file_tmp_name = $_FILES['file']['tmp_name'];  
                $generated_file_name = time().'-'.$file_name;
                $destination_path = "../src/data/application/pdf/${generated_file_name}";
                $file_extension = explode('.', $file_name);
                $file_extension = strtolower(end($file_extension));
                if(in_array($file_extension, $permitted_extensions)) {
                    if($file_size <= 1000000000) {
                        move_uploaded_file($file_tmp_name, $destination_path);
                        try {
                            if($connection != null){
                                $sql = "INSERT INTO ExerciseDetails (ExerciseId, studentId, fileUpload) 
                                VALUES (?, ?, ?)";
                                $connection->prepare($sql)->execute([$exerciseId, $studentId, $generated_file_name]);
                                echo 0;
                            }
                        } catch (PDOException $e) {
                            // echo "Cannot execute sql: " . $e->getMessage();
                        }
                    }
            break;
        }
    }
    // echo 'haha';
