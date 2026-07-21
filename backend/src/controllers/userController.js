// userController.js - Controlador para la gestión de usuarios y autenticación
const User = require('../models/userModel'); // Importar el modelo de usuario
const jwt = require('jsonwebtoken');         // Para manejar tokens de acceso

// Generar un Token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const userController = {
    // 1. Registrar un nuevo usuario (Admin, Vendedor, Gestor de stock)
    registerUser: async (req, res) => {
        const { name, email, password, role } = req.body;
        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            const user = await User.create({ name, email, password, role });
            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id)
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor al registrar' });
        }
    },

    // 2. Iniciar sesión (Autenticación)
    loginUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (user && (await user.matchPassword(password))) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id)
                });
            } else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor al iniciar sesión' });
        }
    },

    // 3. Obtener el perfil del usuario actual (Ruta protegida)
    getUserProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user._id).select('-password');
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el perfil' });
        }
    },

    // 4. Obtener todos los usuarios (Solo accesible por Administradores)
    getUsers: async (req, res) => {
        try {
            const users = await User.find({}).select('-password');
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }
    }
};

module.exports = userController;

