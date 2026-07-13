Tech Challenge: API de Plataforma Educacional
Este repositório contém a entrega do Tech Challenge, focado na refatoração e modernização do Back-end de uma plataforma de postagens educacionais. O objetivo principal foi substituir uma arquitetura antiga por uma API REST robusta, construída do zero, focada na escalabilidade, persistência confiável de dados e boas práticas de engenharia de software.

Arquitetura do Sistema
O sistema foi desenhado para ser leve, direto e totalmente independente do ambiente da máquina do desenvolvedor. A arquitetura é sustentada pelos seguintes pilares:

Node.js & Express: O Node.js executa a lógica de negócios no servidor, enquanto o framework Express organiza de forma limpa os roteamentos e gerencia as requisições (operações CRUD) enviadas pelos clientes.

PostgreSQL: O banco de dados relacional escolhido para armazenar as postagens. Ele garante integridade, estrutura e fácil recuperação de informações através de identificadores únicos.

Docker: Toda a aplicação (API) e o banco de dados estão empacotados em contêineres orquestrados pelo docker-compose. Isso significa que o sistema roda em uma rede virtual isolada, garantindo consistência total entre o ambiente de desenvolvimento e uma eventual implantação em produção.

GitHub Actions (CI/CD): Um pipeline de integração contínua vigia este repositório. A cada novo envio de código, um ambiente virtual é instanciado para rodar a suíte de testes automatizados, garantindo a cobertura mínima de código e prevenindo a quebra de funcionalidades em produção.

Guia de Uso da Aplicação
Para rodar este projeto localmente, não é necessária a instalação manual de bancos de dados, apenas possuir o Node.js e o Docker em execução na máquina.

Passo a Passo de Inicialização:

1. Clone este repositório e abra o terminal na pasta raiz do projeto.

2. Instale as dependências da aplicação:

Bash
npm install

3. Suba a infraestrutura completa (Servidor e Banco de Dados) orquestrada pelo Docker:

Bash
docker compose up --build -d

A API estará operacional e aguardando conexões na porta 3000.

Principais Endpoints Disponíveis:

POST /posts: Cria uma nova postagem.

GET /posts: Retorna a lista com todas as postagens publicadas.

GET /posts/search?term=palavra: Filtra e busca postagens que contenham a palavra-chave no título ou no conteúdo.

GET /posts/:id: Busca os detalhes de uma postagem específica através de seu ID único.

PUT /posts/:id: Atualiza as informações (título, conteúdo ou autor) de uma postagem existente.

DELETE /posts/:id: Remove permanentemente uma postagem do banco de dados.

Relato de Experiências e Desafios
O desenvolvimento deste projeto representou um divisor de águas e um marco prático fundamental nesta etapa da pós-graduação. Vindo de uma bagagem tecnológica focada na agilidade do desenvolvimento low-code, trabalhando com arquiteturas visuais como o OutSystems, o desafio foi justamente o desapego dessas automações para mergulhar nos fundamentos estruturais da engenharia de software tradicional.

Compreender com exatidão como os pools de conexão são gerenciados, como tratar erros 500 para não vazar dados sensíveis, e como as persistências realmente ocorrem no nível do PostgreSQL trouxe uma clareza que plataformas de alto nível frequentemente mascaram.

Outro desafio considerável esteve ligado à infraestrutura e integração. Orquestrar a aplicação no Docker exigiu entender como volumes persistentes funcionam na prática. Além disso, a configuração do pipeline de CI/CD esbarrou em conflitos de histórico no controle de versão, o que forçou o aprofundamento em resoluções de conflitos e estratégias de mesclagem (merge vs rebase).

Superar esses obstáculos manuais não apenas consolidou a entrega rigorosa e 100% funcional exigida no Tech Challenge, mas também forjou uma compreensão realista, robusta e muito mais crítica do desenvolvimento fullstack.