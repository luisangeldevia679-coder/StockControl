const express = require('express');
const { handleTransaction, getInventoryLog } = require('../controllers/inventoryController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/transaction', verificarToken, handleTransaction);
router.get('/log', verificarToken, getInventoryLog);

module.exports = router;
