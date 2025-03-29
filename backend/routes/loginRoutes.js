const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const router = express.Router();
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_lGzgm7Dyb1Ft@ep-tiny-night-a5ir36nh-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  ssl: false,
});

pool.connect()
  .then(() => {
    console.log('✅ Conexión a la base de datos exitosa');
  })
  .catch((error) => {
    console.error('❌ Error al conectar a la base de datos:', error);
  });

// Ruta para autenticar a un usuario
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Realizar la consulta para obtener el usuario desde la base de datos
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const usuario = result.rows[0]; // El usuario encontrado es el primer registro

    // Comparar la contraseña
    const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: usuario.id, userType: usuario.tipo_usuario }, 'miClaveSecretaSuperFuerteYSegura123!@#', { expiresIn: '1h' });

    // Enviar el token y tipo de usuario
    res.json({ token, userType: usuario.tipo_usuario });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
