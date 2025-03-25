const express = require('express');
const {
  getQueries,
  getQuery,
  deleteQuery,
} = require('../controllers/queryController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getQueries);
router.route('/:id').get(protect, getQuery).delete(protect, deleteQuery);

module.exports = router;