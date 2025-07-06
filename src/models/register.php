<?php
require_once __DIR__ . '/UserModel.php';
require_once __DIR__ . '/../controllers/UserController.php';

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Read and decode JSON input
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

if (!$input) {
    echo json_encode(["error" => "Invalid JSON input", "raw" => $rawInput]);
    exit();
}

// Extract and trim inputs
$email = trim($input["email"] ?? '');
$password = $input["password"] ?? '';
$confirmPassword = $input["confirmPassword"] ?? '';
$name = trim($input["name"] ?? '');

// Validate email format and length before '@'
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Email-i nuk është në formatin e duhur"]);
    exit();
}

$parts = explode('@', $email);
if (strlen($parts[0]) < 3) {
    echo json_encode(["error" => "Pjesa para '@' në email duhet të ketë të paktën 3 karaktere"]);
    exit();
}

// Validate password (min 6 chars, letters and numbers)
if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/', $password)) {
    echo json_encode([
        "error" => "Fjalëkalimi duhet të ketë të paktën 6 karaktere dhe të përmbajë shkronja dhe numra"
    ]);
    exit();
}

// Confirm password match
if ($password !== $confirmPassword) {
    echo json_encode(["error" => "Fjalëkalimi dhe konfirmimi i fjalëkalimit nuk përputhen"]);
    exit();
}

// Validate name (min 3 chars, only letters)
if (strlen($name) < 3 || !preg_match("/^[a-zA-Z]+$/", $name)) {
    echo json_encode([
        "error" => "Emri duhet të ketë të paktën 3 karaktere dhe të përmbajë vetëm shkronja"
    ]);
    exit();
}

// Connect to database
$mysqli = new mysqli("localhost", "root", "", "user_registration");
if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    exit();
}

// Create model and controller, register user
$model = new UserModel($mysqli);
$controller = new UserController($model);
$response = $controller->register($input);

// Output JSON response
echo json_encode($response);
