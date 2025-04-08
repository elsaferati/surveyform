<?php
require_once __DIR__ . '/../src/models/UserModel.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($input['id']) || empty($input['id'])) {
    echo json_encode(["error" => "Missing user ID"]);
    exit();
}

$mysqli = new mysqli("localhost", "root", "", "user_registration");
if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    exit();
}

$id = intval($input['id']); // Sanitizing just in case

$stmt = $mysqli->prepare("DELETE FROM users WHERE id = ?");
if (!$stmt) {
    echo json_encode(["error" => "Prepare failed: " . $mysqli->error]);
    exit();
}

$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => "User deleted successfully"]);
} else {
    echo json_encode(["error" => "Delete failed: " . $stmt->error]);
}

$stmt->close();
$mysqli->close();
