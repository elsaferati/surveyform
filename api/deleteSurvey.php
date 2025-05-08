<?php
require_once './backend/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json");

// Ensure the 'id' is present and valid
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    $stmt = $conn->prepare("DELETE FROM survey_responses WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Deleted"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to delete"]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid ID"]);
}

$conn->close();
