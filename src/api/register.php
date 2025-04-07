<?php
require_once '../models/UserModel.php';
require_once '../controllers/UserController.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$input = json_decode(file_get_contents("php://input"), true);

// Krijo lidhjen me databazë
$mysqli = new mysqli("localhost", "root", "", "user_registration");
if ($mysqli->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $mysqli->connect_error]));
}

// Krijo modelin dhe kontrolluesin
$model = new UserModel($mysqli);
$controller = new UserController($model);

// Thirr funksionin register
$response = $controller->register($input);

echo json_encode($response);
