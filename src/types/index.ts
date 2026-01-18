// ============================================
// 📝 TYPES - Money Up Dashboard
// ============================================
// Tipos TypeScript baseados no schema Prisma/Supabase

// ============================================
// 🔧 ENUMS
// ============================================

export type TransactionType = 'INCOME' | 'EXPENSE'

export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD'

export type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'

export type TransactionStatus = 'PENDING' | 'COMPLETED'

// ============================================
// 👤 USUÁRIOS
// ============================================

export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string | null
  created_at: string
  updated_at: string
}

export interface UserInsert {
  email: string
  name: string
  avatar_url?: string | null
}

export interface UserUpdate {
  email?: string
  name?: string
  avatar_url?: string | null
}

// ============================================
// 👨‍👩‍👧‍👦 MEMBROS DA FAMÍLIA
// ============================================

export interface FamilyMember {
  id: string
  user_id: string
  name: string
  role: string // "Pai", "Mãe", "Filho", etc
  avatar_url?: string | null
  monthly_income: number
  color: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface FamilyMemberInsert {
  user_id: string
  name: string
  role: string
  avatar_url?: string | null
  monthly_income?: number
  color?: string
  is_active?: boolean
}

export interface FamilyMemberUpdate {
  name?: string
  role?: string
  avatar_url?: string | null
  monthly_income?: number
  color?: string
  is_active?: boolean
}

// ============================================
// 🏷️ CATEGORIAS
// ============================================

export interface Category {
  id: string
  user_id: string
  name: string
  icon: string
  type: TransactionType
  color: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CategoryInsert {
  user_id: string
  name: string
  icon?: string
  type: TransactionType
  color?: string
  is_active?: boolean
}

export interface CategoryUpdate {
  name?: string
  icon?: string
  type?: TransactionType
  color?: string
  is_active?: boolean
}

// ============================================
// 💳 CONTAS E CARTÕES (UNIFICADO)
// ============================================

export interface Account {
  id: string
  user_id: string
  type: AccountType
  name: string
  bank: string
  last_digits?: string | null
  holder_id: string
  
  // Campos para Conta Corrente e Poupança
  balance: number
  
  // Campos para Cartão de Crédito
  credit_limit?: number | null
  current_bill: number
  due_day?: number | null
  closing_day?: number | null
  theme?: string | null
  logo_url?: string | null
  
  // Metadata
  color: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AccountInsert {
  user_id: string
  type: AccountType
  name: string
  bank: string
  last_digits?: string | null
  holder_id: string
  
  // Campos para Conta Corrente e Poupança
  balance?: number
  
  // Campos para Cartão de Crédito
  credit_limit?: number | null
  current_bill?: number
  due_day?: number | null
  closing_day?: number | null
  theme?: string | null
  logo_url?: string | null
  
  // Metadata
  color?: string
  is_active?: boolean
}

export interface AccountUpdate {
  type?: AccountType
  name?: string
  bank?: string
  last_digits?: string | null
  holder_id?: string
  balance?: number
  credit_limit?: number | null
  current_bill?: number
  due_day?: number | null
  closing_day?: number | null
  theme?: string | null
  logo_url?: string | null
  color?: string
  is_active?: boolean
}

// ============================================
// 💰 TRANSAÇÕES
// ============================================

export interface Transaction {
  id: string
  user_id: string
  type: TransactionType
  amount: number
  description: string
  date: string // DATE format
  category_id?: string | null
  account_id?: string | null
  member_id?: string | null
  
  // Parcelamento
  installment_number?: number | null
  total_installments: number
  parent_transaction_id?: string | null
  
  // Recorrência
  is_recurring: boolean
  recurring_transaction_id?: string | null
  
  // Status
  status: TransactionStatus
  notes?: string | null
  
  // Metadata
  created_at: string
  updated_at: string
}

export interface TransactionInsert {
  user_id: string
  type: TransactionType
  amount: number
  description: string
  date: string
  category_id?: string | null
  account_id?: string | null
  member_id?: string | null
  installment_number?: number | null
  total_installments?: number
  parent_transaction_id?: string | null
  is_recurring?: boolean
  recurring_transaction_id?: string | null
  status?: TransactionStatus
  notes?: string | null
}

export interface TransactionUpdate {
  type?: TransactionType
  amount?: number
  description?: string
  date?: string
  category_id?: string | null
  account_id?: string | null
  member_id?: string | null
  installment_number?: number | null
  total_installments?: number
  parent_transaction_id?: string | null
  is_recurring?: boolean
  recurring_transaction_id?: string | null
  status?: TransactionStatus
  notes?: string | null
}

// ============================================
// 💫 TRANSAÇÕES RECORRENTES (TEMPLATE)
// ============================================

export interface RecurringTransaction {
  id: string
  user_id: string
  type: TransactionType
  amount: number
  description: string
  category_id?: string | null
  account_id?: string | null
  member_id?: string | null
  
  // Configuração de recorrência
  frequency: RecurrenceFrequency
  day_of_month?: number | null
  day_of_week?: number | null
  start_date: string // DATE format
  end_date?: string | null // DATE format
  
  // Metadata
  is_active: boolean
  notes?: string | null
  created_at: string
  updated_at: string
}

export interface RecurringTransactionInsert {
  user_id: string
  type?: TransactionType
  amount: number
  description: string
  category_id?: string | null
  account_id?: string | null
  member_id?: string | null
  frequency: RecurrenceFrequency
  day_of_month?: number | null
  day_of_week?: number | null
  start_date: string
  end_date?: string | null
  is_active?: boolean
  notes?: string | null
}

export interface RecurringTransactionUpdate {
  type?: TransactionType
  amount?: number
  description?: string
  category_id?: string | null
  account_id?: string | null
  member_id?: string | null
  frequency?: RecurrenceFrequency
  day_of_month?: number | null
  day_of_week?: number | null
  start_date?: string
  end_date?: string | null
  is_active?: boolean
  notes?: string | null
}

// ============================================
// 🔄 TIPOS AUXILIARES
// ============================================

// Para compatibilidade com código existente (será migrado gradualmente)
export interface Card {
  id: string
  name: string
  number?: string // last_digits do Account
  brand?: string
  limit: number // credit_limit do Account
  availableLimit: number // credit_limit - current_bill
  isActive: boolean // is_active do Account
  dueDate?: string // due_day do Account formatado
  createdAt: string
}

// Tipos para resposta do Supabase
export type Database = {
  public: {
    Tables: {
      users: { Row: User; Insert: UserInsert; Update: UserUpdate }
      family_members: { Row: FamilyMember; Insert: FamilyMemberInsert; Update: FamilyMemberUpdate }
      categories: { Row: Category; Insert: CategoryInsert; Update: CategoryUpdate }
      accounts: { Row: Account; Insert: AccountInsert; Update: AccountUpdate }
      transactions: { Row: Transaction; Insert: TransactionInsert; Update: TransactionUpdate }
      recurring_transactions: { Row: RecurringTransaction; Insert: RecurringTransactionInsert; Update: RecurringTransactionUpdate }
    }
  }
}
