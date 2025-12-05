# Sistema de Gerenciamento de Contatos

Sistema completo para gerenciamento de contatos pessoais, permitindo organizar contatos em grupos (famílias).

## 📋 Funcionalidades

- **CRUD de Contatos**: Criar, visualizar, editar e excluir contatos
- **CRUD de Grupos**: Gerenciar grupos/famílias para organizar contatos
- **6 Campos por Contato**: Nome, Email, Telefone, Idade, Cidade e Grupo
- **Interface Responsiva**: Design moderno com Bootstrap 5

## 🛠️ Tecnologias

### Backend

- **Java 21**
- **Spring Boot 3.5.4**
- **Spring Data JPA**
- **H2 Database** (banco em memória)
- **Maven**

### Frontend

- **Angular 21**
- **TypeScript**
- **Bootstrap 5**
- **RxJS**

## 📁 Estrutura do Projeto

```
├── backend/                 # API REST Spring Boot
│   ├── src/main/java/      # Código fonte Java
│   └── pom.xml             # Dependências Maven
│
└── frontend/contato/       # Aplicação Angular
    ├── src/app/            # Componentes e serviços
    └── package.json        # Dependências npm
```

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Java 21+
- Node.js 18+
- npm 9+

### Backend (porta 8080)

```bash
cd backend
chmod +x mvnw          # Apenas no Linux/macOS
./mvnw spring-boot:run
```

O backend estará disponível em: `http://localhost:8080`

### Frontend (porta 4200)

```bash
cd frontend/contato
npm install
npm start
```

O frontend estará disponível em: `http://localhost:4200`

## 📡 Endpoints da API

### Contatos

| Método | Endpoint        | Descrição                |
| ------ | --------------- | ------------------------ |
| GET    | `/contato`      | Listar todos os contatos |
| GET    | `/contato/{id}` | Buscar contato por ID    |
| POST   | `/contato`      | Criar novo contato       |
| PUT    | `/contato/{id}` | Atualizar contato        |
| DELETE | `/contato/{id}` | Excluir contato          |

### Grupos/Famílias

| Método | Endpoint        | Descrição              |
| ------ | --------------- | ---------------------- |
| GET    | `/familia`      | Listar todos os grupos |
| GET    | `/familia/{id}` | Buscar grupo por ID    |
| POST   | `/familia`      | Criar novo grupo       |
| PUT    | `/familia/{id}` | Atualizar grupo        |
| DELETE | `/familia/{id}` | Excluir grupo          |

## 📝 Exemplo de Contato (JSON)

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "idade": "30",
  "cidade": "São Paulo",
  "familiaId": 1
}
```

## 🗃️ Banco de Dados

O projeto utiliza **H2 Database** em memória. Os dados são reiniciados a cada restart do backend.

Console H2: `http://localhost:8080/h2-console`

- JDBC URL: `jdbc:h2:mem:contato`
- Username: `sa`
- Password: (vazio)

## 👥 Autores

Projeto desenvolvido para fins educacionais.

---

**Data limite**: 09/12/2025
