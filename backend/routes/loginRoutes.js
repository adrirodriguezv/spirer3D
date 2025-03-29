// backend/routes/loginRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const router = express.Router();

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_lGzgm7Dyb1Ft@ep-tiny-night-a5ir36nh-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  ssl: false,
});

// Ruta para el login
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Consulta para verificar si el usuario existe en la base de datos
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // Verificar la contraseña usando bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { userId: user.id, userType: user.tipo_usuario }, // Datos que queremos en el token
      'CristianoRonaldo27',  // Asegúrate de tener una clave secreta en .env
      { expiresIn: '1h' }     // Expiración del token (1 hora en este caso)
    );

    // Enviar el token como respuesta
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      tipo_usuario: user.tipo_usuario,
    });
  } catch (error) {
    console.error('Error en la ruta de login:', error);
    res.status(500).json({ error: 'Hubo un error en el servidor' });
  }
});

module.exports = router;
