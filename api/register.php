<?php
require_once __DIR__ . '/../src/models/UserModel.php';
require_once __DIR__ . '/../src/controllers/UserController.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);
if (!$input) {
    echo json_encode(["error" => "Invalid JSON input"]);
    exit();
}

// DB connection
$mysqli = new mysqli("localhost", "root", "", "user_registration");
if ($mysqli->connect_error) {
    echo json_encode(["error" => "Database connection failed: " . $mysqli->connect_error]);
    exit();
}

$model = new UserModel($mysqli);
$controller = new UserController($model);
$response = $controller->register($input);

echo json_encode($response);
