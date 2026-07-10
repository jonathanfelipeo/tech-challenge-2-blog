const request = require('supertest');
const express = require('express');
const postRoutes = require('../routes/postRoutes');
const db = require('../config/db');

// Simulação (mock) do arquivo de conexão com o banco de dados
jest.mock('../config/db');

// Inicialização de uma instância isolada do Express exclusiva para os testes
const app = express();
app.use(express.json());
app.use('/posts', postRoutes);

describe('Testes Unitários - CRUD de Postagens', () => {
  
  // Limpeza do histórico de simulações após cada teste para evitar interferências
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar uma nova postagem com sucesso', async () => {
    // Configuração do retorno simulado do banco de dados (Simulação do INSERT)
    const mockPost = { 
      id: 'uuid-123', 
      title: 'Teste Criação', 
      content: 'Conteúdo mockado', 
      author: 'Prof. Teste' 
    };
    db.query.mockResolvedValue({ rows: [mockPost] });

    // Execução da requisição HTTP simulada
    const response = await request(app)
      .post('/posts')
      .send({ title: 'Teste Criação', content: 'Conteúdo mockado', author: 'Prof. Teste' });

    // Validações (Expectativas) de status e conteúdo retornado
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Teste Criação');
  });

  it('Deve atualizar uma postagem existente', async () => {
    // Configuração do retorno simulado (Simulação do UPDATE)
    const mockPost = { 
      id: 'uuid-123', 
      title: 'Título Editado', 
      content: 'Conteúdo alterado', 
      author: 'Prof. Teste' 
    };
    db.query.mockResolvedValue({ rows: [mockPost] });

    // Execução da requisição HTTP simulada
    const response = await request(app)
      .put('/posts/uuid-123')
      .send({ title: 'Título Editado', content: 'Conteúdo alterado', author: 'Prof. Teste' });

    // Validações
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Título Editado');
  });

  it('Deve excluir uma postagem existente', async () => {
    // Configuração do retorno simulado (Simulação do DELETE)
    db.query.mockResolvedValue({ rows: [{ id: 'uuid-123' }] });

    // Execução da requisição HTTP simulada
    const response = await request(app).delete('/posts/uuid-123');

    // Validações
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Postagem excluída com sucesso.');
  });
});