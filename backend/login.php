<?php
session_start();
require_once "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    $sql = "SELECT id, username, password FROM users WHERE username = ?";
    if ($stmt = $mysqli->prepare($sql)) {
        $stmt->bind_param("s", $param_username);
        $param_username = $username;

        if ($stmt->execute()) {
            $stmt->store_result();
            if ($stmt->num_rows == 1) {
                $stmt->bind_result($id, $username, $hashed_password);
                if ($stmt->fetch()) {
                    if (password_verify($password, $hashed_password)) {
                        $_SESSION["loggedin"] = true;
                        $_SESSION["id"] = $id;
                        $_SESSION["username"] = $username;
                        echo json_encode(["success" => true]);
                        exit;
                    }
                }
            }
        }
        $stmt->close();
    }
    echo json_encode(["success" => false, "message" => "Emri i përdoruesit ose fjalëkalimi është i pasaktë."]);
}
?>
