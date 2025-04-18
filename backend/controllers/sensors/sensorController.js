const Sensor = require('../../models/sensorModel');

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
         res.status(201).json(data);
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
           temperature: `${data.temperature}°C`,
           humidity: `${data.humidity}%`,
           pressure: `${data.pressure} hPa`,
           co: `${data.co} ppm`,
           aqi: `${data.aqi}`
         });
       } catch (err) {
         next(err);
       }
     }
   };

   module.exports = sensorController;