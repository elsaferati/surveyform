<?php
$servername = "localhost";
$username = "root"; // XAMPP default MySQL username
$password = "";     // XAMPP default MySQL password
$dbname = "surveydb"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
