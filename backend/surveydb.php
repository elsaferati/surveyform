<?php

// Database connection details
$host = "localhost";  // or your database host
$username = "root";   // your database username
$password = "";       // your database password
$dbname = "surveydb"; // your database name

// Create a connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check if connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Optionally, set the charset to UTF-8 for better handling of special characters
$conn->set_charset("utf8");

?>
