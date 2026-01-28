
## Plano: Remoção de Seções da Landing Page

### Resumo das Alterações

Vou remover as seguintes seções/textos do arquivo `src/components/funnel/SalesPage.tsx`:

---

### 1. Hero Section (linhas 312-318)
**Remover:**
- Headline: "Seu sistema financeiro inteligente está pronto."
- Subheadline: "Clareza total, todos os dias, direto no WhatsApp."

O Hero ficará apenas com:
- Badges superiores
- Nova headline secundária "Organizar as finanças..."
- 3 badges (100% Automático, IA, +2.000 usuários)
- Mockup
- Botão CTA

---

### 2. Seção de Erros (linhas 403-493)
**Remover toda a seção**, incluindo:
- Headline: "Tentar se organizar sozinho pode te custar caro"
- Subheadline: "A maioria das pessoas comete os mesmos erros..."
- Grid dos 4 erros (planilhas, caderno, gastos, fim do mês)
- "O problema não é você. É o sistema que você tá tentando usar."
- "Com a Athena, você tem organização automática direto no WhatsApp."
- Subseção "Deixa eu adivinhar..."

---

### 3. Seção "De bagunça à clareza total" (linhas 689-765)
**Remover toda a seção** (conforme imagem 1):
- Headline "De bagunça à clareza total"
- Cards Antes vs Com Athena

---

### 4. Seção "A Athena é pra você se:" (linhas 897-932)
**Remover toda a seção** (conforme imagem 2):
- Headline "A Athena é pra você se:"
- Grid 2x2 com Autônomos, Famílias, MEIs, Investidores

---

### Estrutura Final da Página

```text
1. Hero (simplificado - sem headline principal)
2. Prova Social
3. Mockup do Produto (demo)
4. Como Funciona (3 passos)
5. O que muda na sua vida
6. Funcionalidades da Athena (5 cards)
7. Depoimentos
8. Pricing
9. Garantia
10. FAQ
11. CTA Final
12. Footer
```

---

### Arquivo Modificado
- `src/components/funnel/SalesPage.tsx`

### Limpeza de Código
Também removerei as constantes não utilizadas:
- `commonErrors` (linha 204-209)
- `beforeAfter` (linha 191-202)
- `targetAudience` (linha 112-133)
