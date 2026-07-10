# Definição da imagem base utilizando o Node.js na versão 20
FROM node:20-alpine

# Criação e definição do diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Cópia dos arquivos de dependência (package.json e package-lock.json)
COPY package*.json ./

# Instalação das dependências do projeto
RUN npm install

# Cópia do restante do código-fonte para o diretório de trabalho
COPY . .

# Exposição da porta 3000 para comunicação externa
EXPOSE 3000

# Definição do comando de inicialização do servidor
CMD ["node", "src/server.js"]