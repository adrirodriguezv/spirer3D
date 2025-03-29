const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

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

// 🔹 Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

// 🔹 Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM productos WHERE id = $1', [req.params.id]);
      if (result.rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
  
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });
  

// 🔹 Agregar un nuevo producto
router.post('/', async (req, res) => {
  const { nombre, descripcion, imagen } = req.body;
  try {
    await pool.query('INSERT INTO productos (nombre, descripcion, imagen) VALUES ($1, $2, $3)', [nombre, descripcion, imagen]);
    res.status(201).json({ message: 'Producto añadido exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir producto' });
  }
});

module.exports = router;
