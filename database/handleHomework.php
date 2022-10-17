<?php
    include './connetdb.php';
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "POST":
            $ExerciseName = htmlspecialchars($_POST['name'] ?? '');
            $classId = htmlspecialchars($_POST['id'] ?? '');
            
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
            if ( $ExerciseName != NULL && $classId != NULL && $file_name != NULL) {
                try {
                    $sql = "INSERT INTO Exercise(ExerciseName, classId, startingDay, deadline, ExerciseFile, typeExercise) VALUES ( ?, ?, ?, ?, ?, ?)";
                    $statement = $connection->prepare($sql);
                    $statement->execute( [$ExerciseName, $classId, $startingDay, $deadline, $file_name, $type]);
                    move_uploaded_file($file_tmp_name, $destination);
                    
                } catch(PDOException $e) {
                    echo "Connection failed: " . $e->getMessage();
                }     
            }
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "SELECT * FROM Exercise a JOIN Schedule b ON a.classId = b.classId WHERE b.teacherId = ? ORDER BY a.classId";
            $statement = $connection->prepare($sql);
            $statement->execute([$path[3]]);
            $result = $statement->fetchAll();
            echo json_encode($result);
            break;
    }
?>