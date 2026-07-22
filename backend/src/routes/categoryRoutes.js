const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Importamos tu nuevo middleware básico
const { verificarToken } = require('../middlewares/authMiddleware');

// RUTAS PÚBLICAS (Cualquiera las puede ver)
router.get('/', categoryController.getAllCategories);

// RUTAS PROTEGIDAS (Solo pasan si envían el token correcto en los headers)
router.post('/', verificarToken, categoryController.createCategory);
router.put('/:id', verificarToken, categoryController.updateCategory);
router.delete('/:id', verificarToken, categoryController.deleteCategory);

module.exports = router;

