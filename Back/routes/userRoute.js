const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/upload/:id', authController.updateProfileImage);
router.get('/file/:photoId', authController.getProfileImage);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/roles', authController.getRoles);
router.get('/users', authController.getUsers);
router.put('/users/:id', authController.updateUser);
router.get('/:id', authController.getUser);

module.exports = router;