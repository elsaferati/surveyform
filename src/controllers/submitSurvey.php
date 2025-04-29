<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include 'db.php';

// Decode incoming JSON data
$data = json_decode(file_get_contents("php://input"));

$name = $data->name ?? '';
$email = $data->email ?? '';
$q1 = $data->question1 ?? '';
$q2 = $data->question2 ?? '';
$q3 = $data->question3 ?? '';
$rating = $data->rating ?? '';

// Prepare SQL safely using prepared statements
$stmt = $conn->prepare("INSERT INTO responses (name, email, question1, question2, question3, rating)
                        VALUES (?, ?, ?, ?, ?, ?)");

if ($stmt) {
    $stmt->bind_param("ssssss", $name, $email, $q1, $q2, $q3, $rating);
    if ($stmt->execute()) {
        echo json_encode(["message" => "Survey submitted successfully."]);
    } else {
        echo json_encode(["error" => "Failed to execute statement: " . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["error" => "Failed to prepare statement: " . $conn->error]);
}
?>
