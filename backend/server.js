
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { probarConexion } = require('./config/database');
const rutasProductos = require('./routes/productos.routes');

const app = express();
const PORT = Number(process.env.PORT || 3000);

// Configurar las solicitudes del frontend
app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200']
}));
app.use(express.json());

// Ruta de comprobación del servidor
app.get('/api/estado', (req, res) => {
  res.json({
    mensaje: 'API VentaNova Digital funcionando'
  });
});

// Registrar las rutas de productos
app.use('/api/productos', rutasProductos);

// Iniciar el servidor después de comprobar MySQL
async function iniciarServidor() {
  try {
    await probarConexion();

    app.listen(PORT, () => {
      console.log(`API VentaNova Digital disponible en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No fue posible conectar con MySQL:', error.message);
    process.exit(1);
  }
}

iniciarServidor();
