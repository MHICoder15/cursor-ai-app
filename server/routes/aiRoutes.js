const express = require('express');
const { generateResponse } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, generateResponse);

module.exports = router;