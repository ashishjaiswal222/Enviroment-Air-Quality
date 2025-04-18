const pool = require('../config/db');

   const Alert = {
     async create({ type, message, sensor_data_id }) {
       const query = `
         INSERT INTO alerts (type, message, sensor_data_id, created_at)
         VALUES ($1, $2, $3, NOW())
         RETURNING *`;
       const values = [type, message, sensor_data_id];
       const { rows } = await pool.query(query, values);
       return rows[0];
     },

     async getRecent() {
       const query = 'SELECT * FROM alerts ORDER BY created_at DESC LIMIT 10';
       const { rows } = await pool.query(query);
       return rows;
     }
   };

   module.exports = Alert;