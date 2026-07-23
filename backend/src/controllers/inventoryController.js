const inventoryService = require('../service/inventoryService');

const handleTransaction = async (req, res, next) => {
  try {
    const movement = await inventoryService.createMovement(req.body);
    return res.status(201).json({ success: true, message: 'Movimiento registrado correctamente', data: movement });
  } catch (error) {
    next(error);
  }
};

const getInventoryLog = async (req, res, next) => {
  try {
    const movements = await inventoryService.getMovements();
    return res.status(200).json({ success: true, count: movements.length, data: movements });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleTransaction, getInventoryLog };
