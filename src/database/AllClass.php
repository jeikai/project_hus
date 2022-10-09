<?php
    include './database.php';
    $sql = "SELECT * FROM classes";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();
    echo json_encode($result);
?>