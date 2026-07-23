const express = require('express');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', verificarToken, createCategory);
router.put('/:id', verificarToken, updateCategory);
router.delete('/:id', verificarToken, deleteCategory);

module.exports = router;
