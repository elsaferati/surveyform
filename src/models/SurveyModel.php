<?php
class SurveyModel {
    private $mysqli;

    public function __construct($mysqli) {
        $this->mysqli = $mysqli;
    }

    public function submitSurvey($data) {
        // Prepare the SQL query to insert the survey data
        $stmt = $this->mysqli->prepare(
            "INSERT INTO survey_responses (name, email, question1, question2, question3, rating, ageGroup, feedbackType, submitted_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())"
        );

        // Bind parameters
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

        // Execute the query
        if ($stmt->execute()) {
            return ["success" => true, "message" => "Survey submitted successfully"];
        } else {
            return ["error" => "Failed to submit survey: " . $stmt->error];
        }
    }
}
?>
