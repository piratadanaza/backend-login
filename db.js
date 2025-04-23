const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Teste de conexão com o banco
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('Erro na conexão com o PostgreSQL:', err);
  } else {
    console.log('Conexão com PostgreSQL estabelecida');
  }
});

module.exports = pool;