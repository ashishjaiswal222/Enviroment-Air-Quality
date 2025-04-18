const pool = require('../config/db');

   const Sensor = {
     async create(data) {
       const { temperature, humidity, pressure, co, aqi } = data;
       const query = `
         INSERT INTO sensor_data (temperature, humidity, pressure, co, aqi, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         RETURNING *`;
       const values = [temperature, humidity, pressure, co, aqi];
       const { rows } = await pool.query(query, values);
       return rows[0];
     },

     async getLatest() {
       const query = 'SELECT * FROM sensor_data ORDER BY created_at DESC LIMIT 1';
       const { rows } = await pool.query(query);
       return rows[0];
     }
   };

   module.exports = Sensor;