<?php
$host = "localhost";
$port = 3306; // default MySQL port, leave this unless you're using a custom port
$username = "root";
$password = ""; // set this if your MySQL has a password
$database = "surveyform";

// Create connection
$conn = new mysqli($host, $username, $password, $database, $port);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

