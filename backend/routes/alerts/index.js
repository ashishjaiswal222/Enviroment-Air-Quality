const express = require('express');
   const router = express.Router();
   const settingsController = require('../../controllers/settings/settingsController');
   const authMiddleware = require('../../middleware/authMiddleware');

   router.get('/', authMiddleware, settingsController.getSettings);
   router.post('/', authMiddleware, settingsController.updateSettings);

   module.exports = router;