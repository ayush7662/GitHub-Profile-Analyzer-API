const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',

  // IMPORTANT FOR RAILWAY
  port: process.env.DB_PORT || 3306,

  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'github_analyzer',

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

const initializeDatabase = async () => {
  try {
    const connection = await promisePool.getConnection();

    console.log('Database connected successfully');

    connection.release();

  } catch (error) {

    console.error('Database connection failed:', error.message);

    process.exit(1);
  }
};

module.exports = {
  promisePool,
  initializeDatabase
};