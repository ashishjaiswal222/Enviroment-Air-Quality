const Alert = require('../../models/alertModel');

exports.getAlerts = async (req, res, next) => {
  try {
    const alerts = await Alert.getRecent();
    res.status(200).json(alerts);
  } catch (err) {
    next(err);
  }
};