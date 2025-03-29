// backend/routes/carritoRoutes.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

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

// Ruta para agregar productos al carrito
router.post('/', async (req, res) => {
  const { productoId, cantidad } = req.body;
  const userId = req.user.id; // Obtener el ID del usuario autenticado

  // Verificar si ya existe un carrito activo
  let carrito = await pool.query('SELECT * FROM carritos WHERE user_id = $1 AND estado = $2', [userId, 'activo']);
  
  if (carrito.rows.length === 0) {
    carrito = await pool.query('INSERT INTO carritos (user_id) VALUES ($1) RETURNING id', [userId]);
  }

  const carritoId = carrito.rows[0].id;

  // Agregar producto al carrito
  await pool.query('INSERT INTO carrito_productos (carrito_id, producto_id, cantidad) VALUES ($1, $2, $3)', [carritoId, productoId, cantidad]);

  res.status(200).json({ message: 'Producto agregado al carrito' });
});

// Ruta para obtener los productos del carrito
router.get('/', async (req, res) => {
  const userId = req.user.id;
  const carrito = await pool.query('SELECT * FROM carritos WHERE user_id = $1 AND estado = $2', [userId, 'activo']);

  if (carrito.rows.length === 0) {
    return res.status(404).json({ message: 'No tienes un carrito activo' });
  }

  const carritoId = carrito.rows[0].id;

  const productos = await pool.query(`
    SELECT p.id, p.nombre, p.precio, cp.cantidad
    FROM carrito_productos cp
    JOIN productos p ON cp.producto_id = p.id
    WHERE cp.carrito_id = $1
  `, [carritoId]);

  res.status(200).json({ productos: productos.rows });
});

// Ruta para eliminar un producto del carrito
router.delete('/:productoId', async (req, res) => {
  const { productoId } = req.params;
  const userId = req.user.id;

  const carrito = await pool.query('SELECT * FROM carritos WHERE user_id = $1 AND estado = $2', [userId, 'activo']);

  if (carrito.rows.length === 0) {
    return res.status(404).json({ message: 'No tienes un carrito activo' });
  }

  const carritoId = carrito.rows[0].id;
  await pool.query('DELETE FROM carrito_productos WHERE carrito_id = $1 AND producto_id = $2', [carritoId, productoId]);

  res.status(200).json({ message: 'Producto eliminado del carrito' });
});

// Ruta para vaciar el carrito
router.delete('/', async (req, res) => {
  const userId = req.user.id;

  const carrito = await pool.query('SELECT * FROM carritos WHERE user_id = $1 AND estado = $2', [userId, 'activo']);

  if (carrito.rows.length === 0) {
    return res.status(404).json({ message: 'No tienes un carrito activo' });
  }

  const carritoId = carrito.rows[0].id;
  await pool.query('DELETE FROM carrito_productos WHERE carrito_id = $1', [carritoId]);

  res.status(200).json({ message: 'Carrito vacío' });
});

module.exports = router;
