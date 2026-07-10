// Importação da conexão direta com o banco
const db = require('../config/db');

// Função para criação de uma nova postagem
const createPost = async (req, res) => {
  try {
    // Extração dos dados enviados no corpo da requisição
    const { title, content, author } = req.body;

    // Validação básica: retorno de erro 400 (Bad Request) em caso de ausência de dados
    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Título, conteúdo e autor são obrigatórios.' });
    }

    // Escrita da instrução SQL 
    // Utilização de parâmetros ($1, $2, $3) para prevenção contra ataques de SQL Injection
    const query = `
      INSERT INTO posts (title, content, author) 
      VALUES ($1, $2, $3) 
      RETURNING *; 
    `;
    
    // Definição dos valores para substituição dos parâmetros $1, $2 e $3
    const values = [title, content, author];

    // Execução da consulta no banco de dados
    const result = await db.query(query, values);

    // Retorno do status 201 (Created) e dos dados da postagem recém-criada
    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error('Erro ao criar postagem:', error);
    res.status(500).json({ error: 'Erro interno no servidor ao criar a postagem.' });
  }
};

// Função para listagem de todas as postagens
const getAllPosts = async (req, res) => {
  try {
    // Escrita da instrução SQL para busca de todos os registros
    const query = 'SELECT * FROM posts ORDER BY created_at DESC;';
    
    // Execução da consulta
    const result = await db.query(query);

    // Retorno do array de postagens (status 200 é o padrão, então apenas enviamos o JSON)
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar postagens:', error);
    res.status(500).json({ error: 'Erro interno no servidor ao buscar as postagens.' });
  }
};

// Função para leitura de uma postagem específica pelo ID
const getPostById = async (req, res) => {
  try {
    // Extração do ID passado como parâmetro na URL
    const { id } = req.params;

    // Escrita da instrução SQL com filtro de ID
    const query = 'SELECT * FROM posts WHERE id = $1;';
    const values = [id];

    // Execução da consulta
    const result = await db.query(query, values);

    // Validação: verificação se o banco encontrou alguma postagem com este ID
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Postagem não encontrada.' });
    }

    // Retorno do único registro encontrado
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar postagem por ID:', error);
    res.status(500).json({ error: 'Erro interno no servidor ao buscar a postagem.' });
  }
};

// Função para atualização de uma postagem existente
const updatePost = async (req, res) => {
  try {
    // Extração do ID dos parâmetros da URL
    const { id } = req.params;
    // Extração dos novos dados enviados no corpo da requisição
    const { title, content, author } = req.body;

    // Validação de dados: retorno de erro caso falte alguma informação
    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Título, conteúdo e autor são obrigatórios para a edição.' });
    }

    // Escrita da instrução SQL para atualização
    // O RETURNING * garante que o banco devolva os dados já atualizados
    const query = `
      UPDATE posts 
      SET title = $1, content = $2, author = $3 
      WHERE id = $4 
      RETURNING *;
    `;
    const values = [title, content, author, id];

    // Execução da consulta
    const result = await db.query(query, values);

    // Validação: se nenhum registro foi alterado, o ID não existe
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Postagem não encontrada para edição.' });
    }

    // Retorno da postagem atualizada
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar postagem:', error);
    res.status(500).json({ error: 'Erro interno no servidor ao atualizar a postagem.' });
  }
};

// Função para exclusão de uma postagem
const deletePost = async (req, res) => {
  try {
    // Extração do ID dos parâmetros da URL
    const { id } = req.params;

    // Escrita da instrução SQL para deleção
    const query = 'DELETE FROM posts WHERE id = $1 RETURNING *;';
    const values = [id];

    // Execução da consulta
    const result = await db.query(query, values);

    // Validação: verificação se a postagem existia antes da exclusão
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Postagem não encontrada para exclusão.' });
    }

    // Retorno de mensagem de sucesso (status 200)
    res.json({ message: 'Postagem excluída com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir postagem:', error);
    res.status(500).json({ error: 'Erro interno no servidor ao excluir a postagem.' });
  }
};

// Função para busca de postagens por palavras-chave
const searchPosts = async (req, res) => {
  try {
    // Extração do termo de busca da query string (ex: na URL ?term=literatura)
    const { term } = req.query;

    // Validação: retorno de erro caso o termo não seja fornecido
    if (!term) {
      return res.status(400).json({ error: 'O termo de busca é obrigatório.' });
    }

    // Escrita da instrução SQL utilizando ILIKE para busca parcial e case-insensitive
    // O operador % indica que o termo pode estar no meio de outras palavras
    const query = `
      SELECT * FROM posts 
      WHERE title ILIKE $1 OR content ILIKE $1 
      ORDER BY created_at DESC;
    `;
    const values = [`%${term}%`];

    // Execução da consulta
    const result = await db.query(query, values);

    // Retorno das postagens encontradas (pode ser um array vazio caso nada seja achado)
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar postagens:', error);
    res.status(500).json({ error: 'Erro interno no servidor ao realizar a busca.' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts
};