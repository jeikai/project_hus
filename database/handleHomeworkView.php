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
            
        $startyear = htmlspecialchars($_POST['startyear'] ?? '');
        $startmonth = htmlspecialchars($_POST['startmonth'] ?? '');
        $startday = htmlspecialchars($_POST['startday'] ?? '');
        $starthour = htmlspecialchars($_POST['starthour'] ?? '');
        $startmin = htmlspecialchars($_POST['startmin'] ?? '');
        $startsecond = htmlspecialchars($_POST['startsecond'] ?? '');

        $old_statingDay = htmlspecialchars($_POST['startingDay'] ?? '');
        $startingDay = $startyear."-".$startmonth."-".$startday." ".$starthour.":".$startmin.":".$startsecond;
       
        echo $_POST['startingDay'];
        $endyear = htmlspecialchars($_POST['endyear'] ?? '');
        $endmonth = htmlspecialchars($_POST['endmonth'] ?? '');
        $endday = htmlspecialchars($_POST['endday'] ?? '');
        $endhour = htmlspecialchars($_POST['endhour'] ?? '');
        $endmin = htmlspecialchars($_POST['endmin'] ?? '');
        $endsecond = htmlspecialchars($_POST['endsecond'] ?? '');
        
        $deadline = $endyear."-".$endmonth."-".$endday." ".$endhour.":".$endmin.":".$endsecond;
        $old_deadline = htmlspecialchars($_POST['deadline'] ?? '');

        $type = htmlspecialchars($_POST['type'] ?? '');
        $old_type = htmlspecialchars($_POST['typeExercise'] ?? '');
        $file_name = htmlspecialchars( $_FILES['file']['name'] ?? '');
        
        if ( !empty($file_name) || $file_name != '') {
            $file_name = $time."-".$_FILES['file']['name'];
            $file_tmp_name = $_FILES['file']['tmp_name'];
            $destination = "../src/data/homework/".$file_name;
            $statement = $connection->prepare($sql);
            $statement->execute( [$ExerciseName, $startingDay, $deadline, $file_name, $type, $path[3]]);
            move_uploaded_file($file_tmp_name, $destination);
            if (file_exists("../src/data/homework/".$old_file) ) {
                unlink("../src/data/homework/".$old_file);
            }
        } else {
            $statement = $connection->prepare($sql);
            $statement->execute( [$ExerciseName, $_POST['startingDay'], $old_deadline, $old_file, $old_type, $path[3]]);
        }
        break;
    case "DELETE":
        echo "haha";
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
            $sql = "DELETE FROM Exercise WHERE ExerciseId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            echo "haha";
        }
        break;
    }
?>