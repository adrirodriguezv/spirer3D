require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/loginRoutes');
const productosRoutes = require('./routes/productosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const carritoRoutes = require('./routes/carritoRoutes');

const authenticateToken = require('./middlewares/authMiddleware.js');
// Rutas protegidas para el carrito


const app = express();
const port = 3000;

const path = require('path');

// Servir imágenes estáticas desde la carpeta 'uploads/imgs'
app.use('/imgs', express.static(path.join(__dirname, 'uploads', 'imgs')));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', loginRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/carrito', authenticateToken, carritoRoutes);

app.listen(port, () => console.log(`✅ Servidor corriendo en http://localhost:${port}`));
