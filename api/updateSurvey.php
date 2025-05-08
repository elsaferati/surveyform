<?php
require_once './backend/config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['id']) &&
    isset($data['name']) &&
    isset($data['email']) &&
    isset($data['question1']) &&
    isset($data['question2']) &&
    isset($data['question3']) &&
    isset($data['rating']) &&
    isset($data['ageGroup']) &&
    isset($data['feedbackType'])
) {
    $stmt = $conn->prepare("
        UPDATE survey_responses SET 
            name = ?, 
            email = ?, 
            question1 = ?, 
            question2 = ?, 
            question3 = ?, 
            rating = ?, 
            ageGroup = ?, 
            feedbackType = ?
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
        echo json_encode(["message" => "Update successful"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to update"]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing or invalid fields"]);
}

$conn->close();
