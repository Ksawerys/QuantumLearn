const { response } = require('express')
const { generarJWT } = require('../helpers/generate_jwt')
const bcrypt = require('bcrypt');
const UserConnection = require('../database/UserConnection');
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

    const user = await conx.getUser(email);
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

module.exports = { getRoles, getUsers, login, register};