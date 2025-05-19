// firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNeMjhAZ0Jn-2AHAWcV4RUQbsTnhkMhBk",
  authDomain: "eezy-lets.firebaseapp.com",
  projectId: "eezy-lets",
  storageBucket: "eezy-lets.firebasestorage.app",
  messagingSenderId: "616871576454",
  appId: "1:616871576454:web:ca03c975a3139852f1e207",
  measurementId: "G-XT2RR1Q26W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth functions
export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail };

// Select message elements from potentially different pages/modals
const loginMessageElement = document.querySelector('#login-message');
const registerMessageElement = document.querySelector('#register-message');
const forgotPasswordMessageElement = document.querySelector('#forgot-password-message');

// Helper function to display messages
function displayMessage(element, message, isError = true) {
    if (element) {
        element.textContent = message;
        element.style.color = isError ? 'red' : 'green';
    }
}

// Helper function to clear messages
function clearMessages() {
    if (loginMessageElement) loginMessageElement.textContent = '';
    if (registerMessageElement) registerMessageElement.textContent = '';
    if (forgotPasswordMessageElement) forgotPasswordMessageElement.textContent = '';
}

// Clear messages on input focus (optional, but good for UX)
document.querySelectorAll('input[name="email"], input[name="password"], input[name="first_name"], input[name="last_name"], input[id="reg-password-confirm"]').forEach(input => {
    input.addEventListener('focus', clearMessages);
});


// Logout function
window.logout = async function() {
  try {
    await signOut(auth);
    // Clear any messages on logout
    clearMessages();
    window.location.href = "index.html";
  } catch (error) {
    console.error("Logout failed:", error);
    // If there's a message area for logout (e.g., on user profile page), display there
    // Otherwise, a simple alert might be acceptable here as it's less frequent
    alert(`Logout failed: ${error.message}`);
  }
}

// Update profile display
function updateProfileDisplay(user) {
  const profileElement = document.querySelector('.header-user-name');
  if (user) {
    const username = user.email.split('@')[0]; // Basic username from email
    // You might want to store and retrieve a display name from user.displayName or a database
    profileElement.innerHTML = `
      <span><img src="images/testimonials/ts-1.jpg" alt=""></span>
      Hi, ${username}!
    `;

    // Show user menu items
    document.querySelectorAll('.user-menu').forEach(menu => {
      menu.style.display = 'block';
    });
    document.querySelectorAll('.sign-in').forEach(signIn => {
      signIn.style.display = 'none';
    });
  } else {
    profileElement.innerHTML = `<span><img src="images/testimonials/ts-1.jpg" alt=""></span>`; // Or a default icon

    // Hide user menu items
    document.querySelectorAll('.user-menu').forEach(menu => {
      menu.style.display = 'none';
    });
    document.querySelectorAll('.sign-in').forEach(signIn => {
      signIn.style.display = 'block';
    });
  }
}

// Handle auth state changes
onAuthStateChanged(auth, (user) => {
  updateProfileDisplay(user);

  // Protect user-profile page
  // This should ideally be done server-side for true protection,
  // but this client-side check prevents unauthorized access via URL in most cases.
  if (window.location.pathname.includes('user-profile.html') && !user) {
    window.location.href = 'login.html';
  }
});

// Login form handler
const loginForm = document.querySelector('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages(); // Clear previous messages
    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      displayMessage(loginMessageElement, "Login successful!", false); // Pass false for success (green)
      // Use a small delay before redirecting to allow user to see the success message
      setTimeout(() => {
          window.location.href = "user-profile.html";
      }, 1500); // Redirect after 1.5 seconds

    } catch (error) {
      displayMessage(loginMessageElement, `Login failed: ${error.message}`); // isError is true by default
      console.error("Login failed:", error); // Keep console log for debugging
    }
  });
}

// Register form handler
// Select both possible forms (#register-form for the standalone page and #main-register-form2 for the modal)
const registerForm = document.querySelector('#register-form') || document.querySelector('#main-register-form2');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages(); // Clear previous messages
    const emailInput = registerForm.querySelector('input[name="email"]');
    const passwordInput = registerForm.querySelector('input[name="password"]');
    const confirmPasswordInput = registerForm.querySelector('input[id="reg-password-confirm"]'); // Assuming id="reg-password-confirm" is used

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : password; // Handle case where confirm input doesn't exist

    // Client-side password confirmation check
    if (password !== confirmPassword) {
        displayMessage(registerMessageElement, "Passwords do not match.");
        return; // Stop the registration process
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      displayMessage(registerMessageElement, "Registration successful!", false); // Pass false for success (green)
      // Use a small delay before redirecting to allow user to see the success message
      setTimeout(() => {
        window.location.href = "user-profile.html";
      }, 1500); // Redirect after 1.5 seconds
    } catch (error) {
      displayMessage(registerMessageElement, `Registration failed: ${error.message}`); // isError is true by default
      console.error("Registration failed:", error); // Keep console log for debugging
    }
  });
}

// Forgot password handler
const forgotPasswordLink = document.querySelector('#forgot');
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener('click', async () => {
    clearMessages(); // Clear previous messages
    const email = prompt("Please enter your email address for password reset:"); // Added clarity to prompt
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        // Assuming the message area for forgot password exists on the current page (login.html or modal)
        displayMessage(forgotPasswordMessageElement, "Password reset email sent. Please check your inbox.", false); // Pass false for success (green)
      } catch (error) {
        displayMessage(forgotPasswordMessageElement, `Error sending reset email: ${error.message}`); // isError is true by default
        console.error("Error sending reset email:", error); // Keep console log for debugging
      }
    } else if (email !== null) { // Handle case where user cancels the prompt
        displayMessage(forgotPasswordMessageElement, "Password reset request cancelled.");
    }
  });
}