const jwt = require('jsonwebtoken');

// Middleware para verificar JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
