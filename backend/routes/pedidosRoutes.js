const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
});

// 🔹 Crear un nuevo pedido
router.post('/', async (req, res) => {
  const { usuario_id, total, productos } = req.body;
  try {
    const result = await pool.query('INSERT INTO pedidos (usuario_id, total) VALUES ($1, $2) RETURNING id', [usuario_id, total]);
    const pedido_id = result.rows[0].id;

    for (const producto of productos) {
      await pool.query('INSERT INTO pedido_detalle (pedido_id, producto_id, cantidad) VALUES ($1, $2, $3)', [pedido_id, producto.id, producto.cantidad]);
    }

    res.status(201).json({ message: 'Pedido realizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pedido' });
  }
});

module.exports = router;
