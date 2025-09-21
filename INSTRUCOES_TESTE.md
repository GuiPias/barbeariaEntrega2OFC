# Instruções para Testar a Integração Frontend-Backend

## 1. Iniciar o Backend (Spring Boot)

```bash
cd "Barbearia4Periodo-master\Barbearia4Periodo-master"
mvn spring-boot:run
```

O backend estará rodando em: http://localhost:8080/api

## 2. Iniciar o Frontend (Angular)

```bash
cd barbearia-app
npm install
ng serve
```

O frontend estará rodando em: http://localhost:4200

## 3. Testar a Página de Clientes

1. Acesse http://localhost:4200/clientes
2. Clique em "➕ Novo Cliente"
3. Preencha os dados:
   - Nome: João Silva
   - Celular: (11) 99999-9999
   - Email: joao@email.com
   - Idade: 30
4. Clique em "💾 Salvar Cliente"

## Funcionalidades Implementadas

- ✅ Listar clientes do backend
- ✅ Cadastrar novo cliente
- ✅ Editar cliente existente
- ✅ Deletar cliente
- ✅ CORS configurado
- ✅ Tratamento de erros

## Endpoints do Backend

- GET /api/clientes - Listar todos os clientes
- POST /api/clientes - Criar novo cliente
- PUT /api/clientes/{id} - Atualizar cliente
- DELETE /api/clientes/{id} - Deletar cliente