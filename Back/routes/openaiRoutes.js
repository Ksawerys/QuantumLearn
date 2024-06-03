const openaiController = require('../services/openaiService');
const express = require('express');
const router = express.Router();

router.route('/generate-text')
    .post(openaiController.generateText);

router.route('/evaluate-image')
    .post(openaiController.evaluateImage);

router.route('/create-training-file')
    .post(openaiController.createTrainingModel);

module.exports = router;