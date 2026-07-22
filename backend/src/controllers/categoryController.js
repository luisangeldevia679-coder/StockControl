// Nuestra base de datos temporal (un arreglo básico)
const categoriasDB = [
    { id: 1, name: "Tecnologia", description: "Telefonos y laptops" },
    { id: 2, name: "Ropa", description: "Pantalones y camisas" }
];

// Buscar todas
const findAll = () => {
    return categoriasDB;
};

// Buscar una por ID
const findById = (id) => {
    // Convertimos el id a número con Number() para asegurar la comparación
    return categoriasDB.find(cat => cat.id === Number(id));
};

// Guardar una nueva
const create = (data) => {
    const nuevaCategoria = {
        id: categoriasDB.length + 1, // Autoincrementar el ID de forma fácil
        name: data.name,
        description: data.description
    };
    categoriasDB.push(nuevaCategoria);
    return nuevaCategoria;
};

// Modificar una existente
const update = (id, data) => {
    const categoria = findById(id);
    if (categoria) {
        categoria.name = data.name || categoria.name;
        categoria.description = data.description || categoria.description;
    }
    return categoria;
};

// Borrar una
const deleteById = (id) => {
    const indice = categoriasDB.findIndex(cat => cat.id === Number(id));
    if (indice !== -1) {
        // Borramos el elemento del arreglo
        categoriasDB.splice(indice, 1);
        return true;
    }
    return false;
};

const categoryService = require('../services/categoryService.js');

// Obtener todas las categorías
const getAllCategories = (req, res) => {
    const lista = categoryService.getAll();
    res.json(lista);
};

// Obtener una sola categoría por su ID
const getCategoryById = (req, res) => {
    const id = req.params.id;
    const categoria = categoryService.getById(id);

    if (!categoria) {
        return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }
    res.json(categoria);
};

// Crear una categoría
const createCategory = (req, res) => {
    const nueva = categoryService.createNew(req.body);
    res.status(201).json({ mensaje: "Creada con éxito", data: nueva });
};

// Actualizar una categoría
const updateCategory = (req, res) => {
    const id = req.params.id;
    const actualizada = categoryService.updateExisting(id, req.body);

    if (!actualizada) {
        return res.status(404).json({ mensaje: "No se pudo actualizar" });
    }
    res.json({ mensaje: "Actualizada con éxito", data: actualizada });
};

// Eliminar una categoría
const deleteCategory = (req, res) => {
    const id = req.params.id;
    const exito = categoryService.remove(id);

    if (!exito) {
        return res.status(404).json({ mensaje: "No se encontró para eliminar" });
    }
    res.json({ mensaje: "Eliminada con éxito" });
};

module.exports = {
    deleteCategory,
    getAllCategories,
    createCategory,
    updateCategory
};