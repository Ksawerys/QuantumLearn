const openaiController = require('../services/openai');
const express = require('express');
const router = express.Router();

router.post('/generate-text', openaiController.generateText);
router.post('/evaluate-image',  openaiController.evaluateImage)

module.exports = router;