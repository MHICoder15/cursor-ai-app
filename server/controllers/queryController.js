const Query = require('../models/Query');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all queries for a user
// @route   GET /api/queries
// @access  Private
exports.getQueries = asyncHandler(async (req, res, next) => {
  const queries = await Query.find({ user: req.user.id }).sort('-createdAt');
  
  res.status(200).json({
    success: true,
    count: queries.length,
    data: queries,
  });
});

// @desc    Get single query
// @route   GET /api/queries/:id
// @access  Private
exports.getQuery = asyncHandler(async (req, res, next) => {
  const query = await Query.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!query) {
    return next(
      new ErrorResponse(`Query not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: query,
  });
});

// @desc    Delete query
// @route   DELETE /api/queries/:id
// @access  Private
exports.deleteQuery = asyncHandler(async (req, res, next) => {
  const query = await Query.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!query) {
    return next(
      new ErrorResponse(`Query not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});