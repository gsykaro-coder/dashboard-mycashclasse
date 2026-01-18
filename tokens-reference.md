# 🎨 Tokens e Variáveis do Design System — mycash+

## ⚠️ Hierarquia de Variáveis (OBRIGATÓRIA)

**Ordem de prioridade ao converter estilos do Figma:**

1. **Variável SEMÂNTICA** → Usar diretamente
2. **Variável PRIMITIVA** → Usar diretamente  
3. **Valor local** → Conversão inteligente
4. **NUNCA** usar hardcoded

---

## 📋 Variáveis Semânticas

> **Status:** 🔄 Aguardando análise do Figma via MCP  
> Estas variáveis serão preenchidas após análise do design do Figma

### Cores Semânticas

| Token | Valor | Contexto de Uso | Status |
|---|---|---|---|
| `--color-primary` | TBD | Botões principais, links ativos | 🔄 |
| `--color-secondary` | TBD | Botões secundários, backgrounds | 🔄 |
| `--color-success` | TBD | Mensagens de sucesso, indicadores positivos | 🔄 |
| `--color-error` | TBD | Mensagens de erro, alertas críticos | 🔄 |
| `--color-warning` | TBD | Avisos, alertas de atenção | 🔄 |
| `--color-info` | TBD | Informações, tooltips | 🔄 |
| `--color-bg` | TBD | Background principal da aplicação | 🔄 |
| `--color-surface` | TBD | Background de cards e containers | 🔄 |
| `--color-text` | TBD | Texto principal | 🔄 |
| `--color-text-secondary` | TBD | Texto secundário | 🔄 |
| `--border-color` | TBD | Bordas de componentes | 🔄 |

### Espaçamentos Semânticos

| Token | Valor | Contexto de Uso | Status |
|---|---|---|---|
| `--spacing-container` | TBD | Padding de containers principais | 🔄 |
| `--spacing-section` | TBD | Espaçamento entre seções | 🔄 |
| `--spacing-card` | TBD | Padding interno de cards | 🔄 |
| `--spacing-page` | TBD | Padding da página | 🔄 |

### Tipografia Semântica

| Token | Valor | Contexto de Uso | Status |
|---|---|---|---|
| `--font-family` | TBD | Família de fonte principal | 🔄 |
| `--font-size-heading-1` | TBD | Títulos principais | 🔄 |
| `--font-size-heading-2` | TBD | Subtítulos | 🔄 |
| `--font-size-body` | TBD | Texto do corpo | 🔄 |
| `--font-size-caption` | TBD | Legendas e textos pequenos | 🔄 |
| `--line-height-tight` | TBD | Line height para títulos | 🔄 |
| `--line-height-normal` | TBD | Line height padrão | 🔄 |

---

## 📋 Variáveis Primitivas

> **Status:** 🔄 Aguardando análise do Figma via MCP  
> Estas variáveis serão preenchidas após análise do design do Figma

### Cores Primitivas

#### Gray Scale
| Token | Valor | Status |
|---|---|---|
| `--gray-50` | TBD | 🔄 |
| `--gray-100` | TBD | 🔄 |
| `--gray-200` | TBD | 🔄 |
| `--gray-300` | TBD | 🔄 |
| `--gray-400` | TBD | 🔄 |
| `--gray-500` | TBD | 🔄 |
| `--gray-600` | TBD | 🔄 |
| `--gray-700` | TBD | 🔄 |
| `--gray-800` | TBD | 🔄 |
| `--gray-900` | TBD | 🔄 |

#### Lime Scale (Primary)
| Token | Valor | Status |
|---|---|---|
| `--lime-50` | TBD | 🔄 |
| `--lime-100` | TBD | 🔄 |
| `--lime-200` | TBD | 🔄 |
| `--lime-300` | TBD | 🔄 |
| `--lime-400` | TBD | 🔄 |
| `--lime-500` | TBD | 🔄 |
| `--lime-600` | TBD | 🔄 |
| `--lime-700` | TBD | 🔄 |
| `--lime-800` | TBD | 🔄 |
| `--lime-900` | TBD | 🔄 |

### Espaçamentos Primitivos

| Token | Valor | Status |
|---|---|---|
| `--spacing-xs` | TBD (ex: 4px) | 🔄 |
| `--spacing-sm` | TBD (ex: 8px) | 🔄 |
| `--spacing-md` | TBD (ex: 16px) | 🔄 |
| `--spacing-lg` | TBD (ex: 32px) | 🔄 |
| `--spacing-xl` | TBD (ex: 48px) | 🔄 |
| `--spacing-2xl` | TBD (ex: 64px) | 🔄 |

### Tipografia Primitiva

#### Font Weights
| Token | Valor | Status |
|---|---|---|
| `--font-weight-normal` | 400 | ✅ |
| `--font-weight-medium` | 500 | ✅ |
| `--font-weight-semibold` | 600 | ✅ |
| `--font-weight-bold` | 700 | ✅ |

#### Font Sizes
| Token | Valor | Status |
|---|---|---|
| `--font-size-xs` | TBD | 🔄 |
| `--font-size-sm` | TBD | 🔄 |
| `--font-size-base` | TBD | 🔄 |
| `--font-size-lg` | TBD | 🔄 |
| `--font-size-xl` | TBD | 🔄 |
| `--font-size-2xl` | TBD | 🔄 |
| `--font-size-3xl` | TBD | 🔄 |
| `--font-size-4xl` | TBD | 🔄 |

---

## 🔄 Tabela de Conversões

> Esta tabela será preenchida quando valores hardcoded forem encontrados no Figma

| Valor Original (Figma) | Token Escolhido | Justificativa | Aplicado em | Status |
|---|---|---|---|---|
| - | - | - | - | ⏳ Aguardando análise |

**Legenda:**
- ✅ = Token confirmado no Figma
- 🔄 = Aguardando análise
- ⏳ = Não aplicável ainda

---

## 📝 Notas de Conversão

### Regras de Conversão

1. **Cores HEX:**
   - Comparar visualmente com primitivas da mesma família
   - Escolher a primitiva **MAIS PRÓXIMA**
   - **NUNCA** inventar novos tokens (ex: `--gray-195` ❌)

2. **Espaçamentos PX/REM:**
   - Arredondar para token da escala existente
   - Escolher o **MAIS PRÓXIMO**
   - **NUNCA** usar valores quebrados (ex: `--spacing-28` ❌)

3. **Tipografia:**
   - Mapear peso: `400` → `normal`, `600` → `semibold`, `700` → `bold`
   - Mapear tamanho para escala tipográfica
   - Usar tokens de line-height quando disponível

### Exemplos de Conversão

✅ **Correto:**
- Figma: `var(--color-primary)` → usar `var(--color-primary)`
- Figma: `var(--gray-900)` → usar `var(--gray-900)`
- Figma: `#E5E5E5` → converter para `--gray-200` (primitiva mais próxima)
- Figma: `24px` → converter para `--spacing-md` (escala existente)

❌ **Incorreto:**
- Figma: `#E5E5E5` → usar `#E5E5E5` (NUNCA hardcoded)
- Figma: `28px` → usar `28px` (NUNCA hardcoded)
- Figma: `#E5E5E5` → inventar `--gray-195` (NUNCA inventar tokens)

---

**Última atualização:** 2025-01-XX  
**Próxima atualização:** Após análise do Figma via MCP