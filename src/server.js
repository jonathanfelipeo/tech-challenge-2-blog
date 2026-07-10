const express = require('express');
// Importação das rotas de postagens
const postRoutes = require('./routes/postRoutes'); 

const app = express();

// Configuração de middleware para interpretação de requisições no formato JSON
app.use(express.json());

// Direcionamento de todas as requisições que iniciam com "/posts" para postRoutes
app.use('/posts', postRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});