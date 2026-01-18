-- ============================================
-- 🚀 SCRIPT COMPLETO - Money Up Dashboard
-- ============================================
-- Execute este script no Supabase SQL Editor para criar tudo de uma vez
-- Ou execute os scripts individuais na ordem: 01, 02, 03, 04, 05, 06

-- ============================================
-- PASSO 1: Criar ENUMs
-- ============================================
\i 01_create_enums.sql

-- ============================================
-- PASSO 2: Criar Tabelas
-- ============================================
\i 02_create_tables.sql

-- ============================================
-- PASSO 3: Criar Índices
-- ============================================
\i 03_create_indexes.sql

-- ============================================
-- PASSO 4: Configurar RLS
-- ============================================
\i 04_setup_rls.sql

-- ============================================
-- PASSO 5: Criar Funções
-- ============================================
\i 05_create_functions.sql

-- ============================================
-- PASSO 6: Criar Triggers
-- ============================================
\i 06_create_triggers.sql

-- ============================================
-- ✅ CONCLUSÃO
-- ============================================
-- Após executar este script:
-- 1. Configure os Storage Buckets manualmente no Dashboard
-- 2. Configure as variáveis de ambiente no projeto
-- 3. Teste a autenticação e operações CRUD
