const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const router = express.Router();
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_lGzgm7Dyb1Ft@ep-tiny-night-a5ir36nh-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  ssl: false,
});

// Conexión a la base de datos
pool.connect()
  .then(() => {
    console.log('✅ Conexión a la base de datos exitosa');
  })
  .catch((error) => {
    console.error('❌ Error al conectar a la base de datos:', error);
  });

// 🔹 Crear un nuevo pedido
router.post('/crear-pedido', async (req, res) => {
  const { usuarioId, productoId, metodoPago } = req.body;

  if (!usuarioId || !productoId || !metodoPago) {
    return res.status(400).json({
      success: false,
      mensaje: 'Faltan parámetros obligatorios',
    });
  }

  try {
    // SQL para insertar un nuevo pedido
    const query = `
      INSERT INTO pedidos (usuario_id, producto_id, metodo_pago)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [usuarioId, productoId, metodoPago];

    // Ejecutar la consulta de inserción
    const result = await pool.query(query, values);

    // El pedido insertado se encuentra en result.rows[0]
    return res.status(201).json({
      success: true,
      mensaje: 'Pedido creado con éxito',
      pedido: result.rows[0], // Aquí devolvemos el pedido recién insertado
    });
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    return res.status(500).json({
      success: false,
      mensaje: 'Error al crear el pedido',
    });
  }
});

module.exports = router;
