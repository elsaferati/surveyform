<?php
// Include necessary files
require_once __DIR__ . '/../src/models/SurveyModel.php';
require_once __DIR__ . '/../src/controllers/SurveyController.php';

// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get and decode JSON input
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

if (!$input) {
    echo json_encode(["error" => "Invalid JSON input", "raw" => $rawInput]);
    exit();
}

// Database connection
$mysqli = new mysqli("localhost", "root", "", "survey_db");  // Update database name accordingly
if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    exit();
}

// Instantiate the model and controller
$model = new SurveyModel($mysqli);
$controller = new SurveyController($model);

// Call the controller to submit the survey
$response = $controller->submitSurvey($input);

// Send the response
echo json_encode($response);
?>
