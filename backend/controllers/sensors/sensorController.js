const Sensor = require('../../models/sensorModel');
const Alert = require('../../models/alertModel');
const Settings = require('../../models/settingsModel');
const EmailService = require('../../services/emailService');
const pool = require('../../config/db');

const sensorController = {
  async submitData(req, res, next) {
    try {
      const { temperature, humidity, pressure, co, aqi } = req.body;
      if (!temperature || !humidity || !pressure || !co || !aqi) {
        const error = new Error('All sensor data fields are required');
        error.status = 400;
        throw error;
      }

      const data = await Sensor.create({ temperature, humidity, pressure, co, aqi });

      // Get user settings and email
      const userId = req.user?.id || 1; // Fallback for testing
      const settings = await Settings.getByUserId(userId) || {
        temperatureThreshold: 35,
        coThreshold: 1
      };
      const userQuery = 'SELECT email FROM users WHERE id = $1';
      const userResult = await pool.query(userQuery, [userId]);
      const userEmail = userResult.rows[0]?.email;

      // Check for abnormal readings
      let alert = null;
      if (temperature > settings.temperatureThreshold) {
        alert = await Alert.create({
          type: 'HIGH_TEMPERATURE',
          message: `Temperature exceeded ${settings.temperatureThreshold}°C: ${temperature}°C`,
          sensor_data_id: data.id
        });
        if (userEmail) {
          await EmailService.sendAlertEmail(
            userEmail,
            'EnviroTrack Alert: High Temperature',
            `Temperature exceeded ${settings.temperatureThreshold}°C: ${temperature}°C at ${new Date().toLocaleString()}`
          );
        }
      } else if (co > settings.coThreshold) {
        alert = await Alert.create({
          type: 'HIGH_CO',
          message: `CO level exceeded ${settings.coThreshold} ppm: ${co} ppm`,
          sensor_data_id: data.id
        });
        if (userEmail) {
          await EmailService.sendAlertEmail(
            userEmail,
            'EnviroTrack Alert: High CO',
            `CO level exceeded ${settings.coThreshold} ppm: ${co} ppm at ${new Date().toLocaleString()}`
          );
        }
      }

      res.status(201).json({ data, alert });
    } catch (err) {
      next(err);
    }
  },

  async getData(req, res, next) {
    try {
      const data = await Sensor.getLatest();
      if (!data) {
        const error = new Error('No sensor data available');
        error.status = 404;
        throw error;
      }
      res.status(200).json({
        temperature: `${data.temperature}`,
        humidity: `${data.humidity}`,
        pressure: `${data.pressure}`,
        co: `${data.co}`,
        aqi: `${data.aqi}`
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = sensorController;