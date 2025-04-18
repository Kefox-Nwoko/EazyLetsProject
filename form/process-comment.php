<?php
require_once 'db_connection.php';

// Validate input
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['post_id'])) {
    header('HTTP/1.1 400 Bad Request');
    exit('Invalid request');
}

$post_id = intval($_POST['post_id']);
$name = trim($_POST['name'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$message = trim($_POST['message'] ?? '');

if (empty($name) || !$email || empty($message)) {
    header('Location: blog-details.php?id='.$post_id.'&error=invalid_input');
    exit;
}

try {
    // Insert comment
    $stmt = $db->prepare("
        INSERT INTO blog_comments 
        (post_id, author_name, author_email, content, created_at)
        VALUES (?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$post_id, $name, $email, $message]);
    
    // Update comments count
    $db->prepare("
        UPDATE blog_posts 
        SET comments_count = comments_count + 1 
        WHERE id = ?
    ")->execute([$post_id]);
    
    header('Location: blog-details.php?id='.$post_id.'&success=comment_added');
} catch(PDOException $e) {
    error_log('Comment submission failed: ' . $e->getMessage());
    header('Location: blog-details.php?id='.$post_id.'&error=database_error');
}