<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/../../config/config.php';

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data || !isset($data['id'])) {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
    exit();
}

$stmt = $conn->prepare("
    UPDATE survey_responses 
    SET name = ?, email = ?, question1 = ?, question2 = ?, question3 = ?, 
        rating = ?, ageGroup = ?, feedbackType = ?
    WHERE id = ?
");

$stmt->bind_param(
    "ssssssssi",
    $data['name'],
    $data['email'],
    $data['question1'],
    $data['question2'],
    $data['question3'],
    $data['rating'],
    $data['ageGroup'],
    $data['feedbackType'],
    $data['id']
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
