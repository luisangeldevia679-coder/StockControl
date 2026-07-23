const categoryService = require('../service/categoryService');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAll();
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    }
    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createNew(req.body);
    return res.status(201).json({ success: true, message: 'Categoría creada correctamente', data: category });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateExisting(req.params.id, req.body);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    }
    return res.status(200).json({ success: true, message: 'Categoría actualizada correctamente', data: category });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const deleted = await categoryService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    }
    return res.status(200).json({ success: true, message: 'Categoría eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};