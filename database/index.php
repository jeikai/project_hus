<?php
    include './database.php';
    $sql = "SELECT * FROM students WHERE email = '$email' AND studentPassword = '$password'";
            $statement = $connection->prepare($sql);
            $statement->execute();
            $result = $statement->fetchAll();
            $count = $statement->rowCount();
            echo json_encode($count, $result);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello</h1>
    <?
            echo $count, $result;
    ?>
</body>
</html>