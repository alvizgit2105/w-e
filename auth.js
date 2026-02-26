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
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error checking Supabase session:', error);
      return;
    }
    if (data && data.session) {
      window.location.href = 'Dash.html';
    }
  } catch (e) {
    console.error('Unexpected error checking Supabase session:', e);
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

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error('Supabase login error:', error);
          setError('login-error', error.message || 'Login failed.');
          return;
        }

        console.log('Supabase login success:', data);
        // If Supabase returns no error, treat this as a successful login
        // and send the user to the main dashboard.
        window.location.href = 'Dash.html';
      } catch (e) {
        console.error('Unexpected error during login:', e);
        setError('login-error', 'Unexpected error during login. Check console for details.');
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

      try {
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
        if (data && data.user) {
          // If email confirmation is required, Supabase will send an email.
          setError(
            'register-error',
            'Registration successful. Please check your email to confirm your account, then log in.',
          );
          showForm('login-form');
        } else {
          setError(
            'register-error',
            'Registration succeeded. Please check your email to confirm your account.',
          );
        }
      } catch (e) {
        console.error('Unexpected error during registration:', e);
        setError('register-error', 'Unexpected error during registration. Check console for details.');
      }
    });
  }
});

