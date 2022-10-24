<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    $time = time();
    switch($method) {
    case 'GET':
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if ( isset($path[3]) && is_numeric($path[3])) {
            $sql = "SELECT * FROM Exercise WHERE ExerciseId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            $result = $statement->fetch();
            echo json_encode($result);
        }
        break; 
    case 'POST':
        $old_file = $_POST['ExerciseFile'];
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $sql = "UPDATE Exercise SET ExerciseName = ?,
        startingDay = ?, deadline = ?, ExerciseFile = ?, typeExercise = ? WHERE ExerciseId = ?";
        $ExerciseName = htmlspecialchars($_POST['ExerciseName'] ?? '');
        $old_statingDay = htmlspecialchars($_POST['startingDay'] ?? '');
        $startingDay = htmlspecialchars($_POST['start'] ?? '');
        $deadline = htmlspecialchars($_POST['end'] ?? '');
        $old_deadline = htmlspecialchars($_POST['deadline'] ?? '');
        $type = htmlspecialchars($_POST['type'] ?? '');
        $old_type = htmlspecialchars($_POST['typeExercise'] ?? '');
        $file_name = htmlspecialchars( $_FILES['file']['name'] ?? '');

        if ( empty($type) || $type == '' ) {
            $type = $old_type;
        }
        if ( (!empty($file_name) || $file_name != '') && (!empty($startingDay) || $startingDay != '') && (!empty($deadline) || $deadline != '')) {
            $new_file_name = $time."-".$_FILES['file']['name'];
            $file_tmp_name = $_FILES['file']['tmp_name'];
            $destination = "../src/data/homework/".$file_name;
            $statement = $connection->prepare($sql);
            $statement->execute( [$ExerciseName, $startingDay, $deadline, $new_file_name, $type, $path[3]]);
            move_uploaded_file($file_tmp_name, $destination);
            if (file_exists("../src/data/homework/".$old_file) ) {
                unlink("../src/data/homework/".$old_file);
            }
            echo "haha0";
        } 
        else if ( (empty($file_name) || $file_name == '') && (!empty($startingDay) || $startingDay != '') && (!empty($deadline) || $deadline != '')) {
            $statement = $connection->prepare($sql);
            $statement->execute( [$ExerciseName, $startingDay, $deadline, $old_file, $type, $path[3]]);
            echo "haha1";

        }
        else if ( (!empty($file_name) || $file_name != '') && (empty($startingDay) || $startingDay == '') && (!empty($deadline) || $deadline != '')) {
            $new_file_name = $time."-".$_FILES['file']['name'];
            $file_tmp_name = $_FILES['file']['tmp_name'];
            $destination = "../src/data/homework/".$file_name;
            $statement = $connection->prepare($sql);
            $statement->execute( [$ExerciseName, $_POST['startingDay'], $deadline, $new_file_name, $type, $path[3]]);
            move_uploaded_file($file_tmp_name, $destination);
            if (file_exists("../src/data/homework/".$old_file) ) {
                unlink("../src/data/homework/".$old_file);
            }
            echo "haha2";

        }
        else if ( (!empty($file_name) || $file_name != '') && (!empty($startingDay) || $startingDay != '') && (empty($deadline) || $deadline == '')) {
            $new_file_name = $time."-".$_FILES['file']['name'];
            $file_tmp_name = $_FILES['file']['tmp_name'];
            $destination = "../src/data/homework/".$file_name;
            $statement = $connection->prepare($sql);
            $statement->execute( [$ExerciseName, $startingDay, $old_deadline, $new_file_name, $type, $path[3]]);
            move_uploaded_file($file_tmp_name, $destination);
            if (file_exists("../src/data/homework/".$old_file) ) {
                unlink("../src/data/homework/".$old_file);
            }
            echo "haha3";
        }
        else if ( (!empty($file_name) || $file_name != '') && (empty($startingDay) || $startingDay == '') && (empty($deadline) || $deadline == '')) {
            $new_file_name = $time."-".$_FILES['file']['name'];
            $file_tmp_name = $_FILES['file']['tmp_name'];
            $destination = "../src/data/homework/".$file_name;
            $statement = $connection->prepare($sql);
            $statement->execute( [$ExerciseName, $_POST['startingDay'], $old_deadline, $new_file_name, $type, $path[3]]);
            move_uploaded_file($file_tmp_name, $destination);
            if (file_exists("../src/data/homework/".$old_file) ) {
                unlink("../src/data/homework/".$old_file);
            }
            echo "haha4";
        }
        else if ( (empty($file_name) || $file_name == '') && (empty($startingDay) || $startingDay == '') && (!empty($deadline) || $deadline != '')) {
            $statement = $connection->prepare($sql);
            $statement->execute( [$ExerciseName, $_POST['startingDay'], $deadline, $old_file, $type, $path[3]]);
            echo "haha5";
        }
        else if ( (empty($file_name) || $file_name == '') && (!empty($startingDay) || $startingDay != '') && (empty($deadline) || $deadline == '')) {
            $statement = $connection->prepare($sql);
            $statement->execute( [$ExerciseName, $startingDay, $old_deadline, $old_file, $type, $path[3]]);
            echo "haha6";
        }
        else {
            $statement = $connection->prepare($sql);
            $statement->execute( [$ExerciseName, $_POST['startingDay'], $old_deadline, $old_file, $type, $path[3]]);
            echo "haha7";
        }
        echo $type;
        break;
    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        
        if ( isset($path[3]) && is_numeric($path[3])) {
            $sql = "SELECT ExerciseFile FROM Exercise WHERE ExerciseId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            $statement->setFetchMode(PDO::FETCH_ASSOC); 
			$result = $statement->fetchAll();
            $file;
            foreach( $result as $result ) {
                $file = $result['ExerciseFile'];
            }
            if (file_exists("../src/data/homework/".$file) ) {
                unlink("../src/data/homework/".$file);
            }
            $sql = "DELETE FROM exercisedetails WHERE ExerciseId = ?;
            DELETE FROM Exercise WHERE ExerciseId = ? ;";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3], $path[3]]);
            echo "haha";
        }
        break;
    }
?>