<?php
require_once __DIR__ . '/../src/models/UserModel.php';
require_once __DIR__ . '/../src/controllers/UserController.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get and decode JSON input
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

if (!$input) {
    echo json_encode(["error" => "Invalid JSON input", "raw" => $rawInput]);
    exit();
}

// Database connection
$mysqli = new mysqli("localhost", "root", "", "user_registration");
if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    exit();
}

$model = new UserModel($mysqli);
$controller = new UserController($model);
$response = $controller->register($input);

echo json_encode($response);
