<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
                $sql = "SELECT * FROM exercise c JOIN exercisedetails a 
                ON c.exerciseId = a.exerciseId JOIN students b ON
                a.studentId = b.studentId JOIN results d
                ON b.studentId = d.studentId  WHERE a.exerciseId = ? AND a.studentId = ? AND d.classId = ?;";
                $statement = $connection->prepare($sql);
                $statement->execute([$path[4], $path[3], $path[5]]);
                $result = $statement->fetchAll();
                echo json_encode($result);
            break;
        case "POST":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $studentId = $path[3];
            echo $studentId;
            $type = $path[4];
            echo $type;
            $previous = $path[5];
            echo $previous;
            $classId = $path[6];
            echo $classId;
            $point = htmlspecialchars($_POST['point'] ?? '');
            echo $point;
            $averageMark = $path[7];
            echo $averageMark;
            if ( $type == "practice") {
                $previous += $point/4;
                $averageMark += ($point/4) * ( 20/100);
                $sql = "UPDATE results SET componentMark = ?, averageMark = ? WHERE classId = ? AND studentId = ?;";
            } else if ( $type == "mid") {
                $previous += $point/2;
                $averageMark += ($point/2) * ( 30/100);
                $sql = "UPDATE results SET midMark = ?, averageMark = ? WHERE classId = ? AND studentId = ?;";
            } else if ( $type == "final") {
                $previous = $point;
                $averageMark += $point * ( 50/100);
                $sql = "UPDATE results SET finalMark = ?, averageMark = ? WHERE classId = ? AND studentId = ?;";
            }
            $statement = $connection->prepare($sql);
            $statement->execute([$previous, $averageMark, $classId, $studentId]);
            $result = $statement->fetchAll();
            break;
    }
?>