<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root'); // ose emri i përdoruesit tënd
define('DB_PASSWORD', '');     // ose fjalëkalimi yt
define('DB_NAME', 'surveyform'); // emri i bazës së të dhënave

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($mysqli->connect_error) {
    die("Lidhja dështoi: " . $mysqli->connect_error);
}
?>
