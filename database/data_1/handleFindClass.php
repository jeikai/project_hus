<?php
include '../database.php';
// $path = explode('/', $_SERVER['REQUEST_URI']);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $id = $_POST['id'];
        $sql = "SELECT * FROM classes WHERE classId = '$id'";
        $statement = $connection->prepare($sql);
        $statement->execute();
        $result = $statement->fetchAll();
        echo json_encode($result);
        break;
}
