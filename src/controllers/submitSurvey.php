<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include 'db.php';  // your MySQL connection

$data = json_decode(file_get_contents("php://input"));

$name          = $data->name          ?? '';
$email         = $data->email         ?? '';
$q1            = $data->question1    ?? '';
$q2            = $data->question2    ?? '';
$q3            = $data->question3    ?? '';
$rating        = $data->rating       ?? '';

// Prepare and bind
$stmt = $conn->prepare(
  "INSERT INTO responses (name, email, question1, question2, question3, rating)
   VALUES (?, ?, ?, ?, ?, ?)"
);

if ($stmt) {
  $stmt->bind_param("ssssss", $name, $email, $q1, $q2, $q3, $rating);
  if ($stmt->execute()) {
    echo json_encode(["message" => "Survey submitted successfully."]);
  } else {
    http_response_code(500);
    echo json_encode(["error" => $stmt->error]);
  }
  $stmt->close();
} else {
  http_response_code(500);
  echo json_encode(["error" => $conn->error]);
}

$conn->close();
?>
