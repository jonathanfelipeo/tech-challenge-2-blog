const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Rota para criação
router.post('/', postController.createPost);

// Rota para listagem geral
router.get('/', postController.getAllPosts);

// Rota para busca
router.get('/search', postController.searchPosts);

// Rota para leitura de postagem específica (o símbolo ":" indica que é um parâmetro dinâmico)
router.get('/:id', postController.getPostById);

// Rota para edição
router.put('/:id', postController.updatePost);

// Rota para exclusão
router.delete('/:id', postController.deletePost);

module.exports = router;