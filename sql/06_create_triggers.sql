-- ============================================
-- ⚡ TRIGGERS - Money Up Dashboard
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
