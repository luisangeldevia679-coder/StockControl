const express = require('express');
const { getAllSuppliers, getSupplier, createSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplierController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllSuppliers);
router.get('/:id', verificarToken, getSupplier);
router.post('/', verificarToken, createSupplier);
router.put('/:id', verificarToken, updateSupplier);
router.delete('/:id', verificarToken, deleteSupplier);

module.exports = router;
