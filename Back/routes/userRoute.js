const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { body, validationResult } = require('express-validator');
const autentucateService = require('../services/autentucateService');


router.route('/upload/:id')
  .post(authController.updateProfileImage);

router.route('/file/:photoId')
  .get(authController.getProfileImage);

router.route('/register')
  .post(authController.register);
  body('username').isLength({ min: 5 }).withMessage('El nombre de usuario debe tener al menos 5 caracteres'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

router.route('/login')
  .post(authController.login);

router.route('/roles')
  .get(authController.getRoles);

router.route('/users')
  .get(authController.getUsers);

router.route('/:id')
  .put(authController.updateUser)
  .get(authController.getUser);

router.route('/reset-password')
  .post(authController.sendVerificationCode
  );

router.post('/:userId/response', userController.insertUserResponseAndUpdateCount);

router.post('/google', autentucateService.googleSignin);


module.exports = router;