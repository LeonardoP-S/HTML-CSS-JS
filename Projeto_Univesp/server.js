//server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use('/paginas', express.static('paginas'));

const cors = require('cors');
app.use(cors());

const { sequelize } = require('./models');

app.use(bodyParser.json());

// Importa as rotas
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

// Testar conexão com banco e inicia o servidor
sequelize.authenticate()
   .then(() => {
    console.log('📦 Conexão com o banco de dados foi bem-sucedida!');
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
   })
   .catch(err => {
     console.error('❌ Não foi possível conectar ao banco:', err);
   });

   const db = require('./models');

db.sequelize.sync({ alter: true }) // alter evita perda de dados
  .then(() => {
    console.log('📁 Tabelas sincronizadas com o banco de dados');
  })
  .catch((err) => {
    console.error('❌ Erro ao sincronizar tabelas:', err);
  });
