const { response } = require('express')
const { generarJWT } = require('../helpers/generate_jwt')
const bcrypt = require('bcrypt');
const UserConnection = require('../database/UserConnection');
const { authorize, uploadFile, getFile } = require('../database/driveConnection');
let conx = new UserConnection();

const register = async (req, res) => {
  try {
    const { email, name, second_name, password, url_photo, extension, roles } = req.body;
    const user = await conx.insertUser({ email, name, second_name, password, url_photo, extension }, roles);
    const token = await generarJWT(user.id, user.name);

    res.status(200).json({token });
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
    res.status(200).json({token });
  } catch (error) {
    console.error(error); 
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

    const updatedUser = await conx.updateUser(id, { email, name, second_name, password, url_photo, extension }, roles);

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
    const fileId = await uploadFile(file.tempFilePath, file.name, file.mimetype);
    console.log('fileId:', fileId);

    const updatedUser = await saveImage(userId, fileId);
    console.log('updatedUser:', updatedUser);

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



module.exports = { getRoles, getUsers, login, register, updateUser, getUser,updateProfileImage, getProfileImage};