<?php
    include './connetdb.php';
    $time = time();
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "POST":
            $ExerciseName = htmlspecialchars($_POST['name'] ?? '');
            $classId = htmlspecialchars($_POST['id'] ?? '');

            $startingDay = htmlspecialchars($_POST['startingDay'] ?? '');
            
            $deadline = htmlspecialchars($_POST['deadline'] ?? '');

            $type = htmlspecialchars($_POST['type'] ?? '');
            $file_name = $time."-".$_FILES['file']['name'];
            $file_tmp_name = $_FILES['file']['tmp_name'];
            $destination = "../src/data/application/pdf/".$file_name;
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
            break;
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