const Supplier = require('../models/Supplier');

// Base de datos temporal en memoria para proveedores
let tempSuppliersDb = [
    { id: 101, name: "Carlos Mendoza", companyName: "Distribuidora Tech S.A.", email: "contacto@techsa.com", phone: "+123456789", isActive: true },
    { id: 102, name: "Ana Rodríguez", companyName: "Mundo Visual Corp", email: "ventas@mundovisual.com", phone: "+987654321", isActive: true }
];

/**
 * @desc    Obtener lista de todos los proveedores activos
 * @route   GET /api/suppliers
 */
const getAllSuppliers = (req, res, next) => {
    try {
        const activeSuppliers = tempSuppliersDb.filter(s => s.isActive);
        res.status(200).json({
            success: true,
            count: activeSuppliers.length,
            data: activeSuppliers
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Crear un nuevo proveedor en el sistema
 * @route   POST /api/suppliers
 */
const createSupplier = (req, res, next) => {
    try {
        const { name, companyName, email, phone } = req.body;

        // Validaciones básicas manuales (puedes usar tu validationMiddleware más adelante)
        if (!name || !companyName || !email) {
            return res.status(400).json({ 
                success: false, 
                message: 'El nombre, la empresa y el correo son campos obligatorios.' 
            });
        }

        const newSupplier = new Supplier({
            id: tempSuppliersDb.length + 101, // Para que empiece en el ID 103, 104...
            name,
            companyName,
            email,
            phone
        });

        tempSuppliersDb.push(newSupplier);

        res.status(201).json({
            success: true,
            message: 'Proveedor registrado exitosamente',
            data: newSupplier
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllSuppliers,
    createSupplier,
    tempSuppliersDb // Lo exportamos para que el controlador de productos pueda verificar si existe un proveedor
};
