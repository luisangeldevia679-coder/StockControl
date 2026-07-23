const supplierService = require('../service/supplierService');

const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await supplierService.getAll();
    return res.status(200).json({ success: true, count: suppliers.length, data: suppliers });
  } catch (error) {
    next(error);
  }
};

const getSupplier = async (req, res, next) => {
  try {
    const supplier = await supplierService.getById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
    }
    return res.status(200).json({ success: true, data: supplier });
  } catch (error) {
    next(error);
  }
};

const createSupplier = async (req, res, next) => {
  try {
    const supplier = await supplierService.createNew(req.body);
    return res.status(201).json({ success: true, message: 'Proveedor creado correctamente', data: supplier });
  } catch (error) {
    next(error);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    const supplier = await supplierService.updateExisting(req.params.id, req.body);
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
    }
    return res.status(200).json({ success: true, message: 'Proveedor actualizado correctamente', data: supplier });
  } catch (error) {
    next(error);
  }
};

const deleteSupplier = async (req, res, next) => {
  try {
    const deleted = await supplierService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
    }
    return res.status(200).json({ success: true, message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllSuppliers, getSupplier, createSupplier, updateSupplier, deleteSupplier };
