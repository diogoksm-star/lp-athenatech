

## Plano: Corrigir Links Não Clicáveis no Desktop

### Problema Identificado

O `.athena-button::before` no CSS (linha 87-94 do `src/index.css`) cria um pseudo-elemento com `position: absolute; inset: 0` que cobre todo o botão, mas **não tem `pointer-events: none`**. Isso faz com que os cliques no desktop sejam interceptados pelo pseudo-elemento, impedindo o redirecionamento dos links. No celular, o comportamento de toque é diferente e pode passar pelo pseudo-elemento.

### Correção

**Arquivo:** `src/index.css` (linha 87-94)

Adicionar `pointer-events: none` ao `.athena-button::before`:

```css
.athena-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, hsl(0 0% 100% / 0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
}
```

Isso é a mesma solução já aplicada no `.pricing-card.featured::before` (linha 159), que já tem `pointer-events: none`.

### Impacto

- Todos os botões com classe `athena-button` passarão a funcionar corretamente no desktop
- Isso inclui os botões de checkout (Hotmart) e CTAs da página

