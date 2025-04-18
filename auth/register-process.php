<?php
// Database configuration
$host = "localhost";
$username = "your_db_username";
$password = "your_db_password";
$dbname = "your_db_name";

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process registration
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $name2 = $_POST['name2'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    
    // Check if user already exists
    $check_sql = "SELECT id FROM users WHERE email = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("s", $email);
    $check_stmt->execute();
    $check_stmt->store_result();
    
    if ($check_stmt->num_rows > 0) {
        echo "Email already registered";
    } else {
        $insert_sql = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
        $insert_stmt = $conn->prepare($insert_sql);
        $insert_stmt->bind_param("ssss", $name, $name2, $email, $password);
        
        if ($insert_stmt->execute()) {
            echo "success";
        } else {
            echo "Error: " . $insert_stmt->error;
        }
        
        $insert_stmt->close();
    }
    
    $check_stmt->close();
}

$conn->close();
?>