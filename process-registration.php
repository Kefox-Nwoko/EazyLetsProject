<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    file_put_contents('registration_log.txt', print_r($_POST, true), FILE_APPEND);
    echo "Data received!";
}
?>