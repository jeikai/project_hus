<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
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
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $sql = "UPDATE Documents SET documentName = ?, classId = ?, documentFile = ? WHERE documentId = ?";
        $documentName = htmlspecialchars($_POST['documentName'] ?? '');
        $classId = htmlspecialchars($_POST['classId'] ?? '');
        $file_name = $_FILES['file']['name'];
        $file_tmp_name = $_FILES['file']['tmp_name'];
        $destination = "../public/assets/document/".$file_name;

        $statement = $connection->prepare($sql);
        $statement->execute( [$documentName, $classId, $file_name, $path[3] ]);
        move_uploaded_file($file_tmp_name, $destination);
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
            if (file_exists("../public/assets/document/".$file) ) {
                unlink("../public/assets/document/".$file);
            }
            $sql = "DELETE FROM Documents WHERE documentId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]); 
        }
        break;

    }
?>