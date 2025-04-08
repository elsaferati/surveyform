<?php
require_once __DIR__ . '/../src/models/UserModel.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "", "user_registration");

if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    exit();
}

$id = $_GET['id'] ?? null;

if ($id) {
    $stmt = $mysqli->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => "User deleted successfully."]);
    } else {
        echo json_encode(["error" => "Delete failed: " . $stmt->error]);
    }
} else {
    echo json_encode(["error" => "User ID is required."]);
}
