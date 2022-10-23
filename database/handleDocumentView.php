<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    $time = time();
    switch($method) {
    case 'GET':
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if ( isset($path[3]) && is_numeric($path[3])) {
            $sql = "SELECT * FROM Documents WHERE documentId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            $result = $statement->fetch();
            echo json_encode($result);
        }
        break; 
    case 'POST':
        $old_file = $_POST['documentFile'];
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $sql = "UPDATE Documents SET documentName = ?, classId = ?, documentFile = ? WHERE documentId = ?";
        $documentName = htmlspecialchars($_POST['documentName'] ?? '');
        $classId = htmlspecialchars($_POST['classId'] ?? '');
        $file_name = htmlspecialchars($_FILES['file']['name'] ?? '');
        if ( !empty($file_name) || $file_name != '') {
            $file_name = $time."-".$_FILES['file']['name'];
            $file_tmp_name = $_FILES['file']['tmp_name'];
            $destination = "../src/data/document/".$file_name;
            $statement = $connection->prepare($sql);
            $statement->execute( [$documentName, $classId, $file_name, $path[3] ]);
            move_uploaded_file($file_tmp_name, $destination);
            if (file_exists("../src/data/document/".$old_file) ) {
                unlink("../src/data/document/".$old_file);
            }
        } else {
            $statement = $connection->prepare($sql);
            $statement->execute( [$documentName, $classId, $old_file, $path[3] ]);
        }
        break;
    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if ( isset($path[3]) && is_numeric($path[3])) {
            $sql = "SELECT documentFile FROM Documents WHERE documentId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            $statement->setFetchMode(PDO::FETCH_ASSOC); 
			$result = $statement->fetchAll();
            $file;
            foreach( $result as $result ) {
                $file = $result['documentFile'];
            }
            if (file_exists("../src/data/document/".$file) ) {
                unlink("../src/data/document/".$file);
            }
            $sql = "DELETE FROM Documents WHERE documentId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]); 
        }
        break;

    }
?>