const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Muestra el error en la consola del servidor

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Ocurrió un error interno en el servidor';

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message
    });
};

module.exports = errorMiddleware;
