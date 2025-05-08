<?php
require_once __DIR__ . '/../src/models/SurveyModel.php';

class SurveyController {
    private $model;

    public function __construct($model) {
        $this->model = $model;
    }

    public function submitSurvey($data) {
        // Perform simple validation
        if (empty($data['name']) || empty($data['email']) || empty($data['question1']) || empty($data['question2']) || empty($data['question3']) || empty($data['rating'])) {
            return ["error" => "All fields are required"];
        }

        // Call the model to insert data into the database
        return $this->model->submitSurvey($data);
    }
}
?>
