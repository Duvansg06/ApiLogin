const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Modelo de usuario
const User = {
  // Crear un nuevo usuario
  create: (userData, callback) => {
    bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
      if (err) return callback(err);

      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(query, [userData.username, userData.email, hashedPassword], callback);
    });
  },

  // Buscar un usuario por correo electrónico
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
};

module.exports = User;
