const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/enviroment');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Token inválido o expirado.' });
  }
};

module.exports = { verificarToken };
