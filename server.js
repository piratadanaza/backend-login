require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS ampliada
app.use(cors({
  origin: [
    'https://lime-wildcat-293255.hostingersite.com',
    'http://localhost:5500' // Para testes locais
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Middleware para log de requisições (útil para debug)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(express.json());

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('Backend operacional - Use /login ou /users');
});

// Rota de login
app.post('/login', async (req, res) => {
  console.log('Corpo da requisição:', req.body); // Debug
  
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email.trim(), password.trim()]
    );
    
    res.json({ message: 'Dados recebidos com sucesso!' });
  } catch (error) {
    console.error('Erro no banco:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para listar usuários
app.get('/users', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: error.message });
  }
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
  console.log(`CORS permitido para: https://lime-wildcat-293255.hostingersite.com`);
});