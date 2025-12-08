# Sistema de Gerenciamento de Contatos

Sistema completo para gerenciamento de contatos pessoais, organizados em grupos.

## Funcionalidades
- CRUD de contatos (nome, email, telefone, idade, cidade, grupo)
- CRUD de grupos
- Interface responsiva com Bootstrap 5

## Tecnologias
- Backend: Java 21, Spring Boot 3.5.4, Spring Data JPA, H2 em memória, Maven
- Frontend: Angular 21, TypeScript, Bootstrap 5, RxJS

## Estrutura
```
backend/                 # API REST Spring Boot
  src/main/java/         # Código fonte Java
  pom.xml                # Dependências Maven
frontend/contato/        # Aplicação Angular
  src/app/               # Componentes e serviços
  package.json           # Dependências npm
```

## Como rodar
Pré-requisitos: Java 21+, Node.js 18+, npm 9+

Backend (porta 8080):
```bash
cd backend
./mvnw spring-boot:run   # no Windows: mvnw.cmd spring-boot:run
```

Frontend (porta 4200):
```bash
cd frontend/contato
npm install
npm start
```

## Endpoints da API
### Contatos (`/contatos`)
- GET `/contatos` — listar
- GET `/contatos/{id}` — buscar por id
- POST `/contatos` — criar
- PUT `/contatos/{id}` — atualizar
- DELETE `/contatos/{id}` — excluir
- GET `/contatos/grupo/{grupoId}` — listar por grupo

### Grupos (`/grupos`)
- GET `/grupos` — listar
- GET `/grupos/{id}` — buscar por id
- POST `/grupos` — criar
- PUT `/grupos/{id}` — atualizar
- DELETE `/grupos/{id}` — excluir

### Exemplo de contato (JSON)
```json
{
  "nome": "Joao Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "idade": "30",
  "cidade": "Sao Paulo",
  "grupoId": 1
}
```

## Banco de Dados
- H2 em memória, reinicia a cada start do backend.
- Console H2: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:contato`
  - Username: `sa`
  - Password: (vazio)
