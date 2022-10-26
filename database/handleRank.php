<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
                $sql = "SELECT * FROM students a JOIN results b
                ON a.studentId = b.studentId  WHERE b.classId = ? ORDER BY averageMark DESC";
                $statement = $connection->prepare($sql);
                $statement->execute([$path[3]]);
                $result = $statement->fetchAll();
                echo json_encode($result);
            break;
    }
?>