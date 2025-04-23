const { Pool } = require('pg');
require('dotenv').config();

// Cria a conexão com o banco de dados PostgreSQL usando a variável DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Habilita SSL (necessário no Railway)
  }
});

module.exports = pool;
