<?php
require_once __DIR__ . '/../models/UserModel.php';

class UserController
{
    private $model;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function register($data)
    {
        $name = $data["name"] ?? '';
        $email = $data["email"] ?? '';
        $password = $data["password"] ?? '';

        if (empty($name) || empty($email) || empty($password)) {
            return ["error" => "All fields are required."];
        }

        if ($this->model->isEmailRegistered($email)) {
            return ["error" => "Email already registered"];
        }

        $result = $this->model->registerUser($name, $email, $password);

        if (is_array($result) && isset($result["error"])) {
            return ["error" => $result["error"]];
        }

        return $result ? ["success" => "User registered successfully"] : ["error" => "Registration failed"];
    }
}
