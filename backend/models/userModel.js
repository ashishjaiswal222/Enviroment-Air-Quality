const pool = require('../config/db');
   const bcrypt = require('bcryptjs');

   const User = {
     async create({ email, password }) {
       const hashedPassword = await bcrypt.hash(password, 10);
       const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email';
       const values = [email, hashedPassword];
       const { rows } = await pool.query(query, values);
       return rows[0];
     },

     async findByEmail(email) {
       const query = 'SELECT * FROM users WHERE email = $1';
       const { rows } = await pool.query(query, [email]);
       return rows[0];
     }
   };

   module.exports = User;