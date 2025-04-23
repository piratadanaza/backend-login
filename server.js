require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importa a configuração do banco de dados

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Verifica se os campos de email e senha foram preenchidos
  if (!email || !password) {
    return res.status(400).json({ error: 'Campos obrigatórios' });
  }

  try {
    // Insere o usuário no banco de dados
    await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password]);
    res.status(201).json({ message: 'Usuário salvo com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar no banco:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
