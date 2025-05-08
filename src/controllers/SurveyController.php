<?php
require_once __DIR__ . '/../models/SurveyModel.php';

class SurveyController
{
    private $model;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function submitSurvey($data)
    {
        if (
            empty($data['name']) ||
            empty($data['email']) ||
            empty($data['question1']) ||
            empty($data['question2']) ||
            empty($data['question3']) ||
            empty($data['rating'])
        ) {
            return ["error" => "All required fields must be filled"];
        }

        return $this->model->submitSurvey($data);
    }

    public function getAllSurveys()
    {
        return $this->model->fetchAllSurveys();
    }
}
