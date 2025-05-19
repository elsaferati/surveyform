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
