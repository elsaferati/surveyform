<?php
require_once __DIR__ . '/../models/UserModel.php';
require_once __DIR__ . '/UserController.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Parse input
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["id"], $input["name"], $input["email"])) {
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

// Connect to database
$mysqli = new mysqli("localhost", "root", "", "user_registration");
if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    exit();
}

// Prepare and execute update query
$stmt = $mysqli->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
if (!$stmt) {
    echo json_encode(["error" => "Prepare failed: " . $mysqli->error]);
    exit();
}

$stmt->bind_param("ssi", $input["name"], $input["email"], $input["id"]);

if ($stmt->execute()) {
    echo json_encode(["success" => "User updated successfully"]);
} else {
    echo json_encode(["error" => "Execute failed: " . $stmt->error]);
}

$stmt->close();
$mysqli->close();
