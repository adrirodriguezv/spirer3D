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
      // Verificar el usuario
      const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
  
      if (result.rows.length === 0) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }
  
      const usuario = result.rows[0];
  
      // Verificar la contraseña encriptada
      const passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
  
      // Generar el token JWT
      const token = jwt.sign(
        { id: usuario.id, tipo_usuario: usuario.tipo_usuario },
        process.env.JWT_SECRET, // Usa la variable de entorno para la clave secreta
        { expiresIn: '1h' }
      );
  
      res.json({ token, tipo_usuario: usuario.tipo_usuario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
  
  // Middleware para verificar el token JWT
  const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token no válido' });
      }
      req.user = user;  // Agregar usuario a la solicitud
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


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


