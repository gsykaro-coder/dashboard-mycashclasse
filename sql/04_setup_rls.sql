-- ============================================
-- 🔒 ROW LEVEL SECURITY (RLS)
-- ============================================
-- Política: Todos os usuários autenticados têm acesso total
-- (INSERT, SELECT, UPDATE, DELETE) em todas as tabelas

-- ============================================
-- 👤 USUÁRIOS
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all users" ON users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert their own user" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own user" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete their own user" ON users
  FOR DELETE USING (auth.uid() = id);

-- ============================================
-- 👨‍👩‍👧‍👦 MEMBROS DA FAMÍLIA
-- ============================================
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all family members" ON family_members
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert family members" ON family_members
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update family members" ON family_members
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete family members" ON family_members
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- 🏷️ CATEGORIAS
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all categories" ON categories
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert categories" ON categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update categories" ON categories
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete categories" ON categories
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- 💳 CONTAS
-- ============================================
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all accounts" ON accounts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert accounts" ON accounts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update accounts" ON accounts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete accounts" ON accounts
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- 💰 TRANSAÇÕES
-- ============================================
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all transactions" ON transactions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert transactions" ON transactions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update transactions" ON transactions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete transactions" ON transactions
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- 💫 TRANSAÇÕES RECORRENTES
-- ============================================
ALTER TABLE recurring_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all recurring transactions" ON recurring_transactions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert recurring transactions" ON recurring_transactions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update recurring transactions" ON recurring_transactions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete recurring transactions" ON recurring_transactions
  FOR DELETE USING (auth.role() = 'authenticated');
