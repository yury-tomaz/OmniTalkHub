## Estrutura do projeto utilizando Clean Architecture

O projeto mantém sua base na Clean Architecture, mas foram feitos ajustes na estrutura de pastas para refletir de maneira <br>
mais clara as responsabilidades e relações entre os diferentes componentes. A estrutura atualizada é a seguinte:


A estrutura de pastas fica da seguinte forma:

┣ 📂 infrastructure <br>
┃ ┣ 📂 services <br>
┃ ┃ ┣ 📂 email <br>
┃ ┃ ┣ 📂 messaging <br>
┃ ┣ 📂 persistence <br>
┃ ┃ ┣ 📂 migrations <br>
┃ ┃ ┣ 📂 repositories <br>
┃ ┣ 📂 providers <br>
┃ ┃ ┣ 📂 auth <br>
┃ ┃ ┣ 📂 storage <br>

┣ 📂 presentation <br>
┃ ┣ 📂 controllers <br>
┃ ┣ 📂 middlewares <br>
┃ ┣ 📂 routes <br>
┃ ┣ 📂 view-models <br>

┣ 📂 modules <br>
┃ ┣ 📂 [module-name] <br>
┃ ┃ ┣ 📂 domain <br>
┃ ┃ ┣ 📂 facade <br>
┃ ┃ ┣ 📂 factory <br>
┃ ┃ ┣ 📂 gateway <br>
┃ ┃ ┣ 📂 repository <br>
┃ ┃ ┣ 📂 application <br>
┃ ┃ ┃ ┣ 📂 commands <br>
┃ ┃ ┃ ┣ 📂 events <br>
┃ ┃ ┃ ┣ 📂 queries <br>

### Explicações da Estrutura Atualizada:
1. src: Diretório principal do código-fonte.
2. `infrastructure`: Responsável por detalhes de implementação e serviços externos.
   - `services`: Contém serviços externos, como email e mensageria.
   - `persistence`: Gerencia a persistência de dados.
     - `migrations`: Armazena scripts de migração de banco de dados.
     - `repositories`: Implementa repositórios de dados.
   - `providers`: Contém provedores de serviços externos.
     - `auth`: Implementa a autenticação e autorização (Keycloak)
     - `storage`: Implementa o armazenamento de arquivos (S3)
3. `presentation`: Lida com a interação direta com o usuário.
    - `controllers`: Implementa os controladores da API.
    - `middlewares`: Implementa middlewares da API.
    - `routes`: Implementa as rotas da API.
    - `view-models`: Implementa os modelos de visualização da API.
4. `modules`: Contém os módulos do projeto.
   - `[module-name]`: Nome do módulo específico.
     - `domain`: Contém a lógica de negócios central do módulo.
     - `facade`: Fornece uma interface unificada para as funcionalidades do módulo.
     - `factory`: Criação de instâncias e objetos relacionados.
     - `gateway`: Define interfaces para interações externas.
     - `repository`:  Implementa repositórios específicos do módulo.
     - `application`: Contém casos de uso específicos do módulo
       - `commands`: Comandos para modificação de estado.
       - `events`: Eventos relacionados ao módulo.
       - `queries`: Consultas para leitura de dados.

Essa estrutura reforça a separação de responsabilidades, facilitando a manutenção, a evolução e a compreensão do código ao longo do tempo.


### Intenção Futura: Microsserviços

<p>A visão futura para o projeto é evoluir gradualmente para uma arquitetura de microsserviços.<br>
Essa transição permitirá uma maior independência entre os diferentes módulos, promovendo escalabilidade e flexibilidade adicionais.</p>

<p>Cada módulo existente na estrutura atual pode se tornar um microsserviço individual no futuro. Essa abordagem de <br>
possibilita o desenvolvimento, implantação e escalação independentes de cada serviço, facilitando a manutenção e evolução contínua do sistema como um todo.</p>

<p>A adoção de microsserviços também promove a modularidade e a distribuição de responsabilidades, tornando o sistema mais
resiliente e adaptável a mudanças. A estrutura organizada atual serve como uma base sólida para essa evolução, e a transição para microsserviços será guiada pelos requisitos específicos e pela complexidade do sistema à medida que evolui.</p>






