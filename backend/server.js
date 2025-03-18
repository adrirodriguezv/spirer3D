require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // Importa el módulo 'path'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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
    const result = await client.query('SELECT * FROM products');
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
    const result = await client.query('INSERT INTO products (nombre, descripcion, imagen) VALUES ($1, $2, $3)', [nombre, descripcion, imagen]);
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


