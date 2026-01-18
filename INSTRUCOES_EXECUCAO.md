# 📋 Instruções de Execução - Integração Supabase

## 🔧 Passo 1: Executar Scripts SQL no Supabase

### Via Supabase Dashboard (Recomendado)

1. Acesse o Supabase Dashboard do seu projeto
2. Vá para **SQL Editor**
3. Execute os scripts na seguinte ordem:

```
1. sql/01_create_enums.sql
2. sql/02_create_tables.sql
3. sql/03_create_indexes.sql
4. sql/04_setup_rls.sql
5. sql/05_create_functions.sql
6. sql/06_create_triggers.sql
```

### Via Supabase CLI (Alternativo)

```bash
# Certifique-se de estar logado
supabase login

# Linke o projeto local ao remoto
supabase link --project-ref <seu-project-ref>

# Execute os scripts SQL
psql <supabase-connection-string> -f sql/01_create_enums.sql
psql <supabase-connection-string> -f sql/02_create_tables.sql
psql <supabase-connection-string> -f sql/03_create_indexes.sql
psql <supabase-connection-string> -f sql/04_setup_rls.sql
psql <supabase-connection-string> -f sql/05_create_functions.sql
psql <supabase-connection-string> -f sql/06_create_triggers.sql
```

---

## 📦 Passo 2: Configurar Storage Buckets

### No Supabase Dashboard:

1. Vá para **Storage**
2. Crie os seguintes buckets:

#### Bucket 1: `avatars`
- **Public**: ✅ Sim
- **File size limit**: 5 MB
- **Allowed MIME types**: `image/jpeg, image/png, image/webp`

**Políticas RLS:**
```sql
-- INSERT: Autenticados podem fazer upload
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- SELECT: Público pode ler
CREATE POLICY "Public can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- UPDATE: Proprietário pode atualizar
CREATE POLICY "Users can update own avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- DELETE: Proprietário pode deletar
CREATE POLICY "Users can delete own avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

#### Bucket 2: `account-logos`
- **Public**: ✅ Sim
- **File size limit**: 2 MB
- **Allowed MIME types**: `image/jpeg, image/png, image/svg+xml`

**Políticas RLS:**
```sql
-- INSERT: Autenticados podem fazer upload
CREATE POLICY "Authenticated users can upload logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'account-logos');

-- SELECT: Público pode ler
CREATE POLICY "Public can view logos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'account-logos');

-- UPDATE: Autenticados podem atualizar
CREATE POLICY "Authenticated users can update logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'account-logos');

-- DELETE: Autenticados podem deletar
CREATE POLICY "Authenticated users can delete logos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'account-logos');
```

#### Bucket 3: `documents`
- **Public**: ❌ Não
- **File size limit**: 10 MB
- **Allowed MIME types**: `application/pdf, image/jpeg, image/png`

**Políticas RLS:**
```sql
-- INSERT: Autenticados podem fazer upload
CREATE POLICY "Authenticated users can upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- SELECT: Apenas proprietário pode ler
CREATE POLICY "Users can view own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- UPDATE: Apenas proprietário pode atualizar
CREATE POLICY "Users can update own documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- DELETE: Apenas proprietário pode deletar
CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
```

---

## 🔐 Passo 3: Configurar Variáveis de Ambiente

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

## ✅ Passo 4: Validar Instalação

### Teste 1: Verificar Tabelas
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

### Teste 2: Verificar RLS
Execute no SQL Editor:
```sql
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;
```

Deve retornar várias políticas para cada tabela.

### Teste 3: Verificar Funções
Execute no SQL Editor:
```sql
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_type = 'FUNCTION';
```

Deve retornar:
- handle_new_user
- update_account_balance
- update_updated_at_column
- validate_installments

### Teste 4: Verificar Storage
1. Vá para **Storage** no Dashboard
2. Verifique se os 3 buckets estão criados:
   - avatars
   - account-logos
   - documents

---

## 🚀 Próximos Passos

Após concluir os passos acima:

1. ✅ Atualizar tipos TypeScript
2. ✅ Criar serviços e hooks
3. ✅ Implementar autenticação
4. ✅ Remover dados mockados
5. ✅ Integrar componentes com Supabase

---

## 📚 Documentação Adicional

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Policies](https://supabase.com/docs/guides/storage/security/access-control)
