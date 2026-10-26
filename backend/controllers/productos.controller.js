// Controlador para manejar las operaciones relacionadas con los productos
const { pool } = require('../config/database');

// Consultar todos los productos
async function listarProductos(req, res) {
  try {
    const [productos] = await pool.query(`
      SELECT
        id,
        nombre,
        descripcion,
        precio,
        categoria,
        icono,
        imagen,
        destacado,
        creado_en,
        actualizado_en
      FROM productos
      ORDER BY id ASC
    `);

    res.json(productos);
  } catch (error) {
    console.error('Error al listar productos:', error);
    res.status(500).json({ mensaje: 'Error al consultar los productos' });
  }
}

// Consultar un producto por su identificador
async function obtenerProducto(req, res) {
  try {
    const [productos] = await pool.execute(
      'SELECT * FROM productos WHERE id = ?',
      [req.params.id]
    );

    if (productos.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(productos[0]);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ mensaje: 'Error al consultar el producto' });
  }
}

// Crear un producto nuevo
async function crearProducto(req, res) {
  try {
    const {
      nombre,
      descripcion,
      precio,
      categoria,
      icono = '📦',
      imagen = null,
      destacado = false
    } = req.body;

    if (
      typeof nombre !== 'string' || !nombre.trim() ||
      typeof descripcion !== 'string' || !descripcion.trim() ||
      precio === undefined || precio === null ||
      !Number.isFinite(Number(precio)) || Number(precio) < 0 ||
      typeof categoria !== 'string' || !categoria.trim()
    ) {
      return res.status(400).json({
        mensaje: 'Nombre, descripción, precio válido y categoría son obligatorios'
      });
    }

    const [resultado] = await pool.execute(
      `INSERT INTO productos
        (nombre, descripcion, precio, categoria, icono, imagen, destacado)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre.trim(),
        descripcion.trim(),
        Number(precio),
        categoria.trim(),
        icono,
        imagen,
        Boolean(destacado)
      ]
    );

    const [nuevoProducto] = await pool.execute(
      'SELECT * FROM productos WHERE id = ?',
      [resultado.insertId]
    );

    res.status(201).json(nuevoProducto[0]);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ mensaje: 'Error al crear el producto' });
  }
}

// Modificar un producto existente
async function actualizarProducto(req, res) {
  try {
    const { id } = req.params;
    const {
      nombre,
      descripcion,
      precio,
      categoria,
      icono,
      imagen,
      destacado
    } = req.body;

    const [existentes] = await pool.execute(
      'SELECT id FROM productos WHERE id = ?',
      [id]
    );

    if (existentes.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    if (
      nombre !== undefined && (typeof nombre !== 'string' || !nombre.trim()) ||
      descripcion !== undefined && (typeof descripcion !== 'string' || !descripcion.trim()) ||
      precio !== undefined && (!Number.isFinite(Number(precio)) || Number(precio) < 0) ||
      categoria !== undefined && (typeof categoria !== 'string' || !categoria.trim())
    ) {
      return res.status(400).json({ mensaje: 'Los datos enviados no son válidos' });
    }

    const campos = [];
    const valores = [];

    if (nombre !== undefined) {
      campos.push('nombre = ?');
      valores.push(nombre.trim());
    }

    if (descripcion !== undefined) {
      campos.push('descripcion = ?');
      valores.push(descripcion.trim());
    }

    if (precio !== undefined) {
      campos.push('precio = ?');
      valores.push(Number(precio));
    }

    if (categoria !== undefined) {
      campos.push('categoria = ?');
      valores.push(categoria.trim());
    }

    if (icono !== undefined) {
      campos.push('icono = ?');
      valores.push(icono);
    }

    if (imagen !== undefined) {
      campos.push('imagen = ?');
      valores.push(imagen);
    }

    if (destacado !== undefined) {
      campos.push('destacado = ?');
      valores.push(Boolean(destacado));
    }

    if (campos.length === 0) {
      return res.status(400).json({
        mensaje: 'No se enviaron campos para actualizar'
      });
    }

    valores.push(id);

    await pool.execute(
      `UPDATE productos SET ${campos.join(', ')} WHERE id = ?`,
      valores
    );

    const [actualizados] = await pool.execute(
      'SELECT * FROM productos WHERE id = ?',
      [id]
    );

    res.json(actualizados[0]);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el producto' });
  }
}

// Eliminar un producto
async function eliminarProducto(req, res) {
  try {
    const [resultado] = await pool.execute(
      'DELETE FROM productos WHERE id = ?',
      [req.params.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto' });
  }
}

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
