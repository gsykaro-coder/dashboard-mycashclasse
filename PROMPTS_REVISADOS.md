# 📋 Sequência de Prompts Revisados — mycash+ Dashboard

## 🎯 Visão Geral

Esta sequência de prompts foi revisada e aprimorada com:
- ✅ Critérios de aceitação explícitos
- ✅ Entregáveis definidos
- ✅ Checkpoints de revisão
- ✅ Documentação de conversões padronizada
- ✅ Hierarquia de variáveis clarificada

---

## 📋 PROMPT 0: Análise e Planejamento Inicial

### 🎯 OBJETIVO
Antes de começar a implementação, realizar uma análise completa do projeto Figma para mapear componentes, variáveis, tokens e estrutura de navegação.

### 📚 PRÉ-EXECUÇÃO OBRIGATÓRIA
1. Reler Rules + Documentação
2. Consultar Figma via MCP (layout + variáveis)
3. Identificar hierarquia de variáveis (semântica → primitiva → conversão)

### 🔍 TAREFAS

**Primeiro:** Acessar o design do mycash+ via Figma MCP e identificar:
- ✅ Todos os componentes visuais presentes nas telas:
  - Dashboard (cards, gráficos, listas, filtros)
  - Cartões (lista, card individual, modais)
  - Transações (lista, filtros, formulários)
  - Perfil (formulários, avatar, configurações)
- ✅ Mapear hierarquia visual e relação entre componentes
- ✅ Identificar componentes reutilizáveis vs específicos

**Segundo:** Identificar todas as variables e tokens:
- ✅ **Variáveis SEMÂNTICAS** (prioridade 1):
  - Cores: `--color-primary`, `--color-secondary`, `--color-success`, `--color-error`, etc.
  - Espaçamentos: `--spacing-container`, `--spacing-section`, `--spacing-card`
  - Tipografia: `--font-*`, `--text-*`
- ✅ **Variáveis PRIMITIVAS** (prioridade 2):
  - Cores: `--gray-*`, `--lime-*`, outras paletas
  - Espaçamentos: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, etc.
  - Tipografia: pesos, tamanhos base
- ✅ Documentar TODOS os tokens encontrados em tabela estruturada

**Terceiro:** Analisar estrutura de navegação:
- ✅ Sidebar desktop: estados expandido/colapsado
- ✅ Header mobile: comportamento e transições
- ✅ Navegação entre seções (Dashboard, Cartões, Transações, Perfil)
- ✅ Drawer/modal de navegação mobile

**Quarto:** Apresentar arquitetura proposta:
- ✅ Estrutura de pastas detalhada
- ✅ Hierarquia de componentes
- ✅ Estratégia de componentização
- ✅ Organização de hooks, services e types

### 📦 ENTREGÁVEIS OBRIGATÓRIOS

1. **DOCUMENTATION.md** criado com:
   - Lista completa de componentes identificados
   - Mapa de variáveis/tokens do design system
   - Diagrama de arquitetura de pastas
   - Estrutura de navegação documentada
   - Breakpoints e responsividade definidos

2. **tokens-reference.md** criado com:
   - Todas as variáveis semânticas mapeadas
   - Todas as variáveis primitivas mapeadas
   - Tabela de conversões iniciais (se houver valores hardcoded no Figma)
   - Formato padronizado:
     ```markdown
     | Valor Original (Figma) | Token Escolhido | Justificativa | Aplicado em |
     |---|---|---|---|
     | #E5E5E5 | --gray-200 | Primitiva mais próxima | Border do Card |
     ```

3. **arquitetura.md** criado com:
   - Estrutura de pastas completa
   - Diagrama de hierarquia de componentes
   - Estratégia de componentização explicada

### ✅ CRITÉRIOS DE ACEITAÇÃO

- [ ] DOCUMENTATION.md existe e está completo
- [ ] tokens-reference.md existe com todas as variáveis documentadas
- [ ] Todas as 4 telas principais foram analisadas (Dashboard, Cartões, Transações, Perfil)
- [ ] Todas as variáveis do Figma foram documentadas (semânticas + primitivas)
- [ ] Arquitetura de pastas está definida e justificada
- [ ] Estrutura de navegação está completamente mapeada
- [ ] Nenhum valor hardcoded foi usado na análise (apenas conversões documentadas)

### 📤 FORMATO DE RESPOSTA

✅ **PROMPT 0: Análise e Planejamento Inicial** — CONCLUÍDO

📚 **PRÉ-EXECUÇÃO**
✓ Rules relidas e aplicadas
✓ Figma consultado e analisado via MCP
✓ Hierarquia de variáveis verificada

🔍 **ANÁLISE REALIZADA**
- [Lista de componentes identificados por tela]
- [Lista de variáveis semânticas encontradas]
- [Lista de variáveis primitivas encontradas]
- [Estrutura de navegação mapeada]

📁 **ARQUIVOS CRIADOS**
- DOCUMENTATION.md
- tokens-reference.md
- arquitetura.md

🎨 **TOKENS MAPEADOS**

**Variáveis Semânticas:**
- `--color-primary`: [contexto de uso]
- `--spacing-container`: [contexto de uso]
- [lista completa]

**Variáveis Primitivas:**
- `--gray-900`: [contexto de uso]
- `--spacing-md`: [contexto de uso]
- [lista completa]

**Conversões Iniciais:**
- `#E5E5E5` → `--gray-200` (primitiva mais próxima, usado em borders)
- `28px` → `--spacing-lg` (arredondado para 32px, usado em containers)

📐 **ARQUITETURA PROPOSTA**
[Explicar estrutura de pastas, hierarquia de componentes e estratégia]

🤔 **PRÓXIMOS PASSOS**
⏭️ **PROMPT 1**: Estrutura Base do Projeto

---

## 📋 PROMPT 1: Estrutura Base do Projeto

### 🎯 OBJETIVO
Inicializar o projeto React + TypeScript + Vite + Tailwind com a estrutura de pastas definida no PROMPT 0.

### 📚 PRÉ-EXECUÇÃO OBRIGATÓRIA
1. Reler Rules + Documentação
2. Consultar Figma (variáveis para configurar tokens)
3. Revisar arquitetura definida no PROMPT 0

### 🔍 TAREFAS

1. **Inicializar projeto:**
   - ✅ Criar projeto Vite + React + TypeScript
   - ✅ Configurar Tailwind CSS
   - ✅ Configurar Supabase (variáveis de ambiente)

2. **Criar estrutura de pastas:**
   - ✅ Seguir arquitetura definida no PROMPT 0
   - ✅ Criar todas as pastas necessárias
   - ✅ Criar arquivos base (App.tsx, main.tsx, index.html)

3. **Configurar Tailwind:**
   - ✅ Breakpoints corretos: `md: 768px`, `lg: 1280px`, `xl: 1920px`
   - ✅ Configurar variáveis CSS customizadas
   - ✅ Integrar tokens do design system

4. **Criar arquivo de tokens CSS:**
   - ✅ `src/styles/tokens.css`
   - ✅ Variáveis semânticas e primitivas do design system
   - ✅ Seguir hierarquia: semântica → primitiva

5. **Configurar TypeScript:**
   - ✅ tsconfig.json otimizado
   - ✅ Tipos base criados

### 📦 ENTREGÁVEIS OBRIGATÓRIOS

1. Projeto Vite inicializado e funcional
2. Estrutura de pastas criada conforme arquitetura
3. Tailwind configurado com breakpoints corretos
4. Arquivo `src/styles/tokens.css` com todas as variáveis
5. `package.json` com dependências corretas
6. `.env.example` criado (variáveis Supabase)
7. DOCUMENTATION.md atualizado

### ✅ CRITÉRIOS DE ACEITAÇÃO

- [ ] `npm install` executa sem erros
- [ ] `npm run dev` inicia servidor de desenvolvimento
- [ ] `npm run build` executa sem erros (tentativas: X)
- [ ] Estrutura de pastas criada conforme DOCUMENTATION.md
- [ ] Tailwind configurado com breakpoints corretos (`md: 768px`, `lg: 1280px`, `xl: 1920px`)
- [ ] Arquivo `tokens.css` criado com variáveis do design system
- [ ] TypeScript configurado sem erros
- [ ] DOCUMENTATION.md atualizado com status do PROMPT 1

### 📤 FORMATO DE RESPOSTA

✅ **PROMPT 1: Estrutura Base do Projeto** — CONCLUÍDO

📚 **PRÉ-EXECUÇÃO**
✓ Rules relidas e aplicadas
✓ Figma consultado (tokens para configuração)
✓ Arquitetura do PROMPT 0 revisada

📦 **IMPLEMENTADO**
- Projeto Vite + React + TypeScript inicializado
- Tailwind CSS configurado
- Estrutura de pastas criada
- Arquivo tokens.css criado
- TypeScript configurado

🎨 **TOKENS CONFIGURADOS**
**Semânticas:**
- `--color-primary`: [valor/configuração]
- `--spacing-container`: [valor/configuração]

**Primitivas:**
- `--gray-*`: [escala completa]
- `--spacing-*`: [escala completa]

**Conversões:**
- Nenhuma (tokens diretos do Figma)

📁 **ARQUIVOS CRIADOS/MODIFICADOS**
- `package.json`
- `vite.config.ts`
- `tailwind.config.js`
- `tsconfig.json`
- `src/styles/tokens.css`
- `src/styles/globals.css`
- [estrutura de pastas criada]

🔨 **BUILD STATUS**
✅ Sucesso (tentativas: 1)

💾 **COMMIT REALIZADO**
`feat: estrutura inicial do projeto com Vite, React, TypeScript e Tailwind`

🤔 **PRÓXIMOS PASSOS**
⏭️ **PROMPT 2**: Layout Desktop e Sidebar

---

## 📋 PROMPT 2: Layout Desktop e Sidebar

### 🎯 OBJETIVO
Implementar o layout desktop com sidebar responsiva (estados expandido/colapsado) conforme design do Figma.

### 📚 PRÉ-EXECUÇÃO OBRIGATÓRIA
1. Reler Rules + Documentação
2. Consultar Figma (layout da sidebar, estados expandido/colapsado)
3. Verificar tokens utilizados no design

### 🔍 TAREFAS

1. **Criar componente Layout:**
   - ✅ Layout principal com sidebar + main content
   - ✅ Responsivo: sidebar apenas em desktop (≥1280px)
   - ✅ Main content ajusta automaticamente ao estado da sidebar

2. **Implementar Sidebar:**
   - ✅ Estado expanded (larga, com texto)
   - ✅ Estado collapsed (estreita, apenas ícones)
   - ✅ Botão de toggle para expand/collapse
   - ✅ Itens de navegação (Dashboard, Cartões, Transações, Perfil)
   - ✅ Ícones para cada seção
   - ✅ Sidebar empurra conteúdo (não sobrepõe)

3. **Implementar Main Content:**
   - ✅ Container fluido (`width: 100%`)
   - ✅ Padding responsivo: `px-8` (desktop), `px-6` (tablet), `px-4` (mobile)
   - ✅ Max-width: `1400px` (desktop), `1600px` (wide)
   - ✅ Sem overflow horizontal

4. **Responsividade:**
   - ✅ Sidebar NÃO renderiza em mobile/tablet (<1280px)
   - ✅ Layout se adapta fluidamente
   - ✅ Transições suaves entre estados

### 📦 ENTREGÁVEIS OBRIGATÓRIOS

1. Componente `Layout.tsx` funcional
2. Componente `Sidebar` com estados expandido/colapsado
3. Hook `useSidebar` para gerenciar estado
4. Navegação funcional entre seções
5. Layout 100% responsivo
6. DOCUMENTATION.md atualizado

### ✅ CRITÉRIOS DE ACEITAÇÃO

- [ ] Sidebar renderiza apenas em desktop (≥1280px)
- [ ] Sidebar possui estados expandido/colapsado funcionais
- [ ] Toggle button funciona corretamente
- [ ] Navegação entre seções funciona
- [ ] Main content se ajusta ao estado da sidebar (empurra, não sobrepõe)
- [ ] Layout fluido: `width: 100%` em containers principais
- [ ] Padding responsivo aplicado corretamente
- [ ] Max-width aplicado corretamente
- [ ] Sem overflow horizontal em nenhuma resolução
- [ ] `npm run build` executa sem erros (tentativas: X)
- [ ] Testado em: 375px, 768px, 1280px, 1920px
- [ ] DOCUMENTATION.md atualizado

### 📤 FORMATO DE RESPOSTA

✅ **PROMPT 2: Layout Desktop e Sidebar** — CONCLUÍDO

📚 **PRÉ-EXECUÇÃO**
✓ Rules relidas e aplicadas
✓ Figma consultado (sidebar e layout)
✓ Hierarquia de variáveis verificada

📦 **IMPLEMENTADO**
- Layout principal com sidebar
- Sidebar com estados expandido/colapsado
- Hook useSidebar para gerenciamento de estado
- Navegação entre seções
- Layout 100% responsivo

🎨 **TOKENS UTILIZADOS**
**Semânticas:**
- `--color-bg`: [contexto]
- `--spacing-container`: [contexto]
- `--color-text`: [contexto]

**Primitivas:**
- `--gray-50`: [contexto]
- `--gray-900`: [contexto]
- `--spacing-md`: [contexto]
- `--spacing-lg`: [contexto]

**Conversões:**
- [Valor do Figma] → [Token] (justificativa)

📁 **ARQUIVOS CRIADOS/MODIFICADOS**
- `src/components/layout/Layout.tsx`
- `src/components/layout/Sidebar/Sidebar.tsx`
- `src/components/layout/Sidebar/SidebarItem.tsx`
- `src/components/layout/Sidebar/SidebarToggle.tsx`
- `src/hooks/useSidebar.ts`

🔨 **BUILD STATUS**
✅ Sucesso (tentativas: X)

💾 **COMMIT REALIZADO**
`feat: layout desktop com sidebar expandida/colapsada`

🤔 **PRÓXIMOS PASSOS**
⏭️ **PROMPT 3**: Header Mobile e Navegação

---

## 📋 PROMPT 3: Header Mobile e Navegação

### 🎯 OBJETIVO
Implementar header mobile e drawer de navegação para dispositivos mobile/tablet (<1280px).

### 📚 PRÉ-EXECUÇÃO OBRIGATÓRIA
1. Reler Rules + Documentação
2. Consultar Figma (header mobile, drawer)
3. Verificar tokens e responsividade

### 🔍 TAREFAS

1. **Criar Header Mobile:**
   - ✅ Renderizar apenas em <1280px
   - ✅ Botão de menu (abre drawer)
   - ✅ Título da página atual
   - ✅ Ações principais (ex: nova transação)
   - ✅ Altura e padding adequados

2. **Implementar Drawer/Mobile Menu:**
   - ✅ Overlay escuro de fundo
   - ✅ Menu lateral que desliza
   - ✅ Mesmo conteúdo da sidebar desktop
   - ✅ Fecha ao clicar fora ou no overlay
   - ✅ Transições suaves

3. **Integrar com Layout:**
   - ✅ Header Mobile substitui Sidebar em <1280px
   - ✅ Sidebar NÃO renderiza junto com Header Mobile
   - ✅ Layout se adapta automaticamente

4. **Responsividade:**
   - ✅ Testado em mobile (375px, 768px)
   - ✅ Touch targets ≥ 44x44px
   - ✅ Espaçamento adequado entre elementos clicáveis

### 📦 ENTREGÁVEIS OBRIGATÓRIOS

1. Componente `HeaderMobile` funcional
2. Componente `MobileDrawer` funcional
3. Hook para gerenciar estado do drawer
4. Layout integrado (Header Mobile + Sidebar não renderizam juntos)
5. DOCUMENTATION.md atualizado

### ✅ CRITÉRIOS DE ACEITAÇÃO

- [ ] Header Mobile renderiza apenas em <1280px
- [ ] Header Mobile NÃO renderiza junto com Sidebar
- [ ] Drawer abre/fecha corretamente
- [ ] Navegação funciona no drawer
- [ ] Overlay fecha drawer ao clicar
- [ ] Touch targets ≥ 44x44px
- [ ] Transições suaves
- [ ] `npm run build` executa sem erros (tentativas: X)
- [ ] Testado em: 375px, 768px
- [ ] DOCUMENTATION.md atualizado

### 📤 FORMATO DE RESPOSTA

✅ **PROMPT 3: Header Mobile e Navegação** — CONCLUÍDO

📚 **PRÉ-EXECUÇÃO**
✓ Rules relidas e aplicadas
✓ Figma consultado (header mobile e drawer)
✓ Hierarquia de variáveis verificada

📦 **IMPLEMENTADO**
- Header Mobile funcional
- Drawer de navegação mobile
- Integração com Layout (condicional render)
- Navegação mobile funcional

🎨 **TOKENS UTILIZADOS**
[Documentar tokens usados]

📁 **ARQUIVOS CRIADOS/MODIFICADOS**
- `src/components/layout/HeaderMobile/HeaderMobile.tsx`
- `src/components/layout/HeaderMobile/MobileDrawer.tsx`
- `src/hooks/useMobileDrawer.ts`
- `src/components/layout/Layout.tsx` (modificado)

🔨 **BUILD STATUS**
✅ Sucesso (tentativas: X)

💾 **COMMIT REALIZADO**
`feat: header mobile e drawer de navegação`

🤔 **PRÓXIMOS PASSOS**
⏭️ **PROMPT 4**: [Próximo prompt]

---

## 🔄 Padrão para Demais Prompts

Todos os prompts seguem a mesma estrutura:

1. **🎯 OBJETIVO** — clara e mensurável
2. **📚 PRÉ-EXECUÇÃO OBRIGATÓRIA** — checklist antes de começar
3. **🔍 TAREFAS** — lista detalhada do que fazer
4. **📦 ENTREGÁVEIS OBRIGATÓRIOS** — o que deve ser criado/entregue
5. **✅ CRITÉRIOS DE ACEITAÇÃO** — como validar que está pronto
6. **📤 FORMATO DE RESPOSTA** — template padronizado

---

## 📝 Padrões Gerais

### 🔄 Ciclo Obrigatório (ANTES de CADA Prompt)
1. ✅ Reler Rules + Documentação
2. ✅ Consultar Figma (layout + variáveis)
3. ✅ Executar prompt
4. ✅ `npm run build` (até sucesso)
5. ✅ Informar e aguardar aprovação
6. ✅ Documentar + Commit

### 🎨 Hierarquia de Variáveis (CRÍTICO)
**Ordem obrigatória ao converter estilos do Figma:**
1. **Variável SEMÂNTICA** aplicada? → Usar
2. **Variável PRIMITIVA** aplicada? → Usar
3. **Valor local** (hex, px, etc)? → Buscar semântica equivalente → Se não existir, usar primitiva mais próxima → **NUNCA usar hardcoded**

### 📤 Formato de Resposta Padrão
Toda resposta após executar um prompt DEVE seguir o template fornecido em cada prompt.

### 💾 Padrão de Commits
```
feat: [escopo] descrição curta
fix: [escopo] correção
docs: atualização documentação
refactor: [escopo] refatoração
style: ajustes formatação
```

### 🕹️ Comandos Reconhecidos
- `"Próximo"` → Avançar para próximo prompt
- `"Revisar [arquivo]"` → Revisar arquivo específico
- `"Refazer"` → Refazer prompt atual
- `"Status"` → Ver progresso geral
- `"Tokens"` → Ver mapeamento completo de conversões

---

## ✅ Checklist de Validação dos Prompts

Cada prompt deve ter:
- [ ] Objetivo claro e mensurável
- [ ] Critérios de aceitação definidos
- [ ] Entregáveis explícitos
- [ ] Formato de resposta padronizado
- [ ] Build obrigatório mencionado
- [ ] Documentação obrigatória mencionada
- [ ] Hierarquia de variáveis respeitada
- [ ] Responsividade considerada
- [ ] Comandos de controle definidos

---

## 📘 DOCUMENTATION.md — Estrutura Padrão

```markdown
# mycash+ — Documentação

## Progresso
- [x] PROMPT 0: Análise
- [x] PROMPT 1: Estrutura Base
- [ ] PROMPT 2: Layout Desktop
- [ ] PROMPT 3: Header Mobile
---

## PROMPT 1: Estrutura Base
**Status:** ✅ | **Data:** DD/MM | **Build:** ✅ (1 tentativa)

### Implementado
- Estrutura de pastas
- Configuração Vite + React + TypeScript
- Tailwind CSS configurado

### Tokens
**Semânticas:** `--color-primary`, `--spacing-container`
**Primitivas:** `--gray-100`, `--spacing-md`

### Conversões
- Nenhuma (tokens diretos)

### Build
**Tentativas:** 1 | **Erros:** 0

### Arquivos
- `package.json`
- `vite.config.ts`
- `tailwind.config.js`
- `src/styles/tokens.css`

---
```

---

**Documento revisado e aprimorado com:**
- ✅ Critérios de aceitação explícitos
- ✅ Entregáveis definidos
- ✅ Checkpoints de revisão
- ✅ Documentação de conversões padronizada
- ✅ Hierarquia de variáveis clarificada
- ✅ Templates de resposta padronizados