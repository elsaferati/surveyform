<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);
$email = $input["email"] ?? null;

if (!$email) {
    echo json_encode(["error" => "Email-i mungon."]);
    exit();
}

$mysqli = new mysqli("localhost", "root", "", "user_registration");

if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    exit();
}

// Kontrollo nëse ekziston përdoruesi
$stmt = $mysqli->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "Email-i nuk ekziston."]);
    exit();
}

// Për thjeshtësi, nuk dërgojmë email por simulojmë një sukses
echo json_encode([
    "success" => true,
    "message" => "Një email për resetim është dërguar (simulim)."
]);

$stmt->close();
$mysqli->close();
