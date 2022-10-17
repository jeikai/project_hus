<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "POST":
            $documentName = htmlspecialchars($_POST['name'] ?? '');
            $classId = htmlspecialchars($_POST['ID'] ?? '');
            $file_name = $_FILES['file']['name'];
            $file_tmp_name = $_FILES['file']['tmp_name'];
            $destination = "../public/assets/document/".$file_name;
            if ( $documentName != NULL && $classId != NULL && $file_name != NULL) {
                try {
                    $sql = "INSERT INTO Documents(documentName, documentFile, classId) VALUES ( ?, ?, ?)";
                    $statement = $connection->prepare($sql);
                    $statement->execute( [$documentName, $file_name, $classId ]);
                    move_uploaded_file($file_tmp_name, $destination);
                    
                } catch(PDOException $e) {
                    echo "Connection failed: " . $e->getMessage();
                }     
            }
            break;
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "SELECT * FROM Documents a JOIN Schedule b ON a.classId = b.classId WHERE b.teacherId = ? ORDER BY a.classId";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            $result = $statement->fetchAll();
            echo json_encode($result);
            break;
            
    }
?>