<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
    case 'GET':
        $path = explode('/', $_SERVER['REQUEST_URI']);
         if ( isset($path[3]) && is_numeric($path[3])) {
            $sql = "SELECT * FROM Assignment WHERE assignmentId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            $result = $statement->fetch();
            echo json_encode($result);
        } 
        break; 
    case 'POST':
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $sql = "UPDATE Assignment SET title = ?, classId = ?, content = ? WHERE assignmentId = ?";
        $title = htmlspecialchars($_POST['title'] ?? '');
        $classId =  htmlspecialchars($_POST['classId'] ?? '');
        $content = htmlspecialchars($_POST['content'] ?? '');
        $statement = $connection->prepare($sql);
        $statement->execute( [$title, $classId, $content, $path[3] ]);
        break;
    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if ( isset($path[3]) && is_numeric($path[3])) {
            $sql = "DELETE FROM Assignment WHERE assignmentId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
        }
        break;
    }
?>