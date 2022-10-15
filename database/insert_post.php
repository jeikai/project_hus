<?php 
    
    include './database.php';
    // $path = explode('/', $_SERVER['REQUEST_URI']);
    // $sql = "SELECT * FROM students WHERE classId = $path[3]";
    // $statement = $connection->prepare($sql);
    // $statement->execute();
    // $result = $statement->fetchAll();
    // echo json_encode($result);
    // switch($methods)
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'POST':
            $content = isset($_POST['content']) ? $_POST['content'] : '';
            // echo json_encode($content);
            // $image = isset($_FILES['file']) ? $_FILES['file'] : '';
            // echo json_encode($image);
            $classId = $_POST['classId'];
            // echo json_encode($classId);
            if(isset($_FILES['file'])){
                $permitted_extensions = ['png', 'jpg', 'jpeg', 'gif'];        
                $file_name = $_FILES['file']['name'];
                // print_r($_FILES);
                $file_size = $_FILES['file']['size'];
                $file_tmp_name = $_FILES['file']['tmp_name'];  
                $generated_file_name = time().'-'.$file_name;
                $destination_path = "../assets/newsfeed/${generated_file_name}";
                $file_extension = explode('.', $file_name);
                $file_extension = strtolower(end($file_extension));
                if(in_array($file_extension, $permitted_extensions)) {
                    if($file_size <= 1000000) {
                        move_uploaded_file($file_tmp_name, $destination_path);
                        // $upload_img ="../assets/newsfeed/$generated_file_name";
                        try {
                            if($connection != null){
                                $sql = "INSERT INTO posts (classId, postContent, postImage) 
                                VALUES (?, ?, ?)";
                                $connection->prepare($sql)->execute([$classId, $content, $generated_file_name]);
                                echo 0;
                            }
                        } catch (PDOException $e) {
                            echo "Cannot execute sql: " . $e->getMessage();
                        }
                    }
                }
            }else{
                $generated_file_name = '';
                try {
                    if($connection != null){
                        $sql = "INSERT INTO posts (classId, postContent, postImage) 
                        VALUES (?, ?, ?)";
                        $connection->prepare($sql)->execute([$classId, $content, $generated_file_name]);
                        echo 0;
                    }
                } catch (PDOException $e) {
                    echo "Cannot execute sql: " . $e->getMessage();
                }
            }
            break;
        }
    // echo 'haha';
?>