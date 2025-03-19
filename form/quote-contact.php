<?php
* $to = "kefox.nwoko@gmail.com";  // Replace with your actual email
$from = $_REQUEST['email'];
$firstname = $_REQUEST['firstname'];
$phonenumber = $_REQUEST['phonenumber'];
$message = $_REQUEST['message'];
$headers = "From: $from";
$subject = "Contact Form FindHouses Site";

// Correcting field assignments
$fields = array();
$fields["First Name"] = $firstname;
$fields["Phone Number"] = $phonenumber;
$fields["Email"] = $from;
$fields["Message"] = $message;

// Formatting email body
$body = "Here is what was sent:\n\n";
foreach ($fields as $key => $value) {
    $body .= "$key: $value\n";
}

// Send email
$send = mail($to, $subject, $body, $headers);

// Debugging output
if ($send) {
    echo "success";
} else {
    echo "error";
}
?>
