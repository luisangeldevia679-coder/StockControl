const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip;

    console.log(`[${timestamp}] ${method} desde la IP ${ip} hacia la ruta: ${url}`);
    
    next(); // Permite que la petición continúe
};

module.exports = loggerMiddleware;
