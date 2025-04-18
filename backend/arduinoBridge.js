const SerialPort = require('serialport');
const axios = require('axios');
require('dotenv').config();

const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 }); // Adjust port name
const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000/api/sensors';

port.on('open', () => {
  console.log('Serial port open');
});

port.on('data', async (data) => {
  try {
    const message = data.toString().trim();
    if (message.startsWith('{')) {
      const sensorData = JSON.parse(message);
      console.log('Received:', sensorData);

      // Send to backend
      await axios.post(backendUrl, sensorData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Data sent to backend');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
});

port.on('error', (err) => {
  console.error('Serial port error:', err);
});