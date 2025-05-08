<?php
class SurveyModel
{
    private $mysqli;

    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

    public function submitSurvey($data)
    {
        $stmt = $this->mysqli->prepare(
            "INSERT INTO survey_responses (name, email, question1, question2, question3, rating, ageGroup, feedbackType)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->bind_param(
            "ssssssss",
            $data['name'],
            $data['email'],
            $data['question1'],
            $data['question2'],
            $data['question3'],
            $data['rating'],
            $data['ageGroup'],
            $data['feedbackType']
        );

        if ($stmt->execute()) {
            return ["success" => true];
        } else {
            return ["error" => $stmt->error];
        }
    }

    public function fetchAllSurveys()
    {
        $result = $this->mysqli->query("SELECT * FROM survey_responses ORDER BY submitted_at DESC");
        $surveys = [];

        while ($row = $result->fetch_assoc()) {
            $surveys[] = $row;
        }

        return $surveys;
    }
}
