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
    alerts: [],
    charts: {},
    get currentData() {
      return this.mode === 'indoor' ? this.indoorData : this.outdoorData;
    },
    async init() {
      // Initialize WebSocket
      const wsUrl = window.location.protocol === 'https:' ? 'wss://' + window.location.host : 'ws://localhost:5000';
      const ws = new WebSocket(wsUrl);
      ws.onopen = () => console.log('WebSocket connected');
      ws.onmessage = (event) => {
        const { type, data } = JSON.parse(event.data);
        if (type === 'DATA_UPDATE') {
          this.indoorData = {
            temperature: data.indoor.temperature ? `${data.indoor.temperature}°C` : 'N/A',
            humidity: data.indoor.humidity ? `${data.indoor.humidity}%` : 'N/A',
            pressure: data.indoor.pressure ? `${data.indoor.pressure} hPa` : 'N/A',
            co: data.indoor.co ? `${data.indoor.co} ppm` : 'N/A',
            aqi: data.indoor.aqi || 'N/A'
          };
          this.outdoorData = {
            temperature: data.outdoor.temperature || 'N/A',
            humidity: data.outdoor.humidity || 'N/A',
            pressure: data.outdoor.pressure || 'N/A',
            aqi: data.outdoor.aqi || 'N/A',
            rain: data.outdoor.rain || 'N/A'
          };
          this.alerts = data.alerts || [];
          this.updateCharts();
        }
      };
      ws.onerror = (error) => console.error('WebSocket error:', error);
      ws.onclose = () => console.log('WebSocket disconnected');

      // Initialize charts
      const chartConfigs = [
        { id: 'tempChart', label: 'Temperature (°C)', key: 'temperature' },
        { id: 'humidityChart', label: 'Humidity (%)', key: 'humidity' },
        { id: 'pressureChart', label: 'Pressure (hPa)', key: 'pressure' },
        { id: 'coChart', label: 'CO (ppm)', key: 'co' },
        { id: 'aqiChart', label: 'AQI', key: 'aqi' }
      ];

      chartConfigs.forEach(config => {
        const ctx = document.getElementById(config.id).getContext('2d');
        this.charts[config.id] = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['1h', '2h', '3h', '4h', '5h'],
            datasets: [
              {
                label: config.label,
                data: [0, 0, 0, 0, 0],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                fill: true
              }
            ]
          },
          options: {
            responsive: true,
            scales: { y: { beginAtZero: false } }
          }
        });
      });
    },
    updateCharts() {
      const dataSource = this.mode === 'indoor' ? this.indoorData : this.outdoorData;
      const chartConfigs = [
        { id: 'tempChart', key: 'temperature' },
        { id: 'humidityChart', key: 'humidity' },
        { id: 'pressureChart', key: 'pressure' },
        { id: 'coChart', key: 'co' },
        { id: 'aqiChart', key: 'aqi' }
      ];

      chartConfigs.forEach(config => {
        const value = parseFloat(dataSource[config.key]) || 0;
        this.charts[config.id].data.datasets[0].data = [value, value - 1, value, value + 1, value];
        this.charts[config.id].update();
      });
    },
    checkAuth() {
      if (!localStorage.getItem('token') && !['/login.html', '/register.html', '/reset.html'].includes(window.location.pathname)) {
        window.location.href = '/login.html';
      }
    }
  }));
});