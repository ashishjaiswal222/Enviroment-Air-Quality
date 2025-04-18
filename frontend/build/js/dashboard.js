document.addEventListener('alpine:init', () => {
  Alpine.data('dashboardData', () => ({
    mode: 'indoor',
    indoorData: {
      temperature: 'Loading...',
      humidity: 'Loading...',
      pressure: 'Loading...',
      co: 'Loading...',
      aqi: 'Loading...'
    },
    outdoorData: {
      temperature: 'Loading...',
      humidity: 'Loading...',
      pressure: 'Loading...',
      aqi: 'Loading...',
      rain: 'Loading...'
    },
    get currentData() {
      return this.mode === 'indoor' ? this.indoorData : this.outdoorData;
    },
    async init() {
      // Fetch weather data
      const weather = await fetchWeather('London');
      if (weather) {
        this.outdoorData = weather;
      }

      // Fetch sensor data
      try {
        const response = await fetch('/api/sensors', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.ok) {
          this.indoorData = await response.json();
        }
      } catch (err) {
        console.error('Failed to fetch sensor data:', err);
      }

      // Initialize chart
      const ctx = document.getElementById('tempChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1h', '2h', '3h', '4h', '5h'],
          datasets: [
            {
              label: 'Temperature (°C)',
              data: this.mode === 'indoor' ? [28, 27, 28, 29, 28] : [30, 31, 29, 30, 31],
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: false }
          }
        }
      });
    }
  }));
});