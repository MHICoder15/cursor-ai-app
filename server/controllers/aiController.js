const Query = require('../models/Query');
const User = require('../models/User');
const axios = require('axios');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Generate AI response
// @route   POST /api/generate
// @access  Private
exports.generateResponse = async (req, res, next) => {
  const { prompt } = req.body;

  if (!prompt) {
    return next(new ErrorResponse('Please provide a prompt', 400));
  }

  try {
    // In a real implementation, you would call Cursor AI API here
    // For this example, we'll simulate a response
    // const response = await axios.post('https://api.cursor.ai/generate', {
    //   prompt,
    //   apiKey: process.env.CURSOR_API_KEY
    // });

    // Simulated response from Cursor AI
    const simulatedResponse = `This is a simulated response to your query: "${prompt}". In a real implementation, this would be the response from Cursor AI.`;

    // Save query to database
    const query = await Query.create({
      user: req.user.id,
      prompt,
      response: simulatedResponse,
    });

    res.status(200).json({
      success: true,
      data: {
        prompt: query.prompt,
        response: query.response,
        createdAt: query.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};