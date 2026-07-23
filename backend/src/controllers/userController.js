const authService = require('../service/authService');

const registerUser = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    return res.status(201).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await authService.getUserProfile(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await authService.getAllUsers();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getUserProfile, getUsers };
