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

    if ($stmt->execute()) {
      return true;
    } else {
      return ["error" => "Execute failed: " . $stmt->error];
    }
  }
  public function getAllUsers()
  {
    $result = $this->conn->query("SELECT id, name, email, created_at FROM users");
    $users = [];
    while ($row = $result->fetch_assoc()) {
      $users[] = $row;
    }
    return $users;
  }
  public function getUserByEmail($email)
  {
    $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
  }
}
