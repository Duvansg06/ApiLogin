const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Registro de usuario
exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Validar campos requeridos
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Crear un nuevo usuario
  User.create({ username, email, password }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error en el registro' });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  });
};

// Login de usuario
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Buscar el usuario por email
  User.findByEmail(email, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Comparar contraseñas
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }

      // Crear y firmar un token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    });
  });
};
