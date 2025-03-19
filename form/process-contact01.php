// <?php
    $to = "kefox.nwoko@gmail.com";  // Replace with your email
    $from = $_REQUEST['email'];
    $firstname = $_REQUEST['firstname'];
    $lastname = $_REQUEST['lastname'];
    $message = $_REQUEST['message'];
    $headers = "From: $from";
    $subject = "Contact Form Eezy Lets Limited";

    $fields = array();
    $fields["firstname"] = "First Name";
    $fields["lastname"] = "Last Name";
    $fields["email"] = "Email";
    $fields["message"] = "Message";

    $body = "Here is what was sent:\n\n";
    foreach($fields as $a => $b) {
        $body .= sprintf("%20s: %s\n\n", $b, $_REQUEST[$a]);
    }

    $send = mail($to, $subject, $body, $headers);

    // ✅ Response
    if ($send) {
        echo "success";
    } else {
        echo "error";
    }
?>
