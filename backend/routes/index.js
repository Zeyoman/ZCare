// ZCare/backend/routes/index.js
const express    = require('express');
const authRoutes = require('./auth');
const usersRoutes = require('./users');

const router = express.Router();

router.use('/auth',  authRoutes);
router.use('/users', usersRoutes);

module.exports = router;