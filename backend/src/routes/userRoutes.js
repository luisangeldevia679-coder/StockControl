const express = require('express');
const userController = require('../controllers/userController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', verificarToken, userController.getUserProfile);
router.get('/', verificarToken, userController.getUsers);

module.exports = router;
