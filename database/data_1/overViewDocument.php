<?php
    include '../database.php';
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $sql = "SELECT * FROM documents JOIN classes ON documents.classId = classes.classId WHERE documents.classId In (select classId from results WHERE studentId = ?)";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[4]]);
            $result = $statement->fetchAll();
            echo json_encode($result);
?>