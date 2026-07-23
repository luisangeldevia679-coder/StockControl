const express = require('express');
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verificarToken, getAllProducts);
router.get('/:id', verificarToken, getProductById);
router.post('/', verificarToken, createProduct);
router.put('/:id', verificarToken, updateProduct);
router.delete('/:id', verificarToken, deleteProduct);

module.exports = router;
