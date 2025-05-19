<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/../../config/config.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Read JSON input
$input = file_get_contents("php://input");

if (!$input) {
    echo json_encode(["success" => false, "error" => "No input received"]);
    exit();
}

$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["success" => false, "error" => "Invalid JSON", "raw" => $input]);
    exit();
}

// Required fields
$requiredFields = ['name', 'email', 'question1', 'question2', 'question3', 'rating', 'ageGroup', 'feedbackType'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field])) {
        echo json_encode(["success" => false, "error" => "Missing field: $field"]);
        exit();
    }
}

// Prepare SQL statement
$stmt = $conn->prepare("
    INSERT INTO survey_responses 
    (name, email, question1, question2, question3, rating, ageGroup, feedbackType)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

if (!$stmt) {
    echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
    exit();
}

// Bind parameters
$stmt->bind_param(
    "ssssssss",
    $data['name'],
    $data['email'],
    $data['question1'],
    $data['question2'],
    $data['question3'],
    $data['rating'],
    $data['ageGroup'],
    $data['feedbackType']
);

// Execute and respond
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Execute failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
