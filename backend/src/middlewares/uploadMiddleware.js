const multer = require('multer');
const path = require('path');

// 1. Configuración de almacenamiento: dónde se guarda y con qué nombre
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Los archivos se guardarán en una carpeta llamada 'uploads' en la raíz del backend
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        // Renombra el archivo para evitar duplicados: ejemplo_imagen-1718293821.jpg
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

// 2. Filtro de seguridad: bloquear formatos peligrosos o no deseados
const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png|webp/;
    const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedExtensions.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        return cb(new Error('Formato de archivo no válido. Solo se permiten imágenes (jpeg, jpg, png, webp).'));
    }
};

// 3. Inicialización de Multer con límites de tamaño (ej. 5MB máximo)
const uploadMiddleware = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 Megabytes
    fileFilter: fileFilter
});

module.exports = uploadMiddleware;
