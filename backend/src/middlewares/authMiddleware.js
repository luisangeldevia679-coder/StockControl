// Simulamos una lista de tokens válidos para hacerlo simple sin librerías complejas
const TOKENS_VALIDOS = ["token123", "tokenAbc", "usuarioSecreto"];

const verificarToken = (req, res, next) => {
    // 1. Obtener el token que viene en las cabeceras (headers) de la petición
    const tokenCliente = req.headers['authorization'];

    // 2. Si el cliente no envió ningún token, bloqueamos el acceso
    if (!tokenCliente) {
        return res.status(401).json({ 
            mensaje: "Acceso denegado. No se proporcionó un token." 
        });
    }

    // 3. Verificar si el token enviado está en nuestra lista de permitidos
    if (TOKENS_VALIDOS.includes(tokenCliente)) {
        // El token es correcto, guardamos el usuario simulado en la petición
        req.usuario = { id: 1, nombre: "Usuario Autenticado" };
        
        // ¡Todo bien! Dejamos que la petición continúe al controlador
        return next();
    } else {
        // El token no sirve
        return res.status(403).json({ 
            mensaje: "Token inválido o expirado." 
        });
    }
};

module.exports = {
    verificarToken
};