<?php
// Lejo kërkesa nga React (port 3000) ose çfarëdo burimi gjatë zhvillimit
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Lidhja me databazën
require_once "config.php";

// Prano vetëm POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Vetëm POST lejohet"]);
    exit;
}

// Merr të dhënat nga kërkesa
$username = $_POST["username"] ?? "";
$password = $_POST["password"] ?? "";

// Kontrollo nëse përdoruesi ekziston në databazë
$sql = "SELECT id, password FROM users WHERE username = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// Krahaso fjalëkalimin nëse përdoruesi ekziston
if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row['password'])) {
        echo json_encode(["success" => true, "message" => "Login i suksesshëm"]);
    } else {
        echo json_encode(["success" => false, "message" => "Fjalëkalimi i gabuar"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Përdoruesi nuk u gjet"]);
}

// Mbyll lidhjet
$stmt->close();
$mysqli->close();


