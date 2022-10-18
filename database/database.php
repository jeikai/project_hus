<?php
    define('SERVER', 'localhost');
    define('DB_NAME', 'project_hus');
    define('DB_USER_NAME', 'root');
    define('DB_PASSWORD', '');

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods:  *");
    
    $connection_string = "mysql:host=".SERVER;
    // $connection = null;   

    try {
        $connection = new PDO($connection_string, 
                DB_USER_NAME, DB_PASSWORD);   
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // echo "Connected successfully<br>";        
        $connection->query("USE ".DB_NAME);
    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }    

    
?>