const express = require("express");
const router = express.Router();
const { User } = require('../models');

// Cadastro de novo usuário
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Comparação simples, sem criptografia
    if (user.password !== password) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Sucesso — retornamos os dados do usuário e um token fictício
    res.status(200).json({
      message: 'Login bem-sucedido!',
      usuario: user,
      token: 'fake-token'
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
  }
});

module.exports = router;
