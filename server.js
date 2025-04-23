require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS com seu domínio
app.use(cors({
  origin: 'https://lime-wildcat-293255.hostingersite.com',
  methods: ['POST', 'GET'],
  credentials: true
}));

app.use(express.json());

// Rota de login atualizada
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: 'Preencha todos os campos' });
  }

  try {
    const userResult = await db.query(
      'SELECT id, password FROM users WHERE email = $1', 
      [email.toLowerCase().trim()]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const user = userResult.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.json({ 
      message: 'Login realizado com sucesso!',
      userId: user.id
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Rota de verificação
app.get('/check', (req, res) => {
  res.json({ status: 'Online', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando: https://backend-login-production-79a1.up.railway.app`);
});