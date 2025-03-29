require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // Importa el módulo 'path'
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Configurar el middleware para servir imágenes
app.use('/images', express.static(path.join(__dirname, 'uploads', 'imgs')));

// Configurar transporte de Nodemailer (Usando Gmail como ejemplo)
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "561d87fdf7681f", // Tu correo
    pass: "fbc7c82bcb845b", // Contraseña o App Password
  },
});

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_lGzgm7Dyb1Ft@ep-tiny-night-a5ir36nh-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => console.log("✅ Conectado a la base de datos"))
  .catch(err => console.error("❌ Error de conexión a la base de datos:", err));

  app.post('/api/login', async (req, res) => {
    const { correo, contraseña } = req.body;
    try {
      // Verificar si el correo y la contraseña son correctos (con bcrypt, por ejemplo)
      const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
      if (result.rows.length === 0) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }
  
      const usuario = result.rows[0];
  
      // Verificar la contraseña (por ejemplo, con bcrypt)
      const contraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
      if (!contraseñaCorrecta) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
  
      // Generar el token
      const token = jwt.sign({ id: usuario.id, tipo_usuario: usuario.tipo_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Enviar el token y tipo_usuario en la respuesta
      res.json({ token, tipo_usuario: usuario.tipo_usuario });
    } catch (error) {
      console.error('Error al hacer login:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
  

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(403).send('Token no proporcionado');
  }

  jwt.verify(token, 'CristianoRonaldo27', (err, user) => {
    if (err) {
      return res.status(403).send('Token no válido');
    }
    req.user = user;
    next();
  });
};



// Proteger rutas usando el middleware
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Acceso concedido', user: req.user });
});


//Logout
app.post('/api/logout', (req, res) => {
  // Aquí no necesitas hacer nada en el backend si estás usando JWT
  res.json({ message: 'Has cerrado sesión correctamente' });
});



// Ruta para enviar el correo
app.post('/send-email', multer({ dest: 'uploads/' }).single('file'), async (req, res) => {
  const { objectName, altura, anchura, profundidad, material, color, comments } = req.body;
  const file = req.file;

  try {
    const mailOptions = {
      from: 'noreply@s3dr.com',
      to: 'adriR@gmail.com', // Cambia esto por tu email
      subject: `Nuevo Pedido - ${objectName}`,
      text: `
        📦 Nuevo Pedido de Spirer 3D
        
        📌 **Nombre del objeto: ${objectName}
        📏 **Altura: ${altura}
        📏 **Anchura: ${anchura}
        📏 **Profundidad: ${profundidad}
        🛠 **Material: ${material}
        🎨 **Color: ${color}
        📝 **Comentarios: ${comments}
      `,
      attachments: file
        ? [
          {
            filename: file.originalname,
            path: file.path,
          },
        ]
        : [],
    };

    await transporter.sendMail(mailOptions);

    if (file) fs.unlinkSync(file.path); // Eliminar archivo después del envío

    res.json({ message: 'Pedido enviado con éxito 📩' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el pedido' });
  }
});

// Utiliza la cadena de conexión para conectarte a la base de datos
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_lGzgm7Dyb1Ft@ep-tiny-night-a5ir36nh-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
});

// Conectar a la base de datos
client.connect()
  .then(() => {
    console.log('Conectado a NeonDB');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos', err.stack);
  });

// Crear una ruta para obtener los productos
app.get('/productos', async (req, res) => {
  try {
    // Consulta SQL para obtener los productos
    const result = await client.query('SELECT * FROM productos');
    res.json(result.rows);  // Enviar los productos como respuesta
  } catch (err) {
    console.error('Error al obtener los productos', err.stack);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

app.get('/productos/:id', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM productos WHERE id = $1', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(result.rows[0]); // Devuelve el primer producto encontrado
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Añadir productos
app.post('/productos', async (req, res) => {
  const { nombre, descripcion, imagen } = req.body;
  // Aquí deberías guardar estos datos en tu base de datos
  try {
    const result = await client.query('INSERT INTO productos (nombre, descripcion, imagen) VALUES ($1, $2, $3)', [nombre, descripcion, imagen]);
    res.status(201).json({ message: 'Producto añadido exitosamente' });
  } catch (error) {
    console.error('Error al añadir producto:', error);
    res.status(500).json({ message: 'Error al añadir producto' });
  }
});





// Ruta para obtener el carrito del usuario
app.get('/api/carrito', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    // Obtener el carrito del usuario
    const carritoResult = await pool.query(
      `SELECT * FROM carritos WHERE usuario_id = $1 ORDER BY fecha_creacion DESC LIMIT 1`,
      [userId]
    );
    
    if (carritoResult.rows.length === 0) {
      return res.json({ productos: [] }); // Si no hay carrito, devolver vacío
    }

    const carritoId = carritoResult.rows[0].id;

    // Obtener los productos en el carrito
    const productosResult = await pool.query(
      `SELECT p.id, p.nombre, p.descripcion, p.imagen, pc.cantidad
       FROM productos_carrito pc
       JOIN productos p ON pc.producto_id = p.id
       WHERE pc.carrito_id = $1`,
      [carritoId]
    );

    res.json({ productos: productosResult.rows });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
});


/// Ruta para agregar productos al carrito
app.post('/api/carrito', authenticateToken, async (req, res) => {
  const { productoId, cantidad } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Obtener el id del usuario desde el token (suponiendo que tienes autenticación JWT)
  const usuarioId = req.user.id; // Esto debe ser configurado en tu middleware de autenticación

  try {
    // Verificar si el usuario ya tiene un carrito
    const carritoResult = await pool.query('SELECT * FROM carritos WHERE usuario_id = $1', [usuarioId]);

    if (carritoResult.rows.length === 0) {
      // Si no existe un carrito, crearlo
      const newCarritoResult = await pool.query(
        'INSERT INTO carritos (usuario_id) VALUES ($1) RETURNING id',
        [usuarioId]
      );
      const carritoId = newCarritoResult.rows[0].id;

      // Agregar el producto al carrito recién creado
      await pool.query(
        'INSERT INTO productos_carrito (carrito_id, producto_id, cantidad) VALUES ($1, $2, $3)',
        [carritoId, productoId, cantidad]
      );
    } else {
      // Si el carrito ya existe, buscar si el producto ya está en el carrito
      const productoExistenteResult = await pool.query(
        'SELECT * FROM productos_carrito WHERE carrito_id = $1 AND producto_id = $2',
        [carritoResult.rows[0].id, productoId]
      );

      if (productoExistenteResult.rows.length > 0) {
        // Si el producto ya está en el carrito, solo actualiza la cantidad
        await pool.query(
          'UPDATE productos_carrito SET cantidad = cantidad + $1 WHERE carrito_id = $2 AND producto_id = $3',
          [cantidad, carritoResult.rows[0].id, productoId]
        );
      } else {
        // Si el producto no está en el carrito, agregarlo
        await pool.query(
          'INSERT INTO productos_carrito (carrito_id, producto_id, cantidad) VALUES ($1, $2, $3)',
          [carritoResult.rows[0].id, productoId, cantidad]
        );
      }
    }

    res.status(200).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ message: 'Error al agregar el producto al carrito' });
  }
});

// Ruta para eliminar un producto del carrito
app.delete('/api/carrito/:productoId', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const productoId = req.params.productoId;

  try {
    // Obtener el carrito del usuario
    const carritoResult = await pool.query(
      `SELECT * FROM carritos WHERE usuario_id = $1 ORDER BY fecha_creacion DESC LIMIT 1`,
      [userId]
    );

    if (carritoResult.rows.length === 0) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const carritoId = carritoResult.rows[0].id;

    // Eliminar el producto del carrito
    await pool.query(
      `DELETE FROM productos_carrito WHERE carrito_id = $1 AND producto_id = $2`,
      [carritoId, productoId]
    );

    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
  }
});

// Ruta para vaciar el carrito del usuario
app.delete('/api/carrito', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // Obtener el carrito del usuario
    const carritoResult = await pool.query(
      `SELECT * FROM carritos WHERE usuario_id = $1 ORDER BY fecha_creacion DESC LIMIT 1`,
      [userId]
    );

    if (carritoResult.rows.length === 0) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const carritoId = carritoResult.rows[0].id;

    // Eliminar todos los productos del carrito
    await pool.query(
      `DELETE FROM productos_carrito WHERE carrito_id = $1`,
      [carritoId]
    );

    res.status(200).json({ message: 'Carrito vacío' });
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    res.status(500).json({ message: 'Error al vaciar el carrito' });
  }
});




// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


