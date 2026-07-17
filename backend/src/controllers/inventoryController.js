// Base de datos temporal en memoria para el historial de movimientos
let tempInventoryLog = [];

// Necesitamos importar la base temporal de productos para poder alterar su stock
const { tempProductsDb } = require('./productController');

/**
 * @desc    Registrar un movimiento de inventario (Entrada o Salida)
 * @route   POST /api/inventory/transaction
 */
const handleTransaction = (req, res, next) => {
    try {
        const { productId, type, quantity, reason } = req.body;

        // 1. Validaciones básicas
        if (!productId || !type || !quantity) {
            return res.status(400).json({ success: false, message: 'Faltan campos obligatorios (productId, type, quantity).' });
        }

        if (type !== 'IN' && type !== 'OUT') {
            return res.status(400).json({ success: false, message: 'El tipo de movimiento debe ser IN (Entrada) o OUT (Salida).' });
        }

        // 2. Buscar si el producto existe
        const product = tempProductsDb.find(p => p.id === Number(productId));
        if (!product) {
            return res.status(404).json({ success: false, message: `El producto con ID ${productId} no existe.` });
        }

        // 3. Procesar la operación matemática del Stock
        const qty = Number(quantity);
        if (type === 'IN') {
            product.stock += qty; // Suma al stock actual
        } else if (type === 'OUT') {
            if (product.stock < qty) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Stock insuficiente. Intenta retirar ${qty} unidades pero solo quedan ${product.stock}.` 
                });
            }
            product.stock -= qty; // Resta al stock actual
        }

        // 4. Registrar la transacción en el historial
        const transactionRecord = {
            id: tempInventoryLog.length + 1,
            productId: product.id,
            productName: product.name,
            type,
            quantity: qty,
            reason: reason || (type === 'IN' ? 'Abastecimiento de stock' : 'Despacho de mercancía'),
            date: new Date()
        };

        tempInventoryLog.push(transactionRecord);

        res.status(200).json({
            success: true,
            message: `Movimiento de ${type === 'IN' ? 'entrada' : 'salida'} registrado con éxito.`,
            updatedProductStock: product.stock,
            transaction: transactionRecord
        });

    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Obtener el historial completo de movimientos de inventario
 * @route   GET /api/inventory/log
 */
const getInventoryLog = (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            count: tempInventoryLog.length,
            data: tempInventoryLog
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleTransaction,
    getInventoryLog
};


const express = require('express');
const router = express.Router();
const { handleTransaction, getInventoryLog } = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');

// Registrar entrada o salida
router.post('/transaction', authMiddleware, handleTransaction);

// Consultar el historial de movimientos
router.get('/log', authMiddleware, getInventoryLog);

module.exports = router;
