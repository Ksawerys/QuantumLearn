const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.get('/login', authController.login);
router.get('/roles', authController.getRoles);
router.get('/users', authController.getUsers);

module.exports = router;