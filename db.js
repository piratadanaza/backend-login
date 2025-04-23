const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Teste de conexão
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('❌ Erro na conexão com PostgreSQL:', err);
  } else {
    console.log('✅ Conectado ao PostgreSQL');
  }
});

module.exports = pool;