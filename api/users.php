<?php
require_once __DIR__ . '/../src/models/UserModel.php';
require_once __DIR__ . '/../src/controllers/UserController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "", "user_registration");
if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    exit();
}

$model = new UserModel($mysqli);
$controller = new UserController($model);

$users = $controller->getUsers();
echo json_encode($users);
