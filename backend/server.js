require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configurar multer para manejar archivos
const upload = multer({ dest: 'uploads/' });

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
app.post('/send-email', upload.single('file'), async (req, res) => {
  const { objectName, dimensions, material, color, comments } = req.body;
  const file = req.file;

  try {
    const mailOptions = {
      from: 'noreply@s3dr.com',
      to: 'adri@gmail.com', // Cambia esto por tu email
      subject: `Nuevo Pedido - ${objectName}`,
      text: `
        📦 **Nuevo Pedido de Impresión 3D**
        
        📌 **Nombre del objeto:** ${objectName}
        📏 **Dimensiones:** ${dimensions}
        🛠 **Material:** ${material}
        🎨 **Color:** ${color}
        📝 **Comentarios:** ${comments}
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

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
