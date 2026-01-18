# 🏗️ Arquitetura Proposta — mycash+ Dashboard

## 📁 Estrutura de Pastas Detalhada

```
mycash-plus/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── SidebarItem.tsx
│   │   │   │   └── SidebarToggle.tsx
│   │   │   ├── HeaderMobile/
│   │   │   │   ├── HeaderMobile.tsx
│   │   │   │   └── MobileDrawer.tsx
│   │   │   └── Layout.tsx
│   │   ├── dashboard/
│   │   │   ├── SummaryCards/
│   │   │   │   ├── SummaryCards.tsx
│   │   │   │   └── SummaryCard.tsx
│   │   │   ├── Charts/
│   │   │   │   ├── Charts.tsx
│   │   │   │   └── Chart.tsx
│   │   │   └── RecentTransactions/
│   │   │       ├── RecentTransactions.tsx
│   │   │       └── RecentTransactionItem.tsx
│   │   ├── cards/
│   │   │   ├── CardList/
│   │   │   │   └── CardList.tsx
│   │   │   └── CardItem/
│   │   │       └── CardItem.tsx
│   │   ├── transactions/
│   │   │   ├── TransactionList/
│   │   │   │   └── TransactionList.tsx
│   │   │   ├── TransactionItem/
│   │   │   │   └── TransactionItem.tsx
│   │   │   └── TransactionFilters/
│   │   │       └── TransactionFilters.tsx
│   │   ├── profile/
│   │   │   └── ProfileForm/
│   │   │       └── ProfileForm.tsx
│   │   └── shared/
│   │       ├── Button/
│   │       │   └── Button.tsx
│   │       ├── Card/
│   │       │   └── Card.tsx
│   │       ├── Input/
│   │       │   └── Input.tsx
│   │       ├── Modal/
│   │       │   └── Modal.tsx
│   │       └── Badge/
│   │           └── Badge.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Cards.tsx
│   │   ├── Transactions.tsx
│   │   └── Profile.tsx
│   ├── hooks/
│   │   ├── useSidebar.ts
│   │   ├── useTransactions.ts
│   │   └── useCards.ts
│   ├── services/
│   │   └── supabase.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   └── globals.css
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .env.local
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── DOCUMENTATION.md
├── tokens-reference.md
└── arquitetura.md
```

---

## 🎯 Hierarquia de Componentes

### Estrutura de Componentes

```
App
└── Router
    └── Layout
        ├── Sidebar (condicional: ≥1280px)
        │   ├── Logo
        │   ├── SidebarItem (Dashboard)
        │   ├── SidebarItem (Cartões)
        │   ├── SidebarItem (Transações)
        │   ├── SidebarItem (Perfil)
        │   └── SidebarToggle
        │
        ├── HeaderMobile (condicional: <1280px)
        │   ├── MenuButton
        │   ├── PageTitle
        │   └── ActionButton
        │
        └── Main Content
            └── Routes
                ├── /dashboard → Dashboard Page
                │   ├── SummaryCards
                │   │   └── SummaryCard (×4)
                │   ├── Charts
                │   │   └── Chart (×2)
                │   └── RecentTransactions
                │       └── RecentTransactionItem (×N)
                │
                ├── /cards → Cards Page
                │   └── CardList
                │       └── CardItem (×N)
                │
                ├── /transactions → Transactions Page
                │   ├── TransactionFilters
                │   └── TransactionList
                │       └── TransactionItem (×N)
                │
                └── /profile → Profile Page
                    └── ProfileForm
```

---

## 🧩 Estratégia de Componentização

### 1. Atomic Design (Base)

#### Atoms (Componentes Atômicos)
- `Button` — Botão reutilizável com variantes
- `Input` — Input de formulário
- `Badge` — Badge/tag para status
- `Icon` — Ícone reutilizável
- `Avatar` — Avatar de usuário

#### Molecules (Componentes Moleculares)
- `SearchInput` — Input com ícone de busca
- `FilterDropdown` — Dropdown de filtros
- `Card` — Container de card base
- `FormField` — Campo de formulário com label e error

#### Organisms (Componentes Complexos)
- `Sidebar` — Barra lateral de navegação
- `HeaderMobile` — Header mobile com menu
- `SummaryCards` — Grid de cards de resumo
- `TransactionList` — Lista de transações
- `CardList` — Lista de cartões

#### Templates (Layouts)
- `DashboardLayout` — Layout específico do dashboard
- `PageLayout` — Layout padrão de páginas

#### Pages (Páginas)
- `Dashboard` — Página principal
- `Cards` — Página de cartões
- `Transactions` — Página de transações
- `Profile` — Página de perfil

### 2. Organização por Feature

**Componentes Específicos de Feature:**
- `components/dashboard/` — Componentes específicos do dashboard
- `components/cards/` — Componentes específicos de cartões
- `components/transactions/` — Componentes específicos de transações
- `components/profile/` — Componentes específicos de perfil

**Componentes Compartilhados:**
- `components/shared/` — Componentes reutilizáveis entre features
- `components/layout/` — Componentes de layout (Sidebar, HeaderMobile)

### 3. Separação de Responsabilidades

#### Componentes (Apresentação)
- **Responsabilidade:** Renderização visual
- **Localização:** `src/components/`
- **Regra:** Sem lógica de negócio, apenas props e eventos

#### Hooks (Lógica Reutilizável)
- **Responsabilidade:** Lógica de estado e efeitos reutilizáveis
- **Localização:** `src/hooks/`
- **Exemplos:**
  - `useSidebar` — Gerencia estado da sidebar (expandido/colapsado)
  - `useTransactions` — Gerencia estado e operações de transações
  - `useCards` — Gerencia estado e operações de cartões

#### Services (Comunicação com API)
- **Responsabilidade:** Comunicação com backend (Supabase)
- **Localização:** `src/services/`
- **Exemplo:**
  - `supabase.ts` — Cliente Supabase e funções de API

#### Types (Definições TypeScript)
- **Responsabilidade:** Definições de tipos e interfaces
- **Localização:** `src/types/`
- **Exemplo:**
  - `index.ts` — Exportações centralizadas de tipos

---

## 🎨 Sistema de Design Tokens

### Estrutura de Tokens CSS

```css
/* src/styles/tokens.css */

:root {
  /* Variáveis Semânticas (Prioridade 1) */
  --color-primary: var(--lime-500);
  --color-secondary: var(--gray-600);
  --color-bg: var(--gray-50);
  --color-surface: var(--gray-0);
  --spacing-container: var(--spacing-lg);
  
  /* Variáveis Primitivas (Prioridade 2) */
  --gray-50: #FAFAFA;
  --gray-100: #F5F5F5;
  --lime-500: #84CC16;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
}
```

---

## 📱 Responsividade

### Breakpoints

| Breakpoint | Largura | Descrição |
|---|---|---|
| Mobile (base) | < 768px | Mobile pequeno até tablet |
| Tablet | ≥ 768px e < 1280px | Tablet portrait/landscape |
| Desktop | ≥ 1280px e < 1920px | Laptop/desktop padrão |
| Wide / 4K | ≥ 1920px | Monitores grandes |

### Padding Responsivo

| Breakpoint | Padding | Valor |
|---|---|---|
| Mobile | `px-4` | 16px |
| Tablet | `px-6` | 24px |
| Desktop | `px-8` | 32px |

### Max-width

| Breakpoint | Max-width | Justificativa |
|---|---|---|
| Desktop | `1400px` | Evita linhas longas demais |
| Wide / 4K | `1600px` | Mantém legibilidade |

### Grids Responsivos

**Mobile (< 768px):**
- 1 coluna
- Cards empilhados verticalmente

**Tablet (≥ 768px e < 1280px):**
- 2 colunas quando fizer sentido
- Grid adaptável

**Desktop (≥ 1280px):**
- 3 ou 4 colunas dependendo do componente
- Grids auto-fit / auto-fill

---

## 🚀 Stack Tecnológica

### Frontend
- **React 18+** — Biblioteca UI
- **TypeScript** — Tipagem estática
- **Vite** — Build tool e dev server
- **Tailwind CSS** — Framework CSS utilitário

### Backend
- **Supabase** — Backend-as-a-Service
  - Banco de dados PostgreSQL
  - Autenticação
  - Storage
  - Real-time subscriptions

### Roteamento
- **React Router** — Roteamento client-side (sugestão)

---

## 📝 Convenções de Nomenclatura

### Componentes
- **PascalCase:** `SummaryCard.tsx`, `TransactionList.tsx`
- **Um componente por arquivo**
- **Nome do arquivo = Nome do componente**

### Hooks
- **camelCase com prefixo `use`:** `useSidebar.ts`, `useTransactions.ts`

### Services
- **camelCase:** `supabase.ts`, `api.ts`

### Types/Interfaces
- **PascalCase:** `Transaction`, `Card`, `User`

### Estilos
- **kebab-case:** `tokens.css`, `globals.css`
- **Variáveis CSS:** `--color-primary` (kebab-case)

---

## ✅ Checklist de Validação

- [x] Estrutura de pastas definida
- [x] Hierarquia de componentes documentada
- [x] Estratégia de componentização explicada
- [x] Separação de responsabilidades definida
- [x] Responsividade documentada
- [x] Convenções de nomenclatura definidas
- [ ] Tokens CSS mapeados (aguardando análise Figma)
- [ ] Componentes validados com design real

---

**Última atualização:** 2025-01-XX  
**Versão:** 0.1.0 (Arquitetura inicial)