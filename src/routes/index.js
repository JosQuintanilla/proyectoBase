const express = require('express');
const router = express.Router();
/** Health check */
router.use('/health', require('./healthCheck/health-route'));
/** User */
router.use('/user', require('./user/user-route'));

module.exports = router;