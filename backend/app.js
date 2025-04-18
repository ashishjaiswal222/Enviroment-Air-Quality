const express = require('express');
   const cors = require('cors');
   const path = require('path');
   const errorHandler = require('./middleware/errorHandler');
   const authRoutes = require('./routes/auth');
   const weatherRoutes = require('./routes/weather');
   const sensorRoutes = require('./routes/sensors');
   const alertRoutes = require('./routes/alerts');

   const app = express();

   // Middleware
   app.use(cors());
   app.use(express.json());
   app.use(express.urlencoded({ extended: false }));

   // Serve static files from frontend/build
   app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

   // Routes
   app.use('/api/auth', authRoutes);
   app.use('/api/weather', weatherRoutes);
   app.use('/api/sensors', sensorRoutes);
   app.use('/api/alerts', alertRoutes);
   app.get('/api/health', (req, res) => {
     res.status(200).json({ message: 'Server is running' });
   });

   // Catch-all route for frontend
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
   });

   // Error handling middleware
   app.use(errorHandler);

   module.exports = app;