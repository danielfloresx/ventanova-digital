
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configura el acceso a MySQL mediante variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Comprueba que MySQL acepte la conexión
async function probarConexion() {
  const connection = await pool.getConnection();

  try {
    await connection.ping();
    console.log('Conexión con MySQL establecida correctamente');
  } finally {
    connection.release();
  }
}

module.exports = { pool, probarConexion };
