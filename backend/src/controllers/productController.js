// controllers/productController.js

// Nota: Cuando conectemos la base de datos, aquí importarás tu modelo:
// const Product = require('../models/Product');

// Simulación de una base de datos temporal en memoria para que puedas probarlo ya
let tempProductsDb = [
    { id: 1, name: "Laptop Core i7", price: 850, stock: 15, supplierId: 101 },
    { id: 2, name: "Monitor 24 Pulgadas", price: 180, stock: 30, supplierId: 102 }
];

/**
 * @desc    Obtener todos los productos
 * @route   GET /api/products
 */
const getAllProducts = (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            count: tempProductsDb.length,
            data: tempProductsDb
        });
    } catch (error) {
        next(error); // Envía el fallo a tu errorMiddleware.js automaticamente
    }
};

/**
 * @desc    Crear un nuevo producto
 * @route   POST /api/products
 */
const createProduct = (req, res, next) => {
    try {
        const { name, price, stock, supplierId } = req.body;

        const newProduct = {
            id: tempProductsDb.length + 1,
            name,
            price: Number(price),
            stock: Number(stock),
            supplierId: supplierId || null,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : null // Si usaste el uploadMiddleware
        };

        tempProductsDb.push(newProduct);

        res.status(201).json({
            success: true,
            message: "Producto registrado correctamente en el sistema",
            data: newProduct
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Obtener un solo producto por su ID
 * @route   GET /api/products/:id
 */
const getProductById = (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        const product = tempProductsDb.find(p => p.id === productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: `No se encontró ningún producto con el ID ${productId}`
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    getProductById
};
