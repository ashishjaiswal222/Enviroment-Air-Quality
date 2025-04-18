const WebSocket = require('ws');
const Sensor = require('../models/sensorModel');
const Alert = require('../models/alertModel');
const axios = require('axios');

class WebSocketService {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Set();
    this.init();
    this.startDataBroadcast();
  }

  init() {
    this.wss.on('connection', (ws) => {
      console.log('New WebSocket client connected');
      this.clients.add(ws);

      ws.on('close', () => {
        console.log('WebSocket client disconnected');
        this.clients.delete(ws);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    });
  }

  async startDataBroadcast() {
    setInterval(async () => {
      try {
        // Fetch latest sensor data
        const sensorData = await Sensor.getLatest() || {
          temperature: 25.5,
          humidity: 60,
          pressure: 1012,
          co: 0.4,
          aqi: 45
        };

        // Fetch weather data
        const apiKey = process.env.OPENWEATHER_API_KEY;
        if (!apiKey) throw new Error('OPENWEATHER_API_KEY missing');
        const weatherResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`
        );
        const weatherData = {
          temperature: `${weatherResponse.data.main.temp}°C`,
          humidity: `${weatherResponse.data.main.humidity}%`,
          pressure: `${weatherResponse.data.main.pressure} hPa`,
          aqi: 'N/A',
          rain: weatherResponse.data.rain ? `${weatherResponse.data.rain['1h'] || 0} mm` : '0 mm'
        };

        // Fetch recent alerts
        const alerts = await Alert.getRecent();

        // Broadcast to all clients
        const payload = {
          type: 'DATA_UPDATE',
          data: {
            indoor: sensorData,
            outdoor: weatherData,
            alerts
          }
        };
        this.broadcast(payload);
      } catch (error) {
        console.error('Error broadcasting data:', error.message);
      }
    }, 10000);
  }

  broadcast(data) {
    const message = JSON.stringify(data);
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

module.exports = WebSocketService;