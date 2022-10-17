<?php
require './connectDB.php';


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "DELETE":
        break;

    case "POST":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $id = htmlspecialchars(isset($path[4]) ? $path[4] : '');
        $role = htmlspecialchars(isset($path[5]) ? $path[5] : '');
        $emails = $_POST['emails'];

        foreach ($emails as $email) {
            echo json_encode($email);
        }

        // if (is_string($role) && isset($role) && $role == "teacher") {
        //     $teacher_addClass_query  = "INSERT INTO schedule(classId, classImage) VALUES (? , ? )";
        // } else if (is_string($role) && isset($role) && $role == "student") {
        // }
        break;
}
