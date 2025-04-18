document.addEventListener('alpine:init', () => {
    Alpine.data('loginForm', () => ({
      email: '',
      password: '',
      error: '',
      async validateForm() {
        if (!this.email) {
          this.error = 'Email is required';
          return;
        }
        if (!this.password) {
          this.error = 'Password is required';
          return;
        }
  
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
          console.log('Login successful:', data);
          localStorage.setItem('token', data.token);
          window.location.href = '/dashboard.html';
        } catch (err) {
          this.error = 'An error occurred';
          console.error(err);
        }
      }
    }));
  
    Alpine.data('registerForm', () => ({
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      async validateRegister() {
        if (!this.email) {
          this.error = 'Email is required';
          return;
        }
        if (!this.password) {
          this.error = 'Password is required';
          return;
        }
        if (this.password !== this.confirmPassword) {
          this.error = 'Passwords do not match';
          return;
        }
  
        try {
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.email, password: this.password })
          });
          const data = await response.json();
          if (!response.ok) {
            this.error = data.message || 'Registration failed';
            return;
          }
          console.log('Registration successful:', data);
          localStorage.setItem('token', data.token);
          window.location.href = '/dashboard.html';
        } catch (err) {
          this.error = 'An error occurred';
          console.error(err);
        }
      }
    }));
  
    Alpine.data('resetForm', () => ({
      email: '',
      error: '',
      validateReset() {
        if (!this.email) {
          this.error = 'Email is required';
        } else {
          this.error = '';
          console.log('Reset requested for:', this.email);
          // TODO: Implement password reset API
        }
      }
    }));
  });