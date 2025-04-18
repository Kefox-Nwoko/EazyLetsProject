$(document).ready(function() {
    // Client-side validation for login form
    $('form[name="registerform"]').submit(function(e) {
        const email = $('#email').val();
        const password = $('#password').val();
        
        if (!email || !password) {
            alert('Please fill all fields');
            return false;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email');
            return false;
        }
        
        return true;
    });
    
    // Client-side validation for registration form
    $('#main-register-form2').submit(function(e) {
        const firstName = $('input[name="name"]').val();
        const lastName = $('input[name="name2"]').val();
        const email = $('input[name="email"]').val();
        const password = $('input[name="password"]').val();
        
        if (!firstName || !lastName || !email || !password) {
            alert('Please fill all fields');
            return false;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email');
            return false;
        }
        
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return false;
        }
        
        return true;
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});