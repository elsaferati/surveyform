<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../backend/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
    exit();
}

parse_str($_SERVER['QUERY_STRING'], $query);
$id = $query['id'] ?? null;

if (!$id) {
    echo json_encode(["success" => false, "error" => "Missing ID"]);
    exit();
}

$stmt = $conn->prepare("DELETE FROM survey_responses WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
