O OmniTalkHub é um mono-repositório que utiliza NPM workspaces para gerenciar os projetos. Cada projeto é um pacote NPM e pode ser publicado individualmente.

![Alt text](docs/image.png)


# Instalação

1. Clone o repositório.
2. Entre na pasta do projeto.
3. Execute `npm install` para instalar as dependências.
4. Copie .env.example para .env e configure as variáveis de ambiente.

# Docker Compose
1. Siga o procedimento de (instalação)[#instalação].
2. Atualize o arquivo .env com as variáveis de ambiente.

````
<!-- estamos elaborando -->
````
3. Executar

````
docker-compose up
````

# Utilizando o projeto
1. `DEVELOPMENT` - Executar `npm run dev`
2. `PRODUCTION` - Executar `npm run build` e `npm run start`

Se preferir rodar apenas a API ou a aplicação web separadamente, você pode utilizar os seguintes comandos:

1. `API` - Executar `npm run dev:api` ou `npm run start:api`
2. `WEB` - Executar `npm run dev:web` ou `npm run start:web`

**OBS:** Para executar a aplicação web, é necessário que a API esteja rodando.

# Estrutura do projeto
📂 OmniTalkHub <br>
┣ 📂 packages <br>
┃ ┣ 📂 [api](./packages/api/README.md) <br> 
┃ ┣ 📂 [web](./packages/web/README.md) <br>

## API
A API é responsável por gerenciar os dados do projeto. Ela é construída com Node.js, Express e PostgreSQL e utiliza o ORM Prisma para realizar a conexão com o banco de dados.

## WEB
A aplicação web é responsável por gerenciar a interface do projeto. Ela é construída com React e Next.js e utiliza o Material UI como framework de UI.

# Contribuição
Deseja contribuir com o projeto?
siga os passos abaixo: <br>
[Veja o guia de contribuição](CONTRIBUTING.md)

