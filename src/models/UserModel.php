<?php
class UserModel
{
  private $conn;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  public function isEmailRegistered($email)
  {
    $stmt = $this->conn->prepare("SELECT id FROM users WHERE email = ?");
    if (!$stmt) return false;
    $stmt->bind_param("s", $email);
    $stmt->execute();
    return $stmt->get_result()->num_rows > 0;
  }

  public function registerUser($name, $email, $password)
  {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $this->conn->prepare("INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())");

    if (!$stmt) {
      return ["error" => "Prepare failed: " . $this->conn->error];
    }

    $stmt->bind_param("sss", $name, $email, $hashedPassword);

    if (!$stmt->execute()) {
      return ["error" => "Execute failed: " . $stmt->error];
    }

    return true;
  }
}
