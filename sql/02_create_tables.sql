-- ============================================
-- 📊 TABELAS - Money Up Dashboard
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
