const openaiController = require('../services/openaiService');
const express = require('express');
const router = express.Router();

router.route('/generate-text')
    .post(openaiController.generateText);

router.route('/evaluate-image')
    .post(openaiController.evaluateImage);

module.exports = router;