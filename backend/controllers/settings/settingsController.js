const Settings = require('../../models/settingsModel');

   const settingsController = {
     async updateSettings(req, res, next) {
       try {
         const userId = req.user.id; // From authMiddleware
         const { temperatureThreshold, coThreshold } = req.body;
         if (!temperatureThreshold || !coThreshold) {
           const error = new Error('Temperature and CO thresholds are required');
           error.status = 400;
           throw error;
         }

         const settings = await Settings.upsert(userId, { temperatureThreshold, coThreshold });
         res.status(200).json(settings);
       } catch (err) {
         next(err);
       }
     },

     async getSettings(req, res, next) {
       try {
         const userId = req.user.id;
         const settings = await Settings.getByUserId(userId);
         if (!settings) {
           const error = new Error('Settings not found');
           error.status = 404;
           throw error;
         }
         res.status(200).json(settings);
       } catch (err) {
         next(err);
       }
     }
   };

   module.exports = settingsController;