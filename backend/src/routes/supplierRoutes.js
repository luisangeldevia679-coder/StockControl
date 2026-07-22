const express = require('express');
const { getAllSuppliers, createSupplier } = require('../controllers/supplierController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllSuppliers);
router.post('/', verificarToken, createSupplier);

module.exports = router;
