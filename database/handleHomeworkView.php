<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
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
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $sql = "UPDATE Exercise SET ExerciseName = ?,
        startingDay = ?, deadline = ?, ExerciseFile = ?, typeExercise = ? WHERE ExerciseId = ?";
        $ExerciseName = htmlspecialchars($_POST['name'] ?? '');
            
        $startyear = htmlspecialchars($_POST['startyear'] ?? '');
        $startmonth = htmlspecialchars($_POST['startmonth'] ?? '');
        $startday = htmlspecialchars($_POST['startday'] ?? '');
        $starthour = htmlspecialchars($_POST['starthour'] ?? '');
        $startmin = htmlspecialchars($_POST['startmin'] ?? '');
        $startsecond = htmlspecialchars($_POST['startsecond'] ?? '');

        $startingDay = $startyear."-".$startmonth."-".$startday." ".$starthour.":".$startmin.":".$startsecond;
        
        $endyear = htmlspecialchars($_POST['endyear'] ?? '');
        $endmonth = htmlspecialchars($_POST['endmonth'] ?? '');
        $endday = htmlspecialchars($_POST['endday'] ?? '');
        $endhour = htmlspecialchars($_POST['endhour'] ?? '');
        $endmin = htmlspecialchars($_POST['endmin'] ?? '');
        $endsecond = htmlspecialchars($_POST['endsecond'] ?? '');
        
        $deadline = $endyear."-".$endmonth."-".$endday." ".$endhour.":".$endmin.":".$endsecond;

        $type = htmlspecialchars($_POST['type'] ?? '');
        $file_name = $_FILES['file']['name'];
        $file_tmp_name = $_FILES['file']['tmp_name'];
        $destination = "../public/assets/homework/".$file_name;

        $statement = $connection->prepare($sql);
        $statement->execute( [$ExerciseName, $startingDay, $deadline, $file_name, $type, $path[3]]);
        move_uploaded_file($file_tmp_name, $destination);
        break;
    case "DELETE":
        echo "haha";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        
        if ( isset($path[3]) && is_numeric($path[3])) {
            $sql = "DELETE FROM Exercise WHERE ExerciseId = ?";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            echo "haha";
        }
        break;
    }
?>