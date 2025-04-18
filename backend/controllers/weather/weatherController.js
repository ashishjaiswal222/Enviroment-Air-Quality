const axios = require('axios');

   const weatherController = {
     async getWeather(req, res, next) {
       try {
         const { city } = req.query;
         if (!city) {
           const error = new Error('City is required');
           error.status = 400;
           throw error;
         }

         const apiKey = process.env.OPENWEATHER_API_KEY;
         const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
         const response = await axios.get(url);
         const data = response.data;

         res.status(200).json({
           temperature: `${data.main.temp}°C`,
           humidity: `${data.main.humidity}%`,
           pressure: `${data.main.pressure} hPa`,
           aqi: 'N/A', // OpenWeatherMap doesn't provide AQI; placeholder
           rain: data.rain ? `${data.rain['1h'] || 0} mm` : '0 mm'
         });
       } catch (err) {
         next(err);
       }
     }
   };

   module.exports = weatherController;