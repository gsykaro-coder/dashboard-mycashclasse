# mycash+ — Documentação

## 📊 Progresso do Projeto

- [x] PROMPT 0: Análise e Planejamento Inicial
- [x] PROMPT 1: Estrutura Base do Projeto
- [x] PROMPT 2: Layout Desktop e Sidebar
- [x] PROMPT 3: Header Mobile e Navegação
- [x] PROMPT 4: Dashboard - Cards e Gráficos
- [x] PROMPT 5: Dashboard - Lista de Transações Recentes
- [x] PROMPT 6: Página de Cartões
- [ ] PROMPT 7: Página de Transações
- [ ] PROMPT 8: Página de Perfil

---

## 📋 PROMPT 0: Análise e Planejamento Inicial

**Status:** ✅ Concluído | **Data:** 2025-01-18 | **Build:** ✅ Sucesso

### Resumo
- Arquitetura proposta definida
- Estrutura de pastas criada
- Documentação inicial criada
- Breakpoints e responsividade documentados

---

## 📋 PROMPT 1: Estrutura Base do Projeto

**Status:** ✅ Concluído | **Data:** 2025-01-18 | **Build:** ✅ Sucesso (2 tentativas) | **Commit:** `5cd6726`

### Implementado
- Projeto Vite + React + TypeScript inicializado
- Tailwind CSS configurado com breakpoints corretos
- Estrutura de pastas criada conforme arquitetura
- Arquivo `tokens.css` criado com variáveis do design system
- TypeScript configurado sem erros
- Dependências instaladas (React, React Router, Supabase)
- Build executado com sucesso

### Tokens Configurados
**Semânticas:**
- `--color-primary`: `var(--lime-500)`
- `--color-bg`: `var(--gray-50)`
- `--color-surface`: `#FFFFFF`
- `--spacing-container`: `var(--spacing-lg)`
- `--spacing-page-mobile`: `16px`
- `--spacing-page-tablet`: `24px`
- `--spacing-page-desktop`: `32px`

**Primitivas:**
- Escala completa de `--gray-*` (50-900)
- Escala completa de `--lime-*` (50-900)
- Escala de espaçamentos (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`)

### Arquivos Criados
- `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`
- `src/styles/tokens.css`, `src/styles/globals.css`
- `src/main.tsx`, `src/App.tsx`
- Estrutura completa de pastas

---

## 📋 PROMPT 2: Layout Desktop e Sidebar

**Status:** ✅ Concluído | **Data:** 2025-01-18 | **Build:** ✅ Sucesso | **Commit:** `5cd6726`

### Implementado
- Layout principal com sidebar + main content
- Sidebar com estados expandido/colapsado funcionais
- Toggle button para expand/collapse
- Navegação entre seções (Dashboard, Cartões, Transações, Perfil)
- Sidebar renderiza apenas em desktop (≥1280px)
- Main content ajusta automaticamente ao estado da sidebar
- Layout 100% fluido (`width: 100%`)
- Padding responsivo aplicado corretamente
- Max-width aplicado corretamente

### Tokens Utilizados
**Semânticas:**
- `--color-bg`: Background principal
- `--color-surface`: Background de cards e sidebar
- `--color-primary`: Cor primária (lime)
- `--border-color`: Bordas

**Primitivas:**
- `--gray-50`, `--gray-100`, `--gray-200`, `--gray-700`, `--gray-900`
- `--lime-100`, `--lime-500`, `--lime-700`

### Arquivos Criados
- `src/components/layout/Layout.tsx`
- `src/components/layout/Sidebar/Sidebar.tsx`
- `src/components/layout/Sidebar/SidebarItem.tsx`
- `src/components/layout/Sidebar/SidebarToggle.tsx`

---

## 📋 PROMPT 3: Header Mobile e Navegação

**Status:** ✅ Concluído | **Data:** 2025-01-18 | **Build:** ✅ Sucesso | **Commit:** `5cd6726`

### Implementado
- Header Mobile renderiza apenas em <1280px
- Drawer de navegação mobile funcional
- Menu hambúrguer abre/fecha drawer
- Overlay escuro ao abrir drawer
- Navegação entre seções no drawer
- Header Mobile substitui Sidebar em mobile/tablet
- Transições suaves

### Arquivos Criados
- `src/components/layout/HeaderMobile/HeaderMobile.tsx`
- `src/components/layout/HeaderMobile/MobileDrawer.tsx`

---

### 🎯 Objetivo
Realizar análise completa do projeto Figma para mapear componentes, variáveis, tokens e estrutura de navegação.

---

## 🔍 ANÁLISE DO FIGMA

### 🔗 Link do Design
**URL do Figma:** https://www.figma.com/design/aqjgfoSQkommtYMemR1Ac9/Workshop---Do-figma-MCP-ao-Cursor-AI-v.2--Community-?node-id=2166-708&m=dev

**Informações extraídas:**
- File Key: `aqjgfoSQkommtYMemR1Ac9`
- Node ID: `2166-708` (Dashboard frame)
- Nome do arquivo: `Workshop---Do-figma-MCP-ao-Cursor-AI-v.2--Community-`
- Modo: Dev Mode (`&m=dev`)

**Status:** 🔄 Acessando via Figma MCP...

### 📱 Telas Identificadas

#### 1. Dashboard (Frame: 2166-708)
- **Objetivo:** Tela principal com visão geral financeira
- **Status:** 🔄 Aguardando análise via MCP
- **Componentes esperados:**
  - Cards de resumo (saldo, receitas, despesas, total)
  - Gráficos/visualizações (linha, pizza, barras)
  - Lista de transações recentes
  - Filtros de período (dia, semana, mês, ano)
  - Botões de ação rápida

#### 2. Cartões
- **Objetivo:** Gerenciar cartões cadastrados
- **Componentes esperados:**
  - Lista de cartões cadastrados
  - Card de cartão individual (número, bandeira, limite)
  - Modal de criação/edição de cartão
  - Toggle de cartão ativo/inativo
  - Botão de adicionar novo cartão

#### 3. Transações
- **Objetivo:** Visualizar e gerenciar transações
- **Componentes esperados:**
  - Lista de transações com filtros
  - Card de transação (categoria, valor, data, tipo)
  - Filtros avançados (categoria, tipo, período)
  - Formulário de criação/edição de transação
  - Paginação ou scroll infinito

#### 4. Perfil
- **Objetivo:** Configurações do usuário
- **Componentes esperados:**
  - Formulário de dados pessoais
  - Avatar/foto de perfil
  - Configurações de conta
  - Preferências (tema, notificações, moeda)
  - Botão de logout

---

## 🎨 DESIGN SYSTEM — Tokens e Variáveis

### ⚠️ Hierarquia de Variáveis (CRÍTICO)

**Ordem obrigatória ao converter estilos do Figma:**

1. **Variável SEMÂNTICA** aplicada? → Usar diretamente
2. **Variável PRIMITIVA** aplicada? → Usar diretamente  
3. **Valor local** (hex, px, etc)? → Conversão inteligente
4. **NUNCA** usar hardcoded

---

## 🧭 Estrutura de Navegação

### Desktop (≥1280px)

#### Sidebar
- **Estado padrão:** Expanded (larga, com texto)
- **Estado alternativo:** Collapsed (estreita, apenas ícones)
- **Funcionalidades:**
  - Logo/marca no topo
  - Menu de navegação (Dashboard, Cartões, Transações, Perfil)
  - Botão de toggle expand/collapse
  - Indicador de página ativa
- **Comportamento:** Empurra conteúdo (não sobrepõe)

#### Main Content
- **Padding responsivo:** `px-8` (32px) desktop
- **Max-width:** `1400px` (desktop), `1600px` (wide)
- **Width:** `100%` (fluido)

### Mobile/Tablet (<1280px)

#### Header Mobile
- **Renderiza apenas em:** <1280px
- **Componentes:**
  - Botão de menu (hambúrguer) - abre drawer
  - Título da página atual
  - Ações principais (ex: botão nova transação)
- **Comportamento:** Substitui completamente a sidebar

#### Drawer de Navegação
- **Abre/fecha:** Via botão de menu no header
- **Conteúdo:** Mesmo menu da sidebar desktop
- **Overlay:** Fundo escuro semi-transparente
- **Comportamento:** Sobreposição (overlay)

---

## 📐 Breakpoints e Responsividade

### Breakpoints Oficiais

| Breakpoint | Largura | Descrição |
|---|---|---|
| Mobile (base) | < 768px | Mobile pequeno até tablet |
| Tablet | ≥ 768px e < 1280px | Tablet portrait/landscape |
| Desktop | ≥ 1280px e < 1920px | Laptop/desktop padrão |
| Wide / 4K | ≥ 1920px | Monitores grandes |

### Tailwind Config
```javascript
screens: {
  'md': '768px',   // Tablet
  'lg': '1280px',  // Desktop
  'xl': '1920px',  // Wide / 4K
}
```

### Padding Responsivo

| Breakpoint | Padding | Valor |
|---|---|---|
| Mobile | `px-4` | 16px |
| Tablet | `px-6` | 24px |
| Desktop | `px-8` | 32px |

---

## 🏗️ Arquitetura Proposta

### Estrutura de Pastas

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
│   │   │   │   └── SummaryCard.tsx
│   │   │   ├── Charts/
│   │   │   │   └── Chart.tsx
│   │   │   └── RecentTransactions/
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
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── DOCUMENTATION.md
```

### Hierarquia de Componentes

```
App
└── Layout
    ├── Sidebar (condicional: ≥1280px)
    │   ├── Logo
    │   ├── SidebarItem (Dashboard)
    │   ├── SidebarItem (Cartões)
    │   ├── SidebarItem (Transações)
    │   ├── SidebarItem (Perfil)
    │   └── SidebarToggle
    ├── HeaderMobile (condicional: <1280px)
    │   ├── MenuButton
    │   ├── PageTitle
    │   └── ActionButton
    └── Main Content
        └── Router
            ├── Dashboard Page
            │   ├── SummaryCards
            │   ├── Charts
            │   └── RecentTransactions
            ├── Cards Page
            │   └── CardList
            ├── Transactions Page
            │   ├── TransactionFilters
            │   └── TransactionList
            └── Profile Page
                └── ProfileForm
```

### Estratégia de Componentização

1. **Atomic Design** (base)
   - **Atoms:** Button, Input, Icon, Badge
   - **Molecules:** SearchInput, FilterDropdown, Card
   - **Organisms:** SummaryCards, TransactionList, Sidebar
   - **Templates:** DashboardLayout, PageLayout
   - **Pages:** Dashboard, Cards, Transactions, Profile

2. **Organização por Feature**
   - Componentes específicos de feature em `components/dashboard/`, `components/cards/`, etc.
   - Componentes compartilhados em `components/shared/`

3. **Separação de Responsabilidades**
   - **Componentes:** Apenas apresentação
   - **Hooks:** Lógica reutilizável e estado
   - **Services:** Comunicação com API (Supabase)
   - **Types:** Definições TypeScript

---

## 📝 Notas Importantes

### Regras Críticas

1. **Layout 100% fluido:** Containers principais sempre `width: 100%`
2. **Mobile-first:** Design base sempre para mobile
3. **Nunca overflow horizontal:** Proibido em qualquer resolução
4. **Sidebar condicional:** Não renderiza em <1280px
5. **Hierarquia de variáveis:** Semântica → Primitiva → Conversão → Nunca hardcoded

### ⚠️ Análise via MCP

Para completar a análise do design do Figma via MCP, precisamos usar as ferramentas do Figma MCP:

1. **get_design_context** — Obter contexto do design do frame selecionado
2. **get_variable_defs** — Extrair variáveis e tokens do design
3. **get_metadata** — Obter metadados XML da estrutura
4. **get_screenshot** — Screenshot do frame (opcional)

**Próximos passos:**
- Usar o link fornecido para acessar o frame via MCP
- Extrair componentes, variáveis e estrutura
- Documentar tokens encontrados
- Validar arquitetura proposta

---

**Última atualização:** 2025-01-18  
**Versão:** 0.2.0 (PROMPT 4 concluído)

---

## 📋 PROMPT 4: Dashboard - Cards e Gráficos

**Status:** ✅ Concluído | **Data:** 2025-01-18 | **Build:** ✅ Sucesso (1 tentativa)

### Implementado
- Componente `SummaryCard` reutilizável com variantes (default, primary, success, error)
- Componente `SummaryCards` que compõe 4 cards de resumo
- Componente `Chart` reutilizável para gráficos
- Componente `Charts` que compõe grid de gráficos
- Componente `Card` compartilhado para containers
- Formatação de moeda (R$ brasileiro)
- Indicadores de tendência nos cards
- Layout responsivo: 1 coluna (mobile), 2 colunas (tablet), 4 colunas (desktop)
- Grid de gráficos: 1 coluna (mobile/tablet), 2 colunas (desktop)

### Tokens Utilizados
**Semânticas:**
- `--color-surface`: `#FFFFFF` (background dos cards)
- `--border-color`: `var(--gray-200)` (bordas dos cards)
- `--color-text`: `var(--gray-900)` (texto principal)
- `--color-text-secondary`: `var(--gray-600)` (texto secundário)

**Primitivas:**
- `--gray-200`: Bordas dos cards
- `--gray-600`: Texto secundário e labels
- `--gray-900`: Texto principal
- `--lime-600`: Cor primária (saldo)
- `--green-600`: Cor de sucesso (receitas)
- `--red-600`: Cor de erro (despesas)

**Conversões:**
- Nenhuma (todos valores via tokens)

### Arquivos Criados/Modificados
- `src/components/shared/Card/Card.tsx`
- `src/components/dashboard/SummaryCards/SummaryCard.tsx`
- `src/components/dashboard/SummaryCards/SummaryCards.tsx`
- `src/components/dashboard/Charts/Chart.tsx`
- `src/components/dashboard/Charts/Charts.tsx`
- `src/pages/Dashboard.tsx` (modificado)

---

## 📋 PROMPT 5: Dashboard - Lista de Transações Recentes

**Status:** ✅ Concluído | **Data:** 2025-01-18 | **Build:** ✅ Sucesso (1 tentativa)

### Implementado
- Componente `RecentTransactionItem` para exibir transação individual
- Componente `RecentTransactions` com lista de até 5 transações recentes
- Formatação de moeda brasileira (R$)
- Formatação de data (dia e mês)
- Indicadores visuais por tipo (receita/despesa)
- Estados de loading e empty
- Link "Ver todas" para página de transações
- Layout responsivo com hover states
- Integração com Dashboard (grid lado a lado com gráficos)

### Tokens Utilizados
**Semânticas:**
- `--color-surface`: `#FFFFFF` (background do card)
- `--border-color`: `var(--gray-200)` (bordas)
- `--color-text`: `var(--gray-900)` (texto principal)
- `--color-text-secondary`: `var(--gray-600)` (texto secundário)

**Primitivas:**
- `--gray-50`: Background hover e estados
- `--gray-100`: Divisores entre itens
- `--gray-200`: Bordas
- `--gray-500`: Texto secundário
- `--gray-900`: Texto principal
- `--green-600`: Cor para receitas
- `--red-600`: Cor para despesas
- `--lime-600`: Cor do link "Ver todas"

**Conversões:**
- Nenhuma (todos valores via tokens)

### Arquivos Criados/Modificados
- `src/components/dashboard/RecentTransactions/RecentTransactionItem.tsx`
- `src/components/dashboard/RecentTransactions/RecentTransactions.tsx`
- `src/pages/Dashboard.tsx` (modificado - integração)

---

## 📋 PROMPT 6: Página de Cartões

**Status:** ✅ Concluído | **Data:** 2025-01-18 | **Build:** ✅ Sucesso (1 tentativa)

### Implementado
- Componente `CardItem` para exibir cartão individual
- Componente `CardList` com grid responsivo de cartões
- Máscara de número do cartão (últimos 4 dígitos visíveis)
- Indicadores visuais de status (Ativo/Inativo)
- Barra de progresso para limite disponível
- Estados de loading e empty
- Botão "Adicionar Cartão" no header
- Layout responsivo: 1 col (mobile), 2 cols (tablet), 3 cols (desktop)
- Formatação de moeda brasileira (R$)

### Tokens Utilizados
**Semânticas:**
- `--color-surface`: `#FFFFFF` (background dos cards)
- `--border-color`: `var(--gray-200)` (bordas)
- `--color-primary`: `var(--lime-600)` (botão e progresso)
- `--color-text`: `var(--gray-900)` (texto principal)

**Primitivas:**
- `--gray-50`, `--gray-100`, `--gray-200`, `--gray-500`, `--gray-600`, `--gray-900`
- `--green-100`, `--green-700` (status ativo)
- `--lime-500`, `--lime-600`, `--lime-700` (cor primária)

**Conversões:**
- Nenhuma (todos valores via tokens)

### Arquivos Criados/Modificados
- `src/components/cards/CardItem/CardItem.tsx`
- `src/components/cards/CardList/CardList.tsx`
- `src/pages/Cards.tsx` (modificado)