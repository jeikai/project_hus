<?php
include '../database.php';
// $path = explode('/', $_SERVER['REQUEST_URI']);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        // $id = $_POST['id'];
        $studentId = $_POST['studentId'];
        $classId = $_POST['classId'];
        $sql = "SELECT * FROM results WHERE studentId = $studentId AND classId = $classId";
        $statement = $connection->prepare($sql);
        $statement->execute();
        $result = $statement->fetchAll();
        if(count($result) === 0){
            echo json_encode($result);
            $sql = "UPDATE results SET studentId = $studentId AND classId = $classId";
            $statement = $connection->prepare($sql);
            $statement->execute();
        }else if(count($result) === 1){
            // echo json_encode($result);
            echo 'exists';
        }else{
            echo 'error';
        }
        break;
}
