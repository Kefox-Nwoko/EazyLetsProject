<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$conn = new mysqli('localhost', 'your_database_username', 'your_database_password', 'eazylets_blog');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_GET['id'];
$sql = "DELETE FROM posts WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
if ($stmt->execute()) {
    echo "<p>Post deleted successfully.</p>";
    header("Location: dashboard.php");
    exit();
} else {
    echo "<p>Error: " . $stmt->error . "</p>";
}
$stmt->close();
$conn->close();
?>