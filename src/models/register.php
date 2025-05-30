<?php
require_once __DIR__ . '/UserModel.php';
require_once __DIR__ . '/../controllers/UserController.php';

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

// Extract input values
$email = trim($input["email"]);
$password = $input["password"];
$confirmPassword = $input["confirmPassword"];
$name = trim($input["name"]);

// VALIDIM EMAIL: duhet të ketë min 3 karaktere para @ dhe format të vlefshëm
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Email-i nuk është në formatin e duhur"]);
    exit();
}

$parts = explode('@', $email);
if (strlen($parts[0]) < 3) {
    echo json_encode(["error" => "Pjesa para '@' në email duhet të ketë të paktën 3 karaktere"]);
    exit();
}

// VALIDIM PASSWORD: min 6 karaktere, të përmbajë shkronja dhe numra
if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/', $password)) {
    echo json_encode([
        "error" => "Fjalëkalimi duhet të ketë të paktën 6 karaktere dhe të përmbajë shkronja dhe numra"
    ]);
    exit();
}

// Kontrollo që fjalëkalimi dhe konfirmimi i fjalëkalimit janë të njëjtë
if ($password !== $confirmPassword) {
    echo json_encode(["error" => "Fjalëkalimi dhe konfirmimi i fjalëkalimit nuk përputhen"]);
    exit();
}

// VALIDIM NAME: min 3 karaktere dhe vetëm shkronja
if (strlen($name) < 3 || !preg_match("/^[a-zA-Z]+$/", $name)) {
    echo json_encode([
        "error" => "Emri duhet të ketë të paktën 3 karaktere dhe të përmbajë vetëm shkronja"
    ]);
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
