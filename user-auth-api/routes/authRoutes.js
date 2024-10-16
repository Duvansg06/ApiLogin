const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);

// Ruta protegida (ejemplo)
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: `Bienvenido, usuario con email: ${req.user.email}` });
});

module.exports = router;
