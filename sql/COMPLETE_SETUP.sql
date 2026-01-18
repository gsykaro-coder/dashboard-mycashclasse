-- ============================================
-- 🚀 SCRIPT COMPLETO - Money Up Dashboard
-- ============================================
-- Execute este script completo no Supabase SQL Editor
-- Ele cria toda a estrutura do banco de dados de uma vez
-- ============================================

-- ============================================
-- PASSO 1: CRIAR ENUMS
-- ============================================

-- Transaction Type (Receita ou Despesa)
CREATE TYPE transaction_type AS ENUM ('INCOME', 'EXPENSE');

-- Account Type (Conta Corrente, Poupança ou Cartão de Crédito)
CREATE TYPE account_type AS ENUM ('CHECKING', 'SAVINGS', 'CREDIT_CARD');

-- Recurrence Frequency (Diária, Semanal, Mensal, Anual)
CREATE TYPE recurrence_frequency AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- Transaction Status (Pendente ou Concluído)
CREATE TYPE transaction_status AS ENUM ('PENDING', 'COMPLETED');

-- ============================================
-- PASSO 2: CRIAR TABELAS
-- ============================================

-- ============================================
-- 👤 USUÁRIOS
-- ============================================
-- Integração com auth.users do Supabase
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 👨‍👩‍👧‍👦 MEMBROS DA FAMÍLIA
-- ============================================
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- "Pai", "Mãe", "Filho", etc
  avatar_url TEXT,
  monthly_income DECIMAL(12, 2) DEFAULT 0,
  color TEXT DEFAULT '#3247FF',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 🏷️ CATEGORIAS
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '📌',
  type transaction_type NOT NULL,
  color TEXT DEFAULT '#3247FF',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 💳 CONTAS E CARTÕES (UNIFICADO)
-- ============================================
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type account_type NOT NULL,
  name TEXT NOT NULL,
  bank TEXT NOT NULL,
  last_digits TEXT, -- 4 últimos dígitos (opcional)
  holder_id UUID NOT NULL REFERENCES family_members(id),
  
  -- Campos para Conta Corrente e Poupança
  balance DECIMAL(12, 2) DEFAULT 0,
  
  -- Campos para Cartão de Crédito
  credit_limit DECIMAL(12, 2),
  current_bill DECIMAL(12, 2) DEFAULT 0,
  due_day INTEGER CHECK (due_day >= 1 AND due_day <= 31),
  closing_day INTEGER CHECK (closing_day >= 1 AND closing_day <= 31),
  theme TEXT DEFAULT 'black',
  logo_url TEXT,
  
  -- Metadata
  color TEXT DEFAULT '#3247FF',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 💰 TRANSAÇÕES
-- ============================================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type transaction_type NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
  member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  
  -- Parcelamento (máximo 12 parcelas)
  installment_number INTEGER CHECK (installment_number >= 1 AND installment_number <= 12),
  total_installments INTEGER DEFAULT 1 CHECK (total_installments >= 1 AND total_installments <= 12),
  parent_transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
  
  -- Recorrência
  is_recurring BOOLEAN DEFAULT FALSE,
  recurring_transaction_id UUID REFERENCES recurring_transactions(id) ON DELETE SET NULL,
  
  -- Status
  status transaction_status DEFAULT 'COMPLETED',
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 💫 TRANSAÇÕES RECORRENTES (TEMPLATE)
-- ============================================
CREATE TABLE recurring_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type transaction_type DEFAULT 'EXPENSE',
  amount DECIMAL(12, 2) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
  member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  
  -- Configuração de recorrência
  frequency recurrence_frequency NOT NULL,
  day_of_month INTEGER CHECK (day_of_month >= 1 AND day_of_month <= 31),
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_date DATE NOT NULL,
  end_date DATE,
  
  -- Metadata
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PASSO 3: CRIAR ÍNDICES
-- ============================================

-- Family Members
CREATE INDEX idx_family_members_user_id ON family_members(user_id);

-- Categories
CREATE INDEX idx_categories_user_id_type ON categories(user_id, type);

-- Accounts
CREATE INDEX idx_accounts_user_id_type ON accounts(user_id, type);
CREATE INDEX idx_accounts_holder_id ON accounts(holder_id);

-- Transactions
CREATE INDEX idx_transactions_user_id_date ON transactions(user_id, date DESC);
CREATE INDEX idx_transactions_category_id ON transactions(category_id);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_member_id ON transactions(member_id);
CREATE INDEX idx_transactions_recurring_id ON transactions(recurring_transaction_id);
CREATE INDEX idx_transactions_parent_id ON transactions(parent_transaction_id);
CREATE INDEX idx_transactions_status ON transactions(status);

-- Recurring Transactions
CREATE INDEX idx_recurring_user_id_active ON recurring_transactions(user_id, is_active);
CREATE INDEX idx_recurring_category_id ON recurring_transactions(category_id);
CREATE INDEX idx_recurring_account_id ON recurring_transactions(account_id);

-- ============================================
-- PASSO 4: CRIAR FUNÇÕES
-- ============================================

-- ============================================
-- 📝 Função para atualizar updated_at automaticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 💰 Função para atualizar saldo da conta ao criar/atualizar/deletar transação
-- ============================================
CREATE OR REPLACE FUNCTION update_account_balance()
RETURNS TRIGGER AS $$
DECLARE
  account_type_val account_type;
  amount_change DECIMAL(12, 2);
BEGIN
  -- Determinar mudança de valor
  IF TG_OP = 'INSERT' THEN
    amount_change := NEW.amount;
    SELECT type INTO account_type_val FROM accounts WHERE id = NEW.account_id;
  ELSIF TG_OP = 'UPDATE' THEN
    amount_change := NEW.amount - OLD.amount;
    SELECT type INTO account_type_val FROM accounts WHERE id = NEW.account_id;
  ELSIF TG_OP = 'DELETE' THEN
    amount_change := -OLD.amount;
    SELECT type INTO account_type_val FROM accounts WHERE id = OLD.account_id;
  END IF;

  -- Aplicar mudança apenas para contas (CHECKING/SAVINGS)
  IF account_type_val IN ('CHECKING', 'SAVINGS') AND amount_change IS NOT NULL THEN
    IF NEW.type = 'INCOME' OR (TG_OP = 'DELETE' AND OLD.type = 'INCOME') THEN
      -- Receita aumenta o saldo
      UPDATE accounts
      SET balance = balance + ABS(amount_change)
      WHERE id = COALESCE(NEW.account_id, OLD.account_id);
    ELSIF NEW.type = 'EXPENSE' OR (TG_OP = 'DELETE' AND OLD.type = 'EXPENSE') THEN
      -- Despesa diminui o saldo
      UPDATE accounts
      SET balance = balance - ABS(amount_change)
      WHERE id = COALESCE(NEW.account_id, OLD.account_id);
    END IF;
  END IF;

  -- Para cartões de crédito, atualizar current_bill
  IF account_type_val = 'CREDIT_CARD' AND amount_change IS NOT NULL THEN
    IF NEW.type = 'EXPENSE' OR (TG_OP = 'DELETE' AND OLD.type = 'EXPENSE') THEN
      -- Despesa aumenta a fatura
      UPDATE accounts
      SET current_bill = current_bill + ABS(amount_change)
      WHERE id = COALESCE(NEW.account_id, OLD.account_id);
    ELSIF NEW.type = 'INCOME' OR (TG_OP = 'DELETE' AND OLD.type = 'INCOME') THEN
      -- Receita diminui a fatura (pagamento)
      UPDATE accounts
      SET current_bill = GREATEST(0, current_bill - ABS(amount_change))
      WHERE id = COALESCE(NEW.account_id, OLD.account_id);
    END IF;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 🔄 Função para criar usuário na tabela users ao se registrar
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ✅ Função para validar parcelamento
-- ============================================
CREATE OR REPLACE FUNCTION validate_installments()
RETURNS TRIGGER AS $$
BEGIN
  -- Validar que parcelas estão entre 1 e 12
  IF NEW.total_installments < 1 OR NEW.total_installments > 12 THEN
    RAISE EXCEPTION 'total_installments deve estar entre 1 e 12';
  END IF;

  -- Validar que transação recorrente não pode ser parcelada
  IF NEW.is_recurring = TRUE AND NEW.total_installments > 1 THEN
    RAISE EXCEPTION 'Transação recorrente não pode ser parcelada';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- PASSO 5: CONFIGURAR RLS (ROW LEVEL SECURITY)
-- ============================================

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

-- ============================================
-- PASSO 6: CRIAR TRIGGERS
-- ============================================

-- ============================================
-- 📝 Triggers para atualizar updated_at
-- ============================================
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_family_members_updated_at
  BEFORE UPDATE ON family_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at
  BEFORE UPDATE ON accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recurring_transactions_updated_at
  BEFORE UPDATE ON recurring_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 💰 Triggers para atualizar saldo/fatura da conta
-- ============================================
CREATE TRIGGER update_account_on_transaction_insert
  AFTER INSERT ON transactions
  FOR EACH ROW
  WHEN (NEW.status = 'COMPLETED')
  EXECUTE FUNCTION update_account_balance();

CREATE TRIGGER update_account_on_transaction_update
  AFTER UPDATE ON transactions
  FOR EACH ROW
  WHEN (NEW.status = 'COMPLETED' AND OLD.status = 'COMPLETED')
  EXECUTE FUNCTION update_account_balance();

CREATE TRIGGER update_account_on_transaction_delete
  AFTER DELETE ON transactions
  FOR EACH ROW
  WHEN (OLD.status = 'COMPLETED')
  EXECUTE FUNCTION update_account_balance();

-- ============================================
-- 🔄 Trigger para criar usuário ao se registrar
-- ============================================
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ✅ Trigger para validar parcelamento
-- ============================================
CREATE TRIGGER validate_transaction_installments
  BEFORE INSERT OR UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION validate_installments();

-- ============================================
-- ✅ CONCLUÍDO!
-- ============================================
-- Após executar este script:
-- 1. Configure os Storage Buckets no Dashboard (Storage > New Bucket)
-- 2. Configure as variáveis de ambiente no projeto (.env.local)
-- 3. Teste a autenticação e operações CRUD
