const { generarJWT } = require('../helpers/generate_jwt')
const bcrypt = require('bcrypt');
const UserConnection = require('../database/userConnection');
const { authorize, uploadFile, getFile, deleteFile } = require('../services/driveService');
const { evaluateImage } = require('../services/openaiService');
let conx = new UserConnection();
const { sendCode } = require('../services/mailerService');

const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  const result = await sendCode(email);
  if (result.status === 'success') {
      res.status(200).send({ message: result.message, code: result.code });
  } else {
      res.status(500).send(result.message);
  }
}

const register = async (req, res) => {
  try {
    const { email, name, second_name, password, photo_id, extension, roles } = req.body;
    const user = await conx.insertUser({ email, name, second_name, password, photo_id, extension }, roles);
    const token = await generarJWT(user.id, user.name);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ 'msg': 'Error creating user', error });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await conx.getUserLogin(email);
    if (!user) {
      return res.status(404).json({ 'msg': 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 'msg': 'Invalid credentials' });
    }
    const token = await generarJWT(user.id, user.name);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ 'msg': 'Error retrieving user', error });
  }
}

const getRoles = async (req, res) => {
  try {
    const roles = await conx.getRoles();
    res.status(200).json({ roles });
  } catch (error) {
    res.status(500).json({ 'msg': 'Error retrieving roles', error });
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await conx.getUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ 'msg': 'Error retrieving users', error });
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await conx.getUser(id);

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'msg': 'Error retrieving user', error });
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, second_name, password, roles } = req.body;

    const updatedUser = await conx.updateUser(id, { email, name, second_name, password, photo_id, extension }, roles);

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'msg': 'Error updating user', error });
  }
}

const updateProfileImage = async (req, res, next) => {
  try {
    const file = req.files.file;
    const userId = req.params.id;

    let isImageValid;
    try {
      isImageValid = await evaluateImage(req);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    if (!isImageValid) {
      return res.status(400).json({ error: 'Invalid image' });
    }

    const currentImageUrl = await getUserImageUrl(userId);
    if (currentImageUrl) {
      await deleteFile(currentImageUrl);
    }

    const fileId = await uploadFile(file.tempFilePath, file.name, file.mimetype);

    const updatedUser = await saveImage(userId, fileId);

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
}


const getProfileImage = async (req, res, next) => {
  try {
    const photoId = req.params.photoId;
    const fileStream = await getFile(photoId);

    fileStream.pipe(res);
  } catch (error) {
    console.error(error);
    next(error);
  }
}



module.exports = { getRoles, getUsers, login, register, updateUser, getUser, updateProfileImage, getProfileImage, sendVerificationCode};