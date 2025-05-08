<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

require_once 'config.php';

$sql = "SELECT * FROM survey_responses ORDER BY submitted_at DESC";
$result = $conn->query($sql);

$surveys = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $surveys[] = $row;
    }
}

echo json_encode($surveys);
$conn->close();
