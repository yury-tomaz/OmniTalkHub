O OmniTalkHub está em desenvolvimento para se tornar uma plataforma avançada de comunicação projetada para oferecer uma experiência integrada e fluida em todos os canais de comunicação. 

Nosso objetivo é fornecer suporte para uma variedade de canais populares, incluindo Facebook Messenger, WhatsApp, Instagram, LiveChat e muito mais, permitindo que as empresas se conectem com seus clientes onde quer que estejam.

### Recursos planejados incluem:
- Integração com os canais da Meta (Facebook Messenger e Instagram) e outros canais populares de comunicação.

- Capacidade multitenant, permitindo que várias empresas gerenciem suas próprias instâncias do OmniTalkHub em um único ambiente.

- Chat ao vivo em tempo real para interações instantâneas com os clientes.

- Análises detalhadas e relatórios para acompanhar o desempenho e melhorar a eficácia das interações.
O OmniTalkHub é um mono-repositório que utiliza NPM workspaces para gerenciar os projetos. Cada projeto é um pacote NPM e pode ser publicado individualmente.

- Personalização flexível para atender às necessidades específicas de cada empresa, incluindo branding e configurações de resposta automática.

### Tecnologias Utilizadas:
- Node.js
- Express.js
- Next.js
- keycloak
- Prisma Client
- PostgreSQL
- Docker
- Material UI
  

# Estrutura do Projeto
Para uma visão mais detalhada da estrutura do projeto, recomendamos acessar o arquivo [STRUCTURE.md](STRUCTURE.md). Este arquivo fornece uma descrição abrangente da organização dos diretórios e arquivos dentro do projeto OmniTalkHub, ajudando os desenvolvedores a navegar e entender melhor a estrutura do código-fonte.

# Instalação

O OmniTalkHub é um mono-repositório que utiliza NPM workspaces para gerenciar os projetos. Cada projeto é um pacote NPM e pode ser publicado individualmente.

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

