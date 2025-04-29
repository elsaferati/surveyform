<?php
class SurveyResponse {
  private $conn;

  public function __construct($db) {
    $this->conn = $db;
  }

  public function submit($data) {
    $stmt = $this->conn->prepare(
      "INSERT INTO responses (name, email, question1, question2, question3, rating)
       VALUES (?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param(
      "ssssss",
      $data->name,
      $data->email,
      $data->question1,
      $data->question2,
      $data->question3,
      $data->rating
    );

    return $stmt->execute();
  }
}
