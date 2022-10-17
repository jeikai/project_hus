<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "POST":
            $assignment = json_decode(file_get_contents('php://input'));
            if ( $assignment != NULL) {
            $sql = "INSERT INTO Assignment(title, content, classId) VALUES ( ?, ?, ?)";
            $statement = $connection->prepare($sql);
            $statement->execute( [$assignment->title, $assignment->content, $assignment->id ]);
            }
        break;
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "SELECT * FROM Assignment a JOIN Schedule b ON a.classId = b.classId WHERE b.teacherId = ? ORDER BY a.classId";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            $result = $statement->fetchAll();
            echo json_encode($result);
        break;
    }
?>