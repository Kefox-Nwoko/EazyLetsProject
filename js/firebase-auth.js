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

// Logout function
window.logout = async function() {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Logout failed:", error);
    alert(`Logout failed: ${error.message}`);
  }
}

// Update profile display
function updateProfileDisplay(user) {
  const profileElement = document.querySelector('.header-user-name');
  if (user) {
    const username = user.email.split('@')[0];
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
    profileElement.innerHTML = `<span><img src="images/testimonials/ts-1.jpg" alt=""></span>`;
    
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
  if (window.location.pathname.includes('user-profile.html') && !user) {
    window.location.href = 'login.html';
  }
});

// Login form handler
const loginForm = document.querySelector('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "user-profile.html";
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  });
}

// Register form handler
const registerForm = document.querySelector('#register-form') || document.querySelector('#main-register-form2');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = registerForm.querySelector('input[name="email"]').value;
    const password = registerForm.querySelector('input[name="password"]').value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      window.location.href = "user-profile.html";
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  });
}

// Forgot password handler
const forgotPasswordLink = document.querySelector('#forgot');
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener('click', async () => {
    const email = prompt("Please enter your email address:");
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent. Please check your inbox.");
      } catch (error) {
        alert(`Error sending reset email: ${error.message}`);
      }
    }
  });
}