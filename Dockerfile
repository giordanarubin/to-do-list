# Usa a versão do Node que o projeto utiliza
FROM node:22.14.0

# Cria e define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia todos os arquivos para o workdir (imagem)
COPY . .

# apaga os node modules da imagem
RUN rm -rf node_modules

# Instala as dependências necessárias
RUN npm install

# Informa a porta que o contêiner vai liberar (a mesma q tem no index.js)
EXPOSE 3000

# Comando para iniciar o seu servidor Node.js
CMD ["npm", "start"]
