// Types para o projeto mycash+

export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  createdAt: string
}

export interface Card {
  id: string
  name: string
  number: string
  brand: string
  limit: number
  availableLimit: number
  isActive: boolean
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}
