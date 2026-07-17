const validationMiddleware = (req, res, next) => {
    const { name, price, stock } = req.body;

    // Validación básica para la creación de un producto
    if (!name || name.trim() === '') {
        return res.status(400).json({ success: false, message: 'El nombre del producto es obligatorio.' });
    }

    if (price === undefined || price <= 0) {
        return res.status(400).json({ success: false, message: 'El precio debe ser un número mayor a 0.' });
    }

    if (stock === undefined || stock < 0) {
        return res.status(400).json({ success: false, message: 'El stock no puede ser negativo.' });
    }

    next(); // Si todo está bien, continúa al controlador
};

module.exports = validationMiddleware;
