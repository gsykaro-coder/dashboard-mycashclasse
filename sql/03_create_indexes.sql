-- ============================================
-- 🔍 ÍNDICES - Money Up Dashboard
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
