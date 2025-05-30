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
    if (!isset($data[$field]) || trim($data[$field]) === '') {
        echo json_encode(["success" => false, "error" => "Missing or empty field: $field"]);
        exit();
    }
}

// Validation rules

// Name: 3-50 characters
if (strlen($data['name']) < 3 || strlen($data['name']) > 50) {
    echo json_encode(["success" => false, "error" => "Name must be between 3 and 50 characters."]);
    exit();
}

// Email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "error" => "Invalid email format."]);
    exit();
}

// Comment (question3) max 200 characters
if (strlen($data['question3']) > 200) {
    echo json_encode(["success" => false, "error" => "Comment must not exceed 200 characters."]);
    exit();
}

// Rating: Must be 1 to 5
$validRatings = ['1', '2', '3', '4', '5'];
if (!in_array($data['rating'], $validRatings)) {
    echo json_encode(["success" => false, "error" => "Invalid rating value."]);
    exit();
}

// Age group: Must be one of the allowed values
$validAgeGroups = ['18-25', '26-35', '36-45', '46+'];
if (!in_array($data['ageGroup'], $validAgeGroups)) {
    echo json_encode(["success" => false, "error" => "Invalid age group value."]);
    exit();
}

// Feedback type: Optional check or predefined values
$validFeedbackTypes = ['Sugjerim', 'Ankesë', 'Kompliment'];
if (!in_array($data['feedbackType'], $validFeedbackTypes)) {
    echo json_encode(["success" => false, "error" => "Invalid feedback type value."]);
    exit();
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
    echo json_encode(["success" => true, "message" => "Faleminderit për përgjigjen tuaj!"]);
} else {
    echo json_encode(["success" => false, "error" => "Execute failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
