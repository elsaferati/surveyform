<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "config.php";

// Merr të dhënat nga React (JSON)
$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

// Kontrollo në databazë
$sql = "SELECT id, password FROM users WHERE username = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row['password'])) {
        echo json_encode(["success" => true, "message" => "Login i suksesshëm"]);
    } else {
        echo json_encode(["success" => false, "message" => "Fjalëkalimi i gabuar"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Përdoruesi nuk u gjet"]);
}

$stmt->close();
$mysqli->close();
