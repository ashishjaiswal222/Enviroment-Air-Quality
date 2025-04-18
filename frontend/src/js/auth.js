document.addEventListener('alpine:init', () => {
    Alpine.data('auth', () => ({
      email: '',
      password: '',
      error: '',
      async login() {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.email, password: this.password })
          });
          const data = await response.json();
          if (!response.ok) {
            this.error = data.message || 'Login failed';
            return;
          }
          localStorage.setItem('token', data.token);
          window.location.href = '/dashboard.html';
        } catch (err) {
          this.error = 'An error occurred';
        }
      },
      async signup() {
        try {
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.email, password: this.password })
          });
          const data = await response.json();
          if (!response.ok) {
            this.error = data.message || 'Signup failed';
            return;
          }
          localStorage.setItem('token', data.token);
          window.location.href = '/dashboard.html';
        } catch (err) {
          this.error = 'An error occurred';
        }
      },
      checkAuth() {
        if (!localStorage.getItem('token') && !['/login.html', '/register.html', '/reset.html'].includes(window.location.pathname)) {
          window.location.href = '/login.html';
        }
      }
    }));
  });