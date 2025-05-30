<?php
require_once __DIR__ . '/UserModel.php';
require_once __DIR__ . '/../controllers/UserController.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Lexo input-in JSON
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["email"], $input["password"])) {
    echo json_encode(["error" => "Email or password missing"]);
    exit();
}

$email = $input["email"];
$password = $input["password"];

// ✅ VALIDIM EMAIL: duhet të ketë min 3 karaktere para @ dhe format të vlefshëm
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Email-i nuk është në formatin e duhur"]);
    exit();
}

$parts = explode('@', $email);
if (strlen($parts[0]) < 3) {
    echo json_encode(["error" => "Pjesa para '@' në email duhet të ketë të paktën 3 karaktere"]);
    exit();
}

// ✅ VALIDIM PASSWORD: min 6 karaktere, të përmbajë shkronja dhe numra
if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/', $password)) {
    echo json_encode([
        "error" => "Fjalëkalimi duhet të ketë të paktën 6 karaktere dhe të përmbajë shkronja dhe numra"
    ]);
    exit();
}

if (!isset($input["email"], $input["password"])) {
    echo json_encode(["error" => "Email or password missing"]);
    exit();
}

$mysqli = new mysqli("localhost", "root", "", "user_registration");
if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    exit();
}

$model = new UserModel($mysqli);

// Gjej përdoruesin sipas emailit
$stmt = $mysqli->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
$stmt->bind_param("s", $input["email"]);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "User not found"]);
    exit();
}

$user = $result->fetch_assoc();

// Verifiko fjalëkalimin
if (password_verify($input["password"], $user["password"])) {
    // Hiq passwordin nga përgjigjja
    unset($user["password"]);
    echo json_encode([
        "success" => true,
        "user" => $user
    ]);
} else {
    echo json_encode(["error" => "Invalid password"]);
}

$stmt->close();
$mysqli->close();
