# 🚀 Como Executar o Script SQL no Supabase

## 📋 Opção 1: Via Supabase Dashboard (Recomendado)

### Passo 1: Acessar o SQL Editor
1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. No menu lateral, clique em **SQL Editor**
4. Clique em **New Query**

### Passo 2: Executar o Script
1. Abra o arquivo `sql/COMPLETE_SETUP.sql` neste projeto
2. Copie **TODO** o conteúdo do arquivo (Ctrl+A, Ctrl+C)
3. Cole no editor SQL do Supabase (Ctrl+V)
4. Clique em **Run** (ou pressione Ctrl+Enter)

### Passo 3: Verificar Resultado
Você deve ver uma mensagem de sucesso: `Success. No rows returned`

---

## 📋 Opção 2: Via Supabase CLI (Avançado)

### Pré-requisitos
- [Supabase CLI instalado](https://supabase.com/docs/guides/cli)
- Projeto linkado ao Supabase

### Comandos
```bash
# Se ainda não linkou o projeto
supabase link --project-ref seu-project-ref

# Execute o script SQL
supabase db execute --file sql/COMPLETE_SETUP.sql
```

---

## ✅ Validação

Após executar o script, verifique se tudo foi criado:

### Verificar Tabelas
Execute no SQL Editor:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Deve retornar:
- accounts
- categories
- family_members
- recurring_transactions
- transactions
- users

### Verificar RLS
Execute no SQL Editor:
```sql
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;
```

Deve retornar várias políticas para cada tabela.

### Verificar Funções
Execute no SQL Editor:
```sql
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_type = 'FUNCTION'
ORDER BY routine_name;
```

Deve retornar:
- handle_new_user
- update_account_balance
- update_updated_at_column
- validate_installments

---

## 🐛 Solução de Problemas

### Erro: "type already exists"
Se algum ENUM já existir, você pode:
1. Remover o ENUM e recriar
2. Ou comentar as linhas de criação do ENUM no script

### Erro: "table already exists"
Se alguma tabela já existir, você pode:
1. Dropar a tabela: `DROP TABLE nome_da_tabela CASCADE;`
2. Ou comentar as linhas de criação da tabela no script

### Erro: "function already exists"
As funções são criadas com `CREATE OR REPLACE`, então devem substituir automaticamente.

---

## 📝 Próximos Passos

Após executar com sucesso:
1. ✅ Configure os Storage Buckets (veja `INSTRUCOES_EXECUCAO.md`)
2. ✅ Configure as variáveis de ambiente (`.env.local`)
3. ✅ Teste a autenticação
4. ✅ Teste operações CRUD básicas

---

## 💡 Dica

Se precisar executar apenas parte do script (por exemplo, só RLS), você pode copiar apenas a seção correspondente do arquivo `sql/COMPLETE_SETUP.sql`.
