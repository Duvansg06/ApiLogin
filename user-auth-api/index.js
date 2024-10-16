const express = require('express');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Middleware para mejorar la seguridad
app.use(helmet());

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
