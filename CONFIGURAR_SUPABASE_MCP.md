# 🔧 Como Configurar Supabase MCP no Cursor

## 📋 Pré-requisitos

1. **Supabase CLI instalado**
   ```bash
   npm install -g supabase
   ```

2. **Projeto Supabase criado** no [Supabase Dashboard](https://app.supabase.com)

3. **Credenciais do projeto**:
   - URL do projeto
   - Service Role Key (para operações administrativas)
   - Anon Key (para client-side)

---

## 🚀 Opção 1: Usar Supabase CLI diretamente

### Passo 1: Instalar Supabase CLI (se ainda não tiver)
```bash
npm install -g supabase
```

### Passo 2: Login no Supabase
```bash
supabase login
```

### Passo 3: Linkar projeto
```bash
supabase link --project-ref seu-project-ref
```

### Passo 4: Executar script SQL
```bash
# Execute o script completo
supabase db push --file sql/COMPLETE_SETUP.sql

# Ou via psql direto
psql "postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" -f sql/COMPLETE_SETUP.sql
```

---

## 🚀 Opção 2: Via Supabase Dashboard (Mais Simples)

1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. Vá para **SQL Editor**
4. Abra o arquivo `sql/COMPLETE_SETUP.sql`
5. Copie TODO o conteúdo e cole no SQL Editor
6. Clique em **Run**

---

## 🔐 Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

**Como obter as credenciais:**
1. No Supabase Dashboard, vá para **Settings** > **API**
2. Copie a **URL** do projeto
3. Copie a **anon/public** key

---

## ✅ Validar Instalação

Após executar o script, execute estas queries no SQL Editor para validar:

```sql
-- Verificar tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Verificar RLS habilitado
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;

-- Verificar funções criadas
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_type = 'FUNCTION'
ORDER BY routine_name;
```

---

## 📚 Referências

- [Supabase CLI Docs](https://supabase.com/docs/reference/cli)
- [Supabase SQL Editor](https://supabase.com/docs/guides/database/sql-editor)
