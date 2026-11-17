const express = require('express');
const router = express.Router();
const { getActivityLogs } = require('../controllers/activitylog.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);

router.get('/', getActivityLogs);

module.exports = router;