<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$email = $data->email;
$q1 = $data->question1;
$q2 = $data->question2;

$sql = "INSERT INTO responses (name, email, question1, question2)
        VALUES ('$name', '$email', '$q1', '$q2')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Survey submitted successfully."]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>
