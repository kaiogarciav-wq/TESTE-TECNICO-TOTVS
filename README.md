# 🛒 Full Stack E-commerce Demo — .NET 8 + Angular 12

Aplicação **full stack** desenvolvida como **teste técnico**, simulando um **e-commerce simplificado** com autenticação **JWT**, cadastro de produtos e operações **CRUD completas**.  

O projeto segue **práticas modernas de engenharia de software**, priorizando **Clean Architecture**, **desacoplamento**, **segurança** e **Developer Experience (DX)**.

---

## 🚀 Stack Técnica

### Backend (.NET 8)
- **ASP.NET Core Web API (.NET 8)**
- **Entity Framework Core (InMemory Database)**
- **Autenticação JWT**
- **Clean Architecture + SOLID**
- **Camadas desacopladas:** Controller → Service → Repository
- **Swagger UI** para documentação da API
- **Middleware** para autenticação e tratamento centralizado de erros

### Frontend (Angular 12)
- **Angular 12 + TypeScript + RxJS**
- **Formulários Reativos (Reactive Forms)**
- **Consumo de API RESTful via HttpClient**
- **AuthGuard com JWT**
- **Design modular e componentizado**
- **Feedback visual e validação em tempo real**

---

## 🔐 Autenticação e Segurança

- Baseada em **JWT** — token gerado no login e enviado automaticamente via **HTTP Interceptor**.  

**Rotas:**
- Públicas: `/login`  
- Autenticadas: `/products`, `/auth/profile`  

**Header padrão:**  
```http
Authorization: Bearer <seu_token_aqui>
```

---

## 🛠️ Execução Local

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
cd nome-do-projeto
```

### 2️⃣ Backend
```bash
cd backend
dotnet restore
dotnet run
```
API disponível em:
- `https://localhost:5001`  
- `http://localhost:5136`

### 3️⃣ Frontend
```bash
cd ../frontend
npm install
ng serve
```
Aplicação disponível em:
- `http://localhost:4200`

---

## 💾 Banco de Dados

- **Entity Framework Core InMemory** apenas para fins de teste técnico.  
- Dados persistem apenas durante a execução e são resetados a cada restart do servidor.

---

## 🧱 Estrutura de Pastas

### Backend (.NET)
```
backend/
├── Controllers/
├── Domain/
├── Infrastructure/
├── Profiles/
├── Properties/
├── Properties/
└── Program.cs
```

### Frontend (Angular)
```
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── auth/
│   │   ├── products/
│   │   └── shared/
│   ├── assets/
│   └── environments/
```

---

## 🧪 Boas Práticas Aplicadas
- Princípios **SOLID**
- **Clean Code**
- **Injeção de Dependência**
- **Separação de responsabilidades**
- **Tratamento de erros centralizado**
- **Tipagem forte e interfaces explícitas no Angular**
- **Estrutura modular e padronização de commits**

---

## 📚 API Endpoints (Exemplo)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST   | /api/auth/register | Registro e geração de token | ✅ |
| POST   | /api/auth/login | Login e geração de token | ✅ |
| GET    | /api/products | Lista produtos | ✅ |
| POST   | /api/products | Cria produto | ✅ |
| PUT    | /api/products/{id} | Atualiza produto | ✅ |
| DELETE | /api/products/{id} | Exclui produto | ✅ |

---

## 📈 Considerações Finais

Este projeto demonstra competência técnica **full stack** e aplicação de **boas práticas** de arquitetura e design de software.  
A integração entre **.NET 8** e **Angular 12** foi construída com foco em **segurança**, **claridade de código** e **escalabilidade**, refletindo um **mindset moderno de engenharia**.

---

✨ Autor

**Kaio Vinicius de Oliveira Garcia**  
👨‍💻 Software Engineer | Fullstack Developer (.NET / Angular /Nextjs / Reactjs / Nodejs)  
🔗 LinkedIn  
📧 kaiogarcia.dev@gmail.com