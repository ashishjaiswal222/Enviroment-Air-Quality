const pool = require('../config/db');

   const Settings = {
     async upsert(userId, { temperatureThreshold, coThreshold }) {
       const query = `
         INSERT INTO user_settings (user_id, temperature_threshold, co_threshold)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id)
         DO UPDATE SET
           temperature_threshold = EXCLUDED.temperature_threshold,
           co_threshold = EXCLUDED.co_threshold
         RETURNING *`;
       const values = [userId, temperatureThreshold, coThreshold];
       const { rows } = await pool.query(query, values);
       return rows[0];
     },

     async getByUserId(userId) {
       const query = 'SELECT * FROM user_settings WHERE user_id = $1';
       const { rows } = await pool.query(query, [userId]);
       return rows[0];
     }
   };

   module.exports = Settings;