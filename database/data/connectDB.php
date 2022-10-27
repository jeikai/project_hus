<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods:  *");
<<<<<<< HEAD
// //PDO - PHP Data Object
=======
//PDO - PHP Data Object
>>>>>>> d014ea259652c3f8e27ca272845b7e7435d6b190
define('DATABASE_SERVER', 'localhost');
define('DATABASE_USER', 'root');
define('DATABASE_PASSWORD', '');
define('DATABASE_NAME', 'project_hus');

// define('DATABASE_SERVER', 'sql306.epizy.com');
//     define('DATABASE_NAME', 'epiz_32863910_project_hus');
//     define('DATABASE_USER', 'epiz_32863910');
//     define('DATABASE_PASSWORD', 'XHJiKKXJT6Xe');

$connection = null;
try {
    $connection = new PDO("mysql:host=" . DATABASE_SERVER . ";dbname=" . DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Connected successfully";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    $connection = null;
}