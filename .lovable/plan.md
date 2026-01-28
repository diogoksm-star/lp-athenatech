
## Plano: Alterações na Página Athena

### Visão Geral
O documento PDF detalha várias alterações de copy e estrutura na landing page. Vou organizar as mudanças por seção.

---

### 1. Hero Section - Adicionar Novo Bloco

**Após a subheadline atual, adicionar:**
- Headline secundária: "Organizar as finanças com a Athena é tão fácil quanto mandar uma mensagem no Whatsapp!"
- Subheadline: "A solução definitiva para controlar a sua vida financeira."
- 3 Badges em linha:
  - "100% Automático"
  - "Funciona com IA"
  - "+2.000 usuários"

**Localização:** Linhas 314-316 - adicionar conteúdo após subheadline

---

### 2. Seção de Erros - Expandir com "Deixa eu adivinhar"

**Adicionar nova subseção antes do fechamento:**
```
"Deixa eu adivinhar…
Você já tentou de tudo e nada funcionou?"

❌ Planilhas prontas;
❌ Cadernos velhos;
❌ Grupos do Whatsapp;
❌ Apps de Finanças.

"O problema não é você. Esses sistemas não funcionam pra ninguém!"
```

**Localização:** Após linha 419, adicionar novo bloco

---

### 3. Seção de Bônus → Nova Seção de Funcionalidades

**Remover:** A seção de bônus atual (linhas 718-754) como "bônus exclusivos"

**Substituir por:** Nova seção "Essas são todas as funcionalidades da Athena:"

Com 5 cards de funcionalidades:

| Card | Título | Descrição |
|------|--------|-----------|
| 1 | Registro direto no WhatsApp | Envie uma mensagem, um áudio ou até uma foto da nota fiscal, a Athena registra automaticamente. |
| 2 | Dashboard direto ao ponto | Veja todas as principais informações de forma rápida e tenha total clareza de como está suas finanças. |
| 3 | Relatório mensal | A Athena te envia automaticamente os relatórios e mapeia o quão perto você está dos seus objetivos. |
| 4 | Organização de investimentos | Acesse uma aba separada e veja somente como está a situação atual dos seus investimentos e ativos. |
| 5 | Plano de metas financeiras | A Athena traça um plano para te ajudar a chegar nos seus maiores objetivos financeiros. |

---

### 4. Seção "Para Quem é" - Atualizar Layout

**Manter o layout 2x2 atual**, mas garantir que mostra claramente:
- Autônomos e Freelancers - "Que querem organização automática"
- Famílias - "Que precisam de controle sem stress"
- MEIs - "Que querem separar pessoal e empresa"
- Quem quer investir - "Mas nunca sabe quanto sobra"

*(Esta seção já está implementada corretamente)*

---

### Resumo das Mudanças em Código

**Arquivo:** `src/components/funnel/SalesPage.tsx`

#### Alteração 1: Hero Section (após linha 316)
Adicionar bloco com headline secundária + badges

#### Alteração 2: Seção de Erros (após linha 419)
Adicionar subseção "Deixa eu adivinhar" com mais pain points

#### Alteração 3: Seção de Bônus → Funcionalidades (linhas 718-754)
Substituir completamente por nova seção de funcionalidades com 5 cards

---

### Estrutura Final da Página

```text
1. Hero
   ├─ Badge "100% personalizado"
   ├─ Badge "+2.500 pessoas"
   ├─ Headline principal
   ├─ Subheadline
   ├─ [NOVO] Headline secundária + 3 badges
   ├─ Mockup
   └─ CTA

2. Prova Social

3. Erros que te deixam no escuro
   ├─ 4 erros comuns
   ├─ "O problema não é você"
   └─ [NOVO] "Deixa eu adivinhar" + 4 tentativas falhas

4. Mockup do Produto (demo)

5. Como Funciona (3 passos)

6. Antes vs Depois

7. O que muda na sua vida

8. [ALTERADO] Funcionalidades da Athena (5 cards)
   - Registro WhatsApp
   - Dashboard
   - Relatório mensal
   - Investimentos
   - Metas

9. Depoimentos

10. Para Quem é

11. Pricing

12. Garantia

13. FAQ

14. CTA Final

15. Footer
```

---

### Ícones Necessários

Para os novos cards de funcionalidades:
- `MessageSquare` - Registro WhatsApp
- `LayoutDashboard` - Dashboard (já importado)
- `FileText` - Relatório mensal
- `TrendingUp` - Investimentos (já importado)
- `Target` - Metas (já importado)
