<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
                $sql = "SELECT * FROM exercisedetails JOIN students
                ON exercisedetails.studentId = students.studentId JOIN 
                results ON students.studentId = results.studentId
                WHERE exerciseId = ? AND classId = ?";
                $statement = $connection->prepare($sql);
                $statement->execute([$path[3], $path[4]]);
                $result = $statement->fetchAll();
                echo json_encode($result);
            break;
    }
?>