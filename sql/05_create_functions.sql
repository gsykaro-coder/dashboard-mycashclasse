-- ============================================
-- 🔧 FUNÇÕES - Money Up Dashboard
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
