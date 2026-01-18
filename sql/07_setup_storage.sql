-- ============================================
-- 📦 STORAGE BUCKETS - Money Up Dashboard
-- ============================================
-- Execute este script no Supabase Dashboard > Storage

-- ============================================
-- 🖼️ Bucket para Avatares
-- ============================================
-- Bucket Name: avatars
-- Public: true (para permitir acesso público às imagens)
-- File size limit: 5242880 (5MB)
-- Allowed MIME types: image/jpeg, image/png, image/webp

-- Políticas do bucket 'avatars'
-- Inserir (INSERT): Usuários autenticados podem fazer upload
-- SELECT: Público pode ler
-- UPDATE: Usuário autenticado pode atualizar seus próprios arquivos
-- DELETE: Usuário autenticado pode deletar seus próprios arquivos

-- ============================================
-- 🏦 Bucket para Logos de Contas/Cartões
-- ============================================
-- Bucket Name: account-logos
-- Public: true
-- File size limit: 2097152 (2MB)
-- Allowed MIME types: image/jpeg, image/png, image/svg+xml

-- Políticas do bucket 'account-logos'
-- Inserir (INSERT): Usuários autenticados podem fazer upload
-- SELECT: Público pode ler
-- UPDATE: Usuário autenticado pode atualizar
-- DELETE: Usuário autenticado pode deletar

-- ============================================
-- 📄 Bucket para Documentos
-- ============================================
-- Bucket Name: documents
-- Public: false (apenas proprietário pode acessar)
-- File size limit: 10485760 (10MB)
-- Allowed MIME types: application/pdf, image/jpeg, image/png

-- Políticas do bucket 'documents'
-- Inserir (INSERT): Usuários autenticados podem fazer upload
-- SELECT: Apenas o proprietário do arquivo pode ler
-- UPDATE: Apenas o proprietário do arquivo pode atualizar
-- DELETE: Apenas o proprietário do arquivo pode deletar

-- ============================================
-- 📝 SQL para criar buckets (via Supabase CLI ou Dashboard)
-- ============================================
-- Nota: Os buckets devem ser criados manualmente no Supabase Dashboard
-- ou usando a API do Supabase Storage

-- Exemplo de criação via Supabase Dashboard:
-- 1. Vá para Storage > New Bucket
-- 2. Configure cada bucket conforme especificado acima
-- 3. Configure as políticas RLS para cada bucket
