# 📋 Plano de Integração Supabase - Money Up Dashboard

## 🎯 Objetivo
Remover todos os dados mockados e integrar completamente o sistema com Supabase, incluindo banco de dados, autenticação, storage e RLS.

---

## 📊 Fase 1: Preparação do Banco de Dados

### 1.1 Criação das Tabelas
- [x] Converter schema Prisma para SQL DDL
- [ ] Criar ENUMs (TransactionType, AccountType, RecurrenceFrequency, TransactionStatus)
- [ ] Criar tabelas principais:
  - `users` (integração com auth.users)
  - `family_members`
  - `categories`
  - `accounts`
  - `transactions`
  - `recurring_transactions`
- [ ] Criar índices para performance
- [ ] Criar foreign keys e constraints

### 1.2 Row Level Security (RLS)
- [ ] Habilitar RLS em todas as tabelas
- [ ] Criar políticas de acesso público (todos os usuários autenticados podem acessar todas as tabelas)
- [ ] Política INSERT: usuário autenticado pode inserir
- [ ] Política SELECT: usuário autenticado pode ler
- [ ] Política UPDATE: usuário autenticado pode atualizar
- [ ] Política DELETE: usuário autenticado pode deletar

### 1.3 Funções e Triggers
- [ ] Função para atualizar `updated_at` automaticamente
- [ ] Trigger para atualizar saldo da conta ao criar transação
- [ ] Função para gerar transações recorrentes
- [ ] Função para validar parcelamentos (máx 12 parcelas)
- [ ] Função para calcular limite disponível em cartões

---

## 🔐 Fase 2: Autenticação

### 2.1 Configuração Auth
- [ ] Configurar email/password authentication
- [ ] Criar função para criar usuário na tabela `users` ao se registrar
- [ ] Criar função para atualizar perfil do usuário
- [ ] Service de autenticação no frontend

### 2.2 Integração Frontend
- [ ] Criar `AuthContext` para gerenciar estado de autenticação
- [ ] Criar componentes de Login/Register
- [ ] Proteger rotas com autenticação
- [ ] Middleware para verificar sessão

---

## 💾 Fase 3: Storage

### 3.1 Buckets
- [ ] Bucket `avatars` (para avatares de usuários e membros)
  - Política: usuário autenticado pode fazer upload
  - Política: público pode ler
  - Limite: 5MB por arquivo, apenas imagens
- [ ] Bucket `account-logos` (para logos de contas/cartões)
  - Política: usuário autenticado pode fazer upload
  - Política: público pode ler
  - Limite: 2MB por arquivo, apenas imagens
- [ ] Bucket `documents` (para comprovantes, recibos)
  - Política: apenas usuário proprietário pode acessar
  - Limite: 10MB por arquivo, PDF/Imagens

### 3.2 Service de Storage
- [ ] Função para upload de arquivos
- [ ] Função para download/obter URL pública
- [ ] Função para deletar arquivos
- [ ] Validação de tipos e tamanhos

---

## 🔧 Fase 4: Serviços e Hooks

### 4.1 Serviços Base
- [ ] `services/auth.ts` - Autenticação
- [ ] `services/users.ts` - CRUD de usuários
- [ ] `services/familyMembers.ts` - CRUD de membros
- [ ] `services/categories.ts` - CRUD de categorias
- [ ] `services/accounts.ts` - CRUD de contas/cartões
- [ ] `services/transactions.ts` - CRUD de transações
- [ ] `services/recurringTransactions.ts` - CRUD de transações recorrentes
- [ ] `services/storage.ts` - Gerenciamento de arquivos

### 4.2 Hooks Customizados
- [ ] `hooks/useAuth.ts` - Hook de autenticação
- [ ] `hooks/useUser.ts` - Hook para dados do usuário
- [ ] `hooks/useFamilyMembers.ts` - Hook para membros da família
- [ ] `hooks/useCategories.ts` - Hook para categorias
- [ ] `hooks/useAccounts.ts` - Hook para contas/cartões
- [ ] `hooks/useTransactions.ts` - Hook para transações
- [ ] `hooks/useStorage.ts` - Hook para storage

---

## 🔄 Fase 5: Remoção de Mocks e Integração

### 5.1 Atualização de Componentes
- [ ] Remover dados mockados de `Cards.tsx`
- [ ] Remover dados mockados de `TransactionList.tsx`
- [ ] Remover dados mockados de `RecentTransactions.tsx`
- [ ] Remover dados mockados de `CardList.tsx`
- [ ] Remover dados mockados de `DetailedStatement.tsx`
- [ ] Remover dados mockados de `CardsAccounts.tsx`
- [ ] Remover dados mockados de `UpcomingExpenses.tsx`
- [ ] Remover dados mockados de `ProgressCards.tsx`
- [ ] Remover dados mockados de `SummaryCards.tsx`
- [ ] Remover dados mockados de `SidebarProfile.tsx`

### 5.2 Integração com Supabase
- [ ] Substituir mocks por chamadas aos hooks/serviços
- [ ] Adicionar estados de loading e error
- [ ] Implementar refresh automático quando necessário
- [ ] Adicionar optimistic updates onde apropriado

---

## 📝 Fase 6: Tipos TypeScript

### 6.1 Atualização de Types
- [ ] Atualizar `types/index.ts` conforme schema Prisma
- [ ] Criar tipos para todas as entidades
- [ ] Criar tipos para DTOs (Data Transfer Objects)
- [ ] Criar tipos para respostas da API
- [ ] Garantir tipagem forte em todos os serviços

---

## ✅ Checklist de Validação

### Banco de Dados
- [ ] Todas as tabelas criadas corretamente
- [ ] Todos os índices funcionando
- [ ] RLS habilitado e funcionando
- [ ] Políticas de acesso testadas
- [ ] Triggers e funções funcionando

### Autenticação
- [ ] Login funciona
- [ ] Registro cria usuário
- [ ] Sessão persiste
- [ ] Logout funciona
- [ ] Proteção de rotas funciona

### Storage
- [ ] Upload de avatares funciona
- [ ] Upload de logos funciona
- [ ] Download/visualização funciona
- [ ] Permissões corretas

### Integração
- [ ] Nenhum dado mockado restante
- [ ] Todas as operações CRUD funcionando
- [ ] Performance aceitável
- [ ] Tratamento de erros adequado

---

## 📦 Estrutura de Arquivos

```
src/
├── services/
│   ├── supabase.ts (já existe)
│   ├── auth.ts
│   ├── users.ts
│   ├── familyMembers.ts
│   ├── categories.ts
│   ├── accounts.ts
│   ├── transactions.ts
│   ├── recurringTransactions.ts
│   └── storage.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useUser.ts
│   ├── useFamilyMembers.ts
│   ├── useCategories.ts
│   ├── useAccounts.ts
│   ├── useTransactions.ts
│   └── useStorage.ts
├── types/
│   └── index.ts (atualizado)
├── context/
│   └── AuthContext.tsx
└── sql/
    ├── 01_create_enums.sql
    ├── 02_create_tables.sql
    ├── 03_create_indexes.sql
    ├── 04_setup_rls.sql
    ├── 05_create_functions.sql
    └── 06_create_triggers.sql
```

---

## 🚀 Ordem de Execução

1. **Fase 1**: Criar estrutura do banco de dados no Supabase
2. **Fase 2**: Configurar autenticação
3. **Fase 3**: Configurar storage
4. **Fase 4**: Criar serviços e hooks
5. **Fase 5**: Remover mocks e integrar
6. **Fase 6**: Validar e ajustar tipos

---

## 📚 Referências

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Functions](https://www.postgresql.org/docs/current/xfunc.html)
