document.addEventListener('alpine:init', () => {
    Alpine.data('settingsForm', () => ({
      temperatureThreshold: 35,
      coThreshold: 1,
      error: '',
      async init() {
        try {
          const response = await fetch('/api/settings', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          if (response.ok) {
            const settings = await response.json();
            this.temperatureThreshold = settings.temperatureThreshold;
            this.coThreshold = settings.coThreshold;
          }
        } catch (err) {
          console.error('Failed to load settings:', err);
        }
      },
      async saveSettings() {
        try {
          const response = await fetch('/api/settings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              temperatureThreshold: this.temperatureThreshold,
              coThreshold: this.coThreshold
            })
          });
          if (!response.ok) {
            const error = await response.json();
            this.error = error.message || 'Failed to save settings';
            return;
          }
          this.error = '';
          console.log('Settings saved successfully');
        } catch (err) {
          this.error = 'An error occurred';
          console.error(err);
        }
      }
    }));
  });