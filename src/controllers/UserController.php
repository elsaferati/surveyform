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

        if ($this->model->isEmailRegistered($email)) {
            return ["error" => "Email already registered"];
        }

        $success = $this->model->registerUser($name, $email, $password);

        if ($success) {
            return ["success" => "User registered successfully"];
        } else {
            return ["error" => "Registration failed"];
        }
    }
}
