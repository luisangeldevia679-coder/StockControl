const express = require('express');
const { getAllProducts, createProduct, getProductById } = require('../controllers/productController');
const { verificarToken } = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', verificarToken, uploadMiddleware.single('image'), createProduct);

module.exports = router;
