<?php
require_once __DIR__ . '/../src/models/UserModel.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "", "user_registration");

if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);

$id = $input["id"] ?? null;
$name = $input["name"] ?? '';
$email = $input["email"] ?? '';

if ($id && $name && $email) {
    $stmt = $mysqli->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
    $stmt->bind_param("ssi", $name, $email, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => "User updated successfully."]);
    } else {
        echo json_encode(["error" => "Update failed: " . $stmt->error]);
    }
} else {
    echo json_encode(["error" => "Missing user ID, name, or email."]);
}
