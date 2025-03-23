(function ($) {

    "use strict";

    var $document = $(document),
        $window = $(window),
        forms = {
            contactForm: $('#contactform'),
            appointmentForm: $('#appointment-form'),
            loginForm: $('#login-form'), // Modal login form
            registerForm: $('#register-form') // Modal register form
        };

    $document.ready(function () {

        // appointment form
        if (forms.appointmentForm.length) {
            var $appointmentForm = forms.appointmentForm;
            $appointmentForm.validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    message: {
                        required: true,
                        minlength: 20
                    },
                    email: {
                        required: true,
                        email: true
                    }

                },
                messages: {
                    name: {
                        required: "Please enter your name",
                        minlength: "Your name must consist of at least 2 characters"
                    },
                    message: {
                        required: "Please enter message",
                        minlength: "Your message must consist of at least 20 characters"
                    },
                    email: {
                        required: "Please enter your email"
                    }
                },
                submitHandler: function (form) {
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),
                        url: "form/process-appointment.php",
                        success: function () {
                            $('#successAppointment').fadeIn();
                            $('#appointment-form').each(function () {
                                this.reset();
                            });
                        },
                        error: function () {
                            $('#appointment-form').fadeTo("slow", 0, function () {
                                $('#errorAppointment').fadeIn();
                            });
                        }
                    });
                }
            });
        }

        // contact page form
        if (forms.contactForm.length) {
            var $contactform = forms.contactForm;
            $contactform.validate({
                rules: {
                    firstname: {
                        required: true,
                        minlength: 2
                    },
                    lastname: {
                        required: true,
                        minlength: 2
                    },
                    message: {
                        required: true,
                        minlength: 20
                    },
                    email: {
                        required: true,
                        email: true
                    }

                },
                messages: {
                    firstname: {
                        required: "Please enter your first name",
                        minlength: "Your name must consist of at least 2 characters"
                    },
                    lastname: {
                        required: "Please enter your last name",
                        minlength: "Your name must consist of at least 2 characters"
                    },
                    message: {
                        required: "Please enter message",
                        minlength: "Your message must consist of at least 20 characters"
                    },
                    email: {
                        required: "Please enter your email"
                    }
                },
                submitHandler: function (form) {
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),
                        url: "form/process-contact.php",
                        success: function () {
                            $('#success').fadeIn();
                            $('#contactform').each(function () {
                                this.reset();
                            });
                        },
                        error: function () {
                            $('#contactform').fadeTo("slow", 0, function () {
                                $('#error').fadeIn();
                            });
                        }
                    });
                }
            });
        }

        // Modal login form
        if (forms.loginForm.length) {
            forms.loginForm.validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        minlength: 6
                    }
                },
                messages: {
                    email: {
                        required: "Please enter your email",
                        email: "Please enter a valid email address"
                    },
                    password: {
                        required: "Please enter your password",
                        minlength: "Your password must be at least 6 characters long"
                    }
                },
                submitHandler: function (form) {
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),
                        url: "form/process-contact.php",
                        success: function (response) {
                            $('#login-notification').text('Login successful!').css('background-color', '#4CAF50').fadeIn();
                            forms.loginForm[0].reset(); // Clear the form
                        },
                        error: function () {
                            $('#login-notification').text('Failed to submit form. Please try again.').css('background-color', '#F44336').fadeIn();
                        }
                    });
                }
            });
        }

        // Modal register form
        if (forms.registerForm.length) {
            forms.registerForm.validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    lastname: {
                        required: true,
                        minlength: 2
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        minlength: 6
                    }
                },
                messages: {
                    name: {
                        required: "Please enter your first name",
                        minlength: "Your name must be at least 2 characters long"
                    },
                    lastname: {
                        required: "Please enter your last name",
                        minlength: "Your last name must be at least 2 characters long"
                    },
                    email: {
                        required: "Please enter your email",
                        email: "Please enter a valid email address"
                    },
                    password: {
                        required: "Please enter your password",
                        minlength: "Your password must be at least 6 characters long"
                    }
                },
                submitHandler: function (form) {
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),
                        url: "form/process-contact.php",
                        success: function (response) {
                            $('#register-notification').text('Registration successful!').css('background-color', '#4CAF50').fadeIn();
                            forms.registerForm[0].reset(); // Clear the form
                        },
                        error: function () {
                            $('#register-notification').text('Failed to submit form. Please try again.').css('background-color', '#F44336').fadeIn();
                        }
                    });
                }
            });
        }

    });

})(jQuery);