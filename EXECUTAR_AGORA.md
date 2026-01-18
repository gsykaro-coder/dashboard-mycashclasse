# 🚀 EXECUTAR SCRIPT SQL AGORA - Money Up Dashboard

## ✅ Passo a Passo Rápido

### 1️⃣ Acesse o Supabase Dashboard
👉 https://app.supabase.com

### 2️⃣ Selecione seu projeto
- Se ainda não tem um projeto, crie um novo

### 3️⃣ Abra o SQL Editor
- No menu lateral, clique em **SQL Editor**
- Clique em **New Query**

### 4️⃣ Execute o Script
1. Abra o arquivo `sql/COMPLETE_SETUP.sql` neste projeto
2. Copie **TODO** o conteúdo (Ctrl+A, Ctrl+C)
3. Cole no SQL Editor do Supabase (Ctrl+V)
4. Clique em **Run** (ou Ctrl+Enter)

### 5️⃣ Verifique o Resultado
Você deve ver: ✅ **Success. No rows returned**

---

## 🔍 Validar Execução

Execute esta query no SQL Editor para verificar se tudo foi criado:

```sql
SELECT 
  'Tabelas' as tipo,
  COUNT(*) as quantidade
FROM information_schema.tables 
WHERE table_schema = 'public'
UNION ALL
SELECT 
  'Políticas RLS' as tipo,
  COUNT(*) as quantidade
FROM pg_policies 
WHERE schemaname = 'public'
UNION ALL
SELECT 
  'Funções' as tipo,
  COUNT(*) as quantidade
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_type = 'FUNCTION';
```

**Resultado esperado:**
- Tabelas: **6** (users, family_members, categories, accounts, transactions, recurring_transactions)
- Políticas RLS: **24** (4 políticas por tabela)
- Funções: **4** (handle_new_user, update_account_balance, update_updated_at_column, validate_installments)

---

## ⚠️ Se der erro

### Erro: "type already exists"
```sql
-- Remova os ENUMs existentes e execute novamente
DROP TYPE IF EXISTS transaction_type CASCADE;
DROP TYPE IF EXISTS account_type CASCADE;
DROP TYPE IF EXISTS recurrence_frequency CASCADE;
DROP TYPE IF EXISTS transaction_status CASCADE;
```
Depois execute o script novamente.

### Erro: "table already exists"
Se alguma tabela já existir, você pode:
1. Remover a tabela: `DROP TABLE nome_da_tabela CASCADE;`
2. Ou comentar a seção correspondente no script

### Erro: "function already exists"
As funções usam `CREATE OR REPLACE`, então devem substituir automaticamente.

---

## 📦 Próximos Passos

Após executar com sucesso:

1. ✅ Configure Storage Buckets (veja `INSTRUCOES_EXECUCAO.md`)
2. ✅ Configure variáveis de ambiente (`.env.local`)
3. ✅ Teste autenticação
4. ✅ Integre frontend com Supabase

---

## 💡 Dica

Salve o script executado como **Migration** no Supabase:
- No SQL Editor, após executar com sucesso
- Clique em **Save** e dê um nome (ex: "001_initial_schema")
