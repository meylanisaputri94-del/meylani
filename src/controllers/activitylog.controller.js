module.exports = { getActivityLogs };
const ActivityLog = require('../models/activityLog');

const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ user_id: req.user.id }).sort({ created_at: -1 });
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getActivityLogs };
