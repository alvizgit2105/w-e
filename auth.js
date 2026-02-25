import { supabase } from './supabaseClient.js';

function setError(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!message) {
    el.textContent = '';
    el.style.display = 'none';
  } else {
    el.textContent = message;
    el.style.display = 'block';
  }
}

async function redirectIfAuthenticated() {
  const { data, error } = await supabase.auth.getSession();
  if (!error && data.session) {
    window.location.href = 'Dash.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // If we're on the login/register page, wire up forms
  const loginFormWrapper = document.getElementById('login-form');
  const registerFormWrapper = document.getElementById('register-form');

  if (!loginFormWrapper || !registerFormWrapper) {
    return;
  }

  redirectIfAuthenticated();

  const loginForm = loginFormWrapper.querySelector('form');
  const registerForm = registerFormWrapper.querySelector('form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      setError('login-error', '');

      const formData = new FormData(loginForm);
      const email = (formData.get('email') || '').toString().trim();
      const password = (formData.get('password') || '').toString();

      if (!email || !password) {
        setError('login-error', 'Email and password are required.');
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError('login-error', error.message || 'Login failed.');
        return;
      }

      if (data.session) {
        window.location.href = 'Dash.html';
      } else {
        setError('login-error', 'Login succeeded but no session was returned.');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      setError('register-error', '');

      const formData = new FormData(registerForm);
      const name = (formData.get('name') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const password = (formData.get('password') || '').toString();

      if (!name || !email || !password) {
        setError('register-error', 'All fields are required.');
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) {
        setError('register-error', error.message || 'Registration failed.');
        return;
      }

      // Depending on your Supabase auth settings, email confirmation may be required.
      // For now, just redirect to dashboard on success.
      if (data.user) {
        window.location.href = 'Dash.html';
      } else {
        setError(
          'register-error',
          'Registration succeeded. Please check your email to confirm your account.',
        );
      }
    });
  }
});

