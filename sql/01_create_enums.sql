-- ============================================
-- 🔧 ENUMS - Money Up Dashboard
-- ============================================

-- Transaction Type (Receita ou Despesa)
CREATE TYPE transaction_type AS ENUM ('INCOME', 'EXPENSE');

-- Account Type (Conta Corrente, Poupança ou Cartão de Crédito)
CREATE TYPE account_type AS ENUM ('CHECKING', 'SAVINGS', 'CREDIT_CARD');

-- Recurrence Frequency (Diária, Semanal, Mensal, Anual)
CREATE TYPE recurrence_frequency AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- Transaction Status (Pendente ou Concluído)
CREATE TYPE transaction_status AS ENUM ('PENDING', 'COMPLETED');
