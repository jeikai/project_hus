<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "SELECT * FROM timetable a JOIN Classes b ON a.classId = b.classId JOIN schedule c 
            ON b.classId = c.classId WHERE c.teacherId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
            break;
    }
?>