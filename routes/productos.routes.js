// Controlador para manejar las rutas relacionadas con los productos
const express = require('express');
const router = express.Router();

const productos = require('../controllers/productos.controller');

// Definir los endpoints de productos
router.get('/', productos.listarProductos);
router.get('/:id', productos.obtenerProducto);
router.post('/', productos.crearProducto);
router.put('/:id', productos.actualizarProducto);
router.delete('/:id', productos.eliminarProducto);

module.exports = router;
