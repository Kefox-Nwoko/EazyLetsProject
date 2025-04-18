<?php
// 1. Authentication check
session_start();
if(!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit();
}

// 2. Process form data
$title = $_POST['blog-title'];
$content = $_POST['blog-content']; 
$excerpt = $_POST['blog-excerpt'];
$status = $_POST['blog-status'];

// 3. Handle image upload
$imagePath = '';
if(isset($_FILES['blog-image'])) {
    $targetDir = "uploads/blog/";
    $imagePath = $targetDir . basename($_FILES["blog-image"]["name"]);
    move_uploaded_file($_FILES["blog-image"]["tmp_name"], $imagePath);
}

// 4. Save to database (MySQL example)
$db = new PDO('mysql:host=localhost;dbname=your_db', 'username', 'password');
$stmt = $db->prepare("INSERT INTO blog_posts (title, content, excerpt, image, status) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$title, $content, $excerpt, $imagePath, $status]);

// 5. Redirect
header("Location: blog.php?success=1");
?>