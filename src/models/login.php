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

// Read JSON input
$input = json_decode(file_get_contents("php://input"), true);

// Check required fields
if (!isset($input["email"], $input["password"])) {
    echo json_encode(["error" => "Email or password missing"]);
    exit();
}

$email = $input["email"];
$password = $input["password"];

// Validate email format and length before @
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Email-i nuk është në formatin e duhur"]);
    exit();
}

$parts = explode('@', $email);
if (strlen($parts[0]) < 3) {
    echo json_encode(["error" => "Pjesa para '@' në email duhet të ketë të paktën 3 karaktere"]);
    exit();
}

// Validate password: min 6 chars, letters and numbers
if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/', $password)) {
    echo json_encode([
        "error" => "Fjalëkalimi duhet të ketë të paktën 6 karaktere dhe të përmbajë shkronja dhe numra"
    ]);
    exit();
}

// Connect to DB
$mysqli = new mysqli("localhost", "root", "", "user_registration");
if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    exit();
}

// Prepare and execute query
$stmt = $mysqli->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "User not found"]);
    exit();
}

$user = $result->fetch_assoc();

// Verify password
if (password_verify($password, $user["password"])) {
    unset($user["password"]); // Remove password from response
    echo json_encode([
        "success" => true,
        "user" => $user
    ]);
} else {
    echo json_encode(["error" => "Invalid password"]);
}

// Close connections
$stmt->close();
$mysqli->close();
