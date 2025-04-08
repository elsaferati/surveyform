<?php
require_once __DIR__ . '/../src/models/UserModel.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$input = json_decode(file_get_contents("php://input"), true);

$mysqli = new mysqli("localhost", "root", "", "user_registration");
if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    exit();
}

$id = $input['id'] ?? '';

if (!$id) {
    echo json_encode(["error" => "Missing user ID"]);
    exit();
}

$stmt = $mysqli->prepare("DELETE FROM users WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => "User deleted successfully"]);
} else {
    echo json_encode(["error" => "Delete failed: " . $stmt->error]);
}
