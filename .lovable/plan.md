

## Plano: Animação Fade-in na Logo e Remoção do Badge +2500

### Resumo das Alterações

Vou fazer as seguintes alterações no Hero Section do arquivo `src/components/funnel/SalesPage.tsx`:

---

### 1. Adicionar Animação Fade-in na Logo

**Localização atual (linhas 252-263):**
```tsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 0.2, type: "spring" }}
  className="mb-6"
>
  <img 
    src={athenaLogo} 
    alt="Athena" 
    className="h-12 md:h-16 w-auto mx-auto"
  />
</motion.div>
```

**Alterar para:**
```tsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
  className="mb-8"
>
  <img 
    src={athenaLogo} 
    alt="Athena" 
    className="h-12 md:h-16 w-auto mx-auto"
  />
</motion.div>
```

A animação mudará de:
- **Antes:** Scale (aparece como "pop")
- **Depois:** Fade-in suave com leve movimento de cima para baixo

---

### 2. Remover Badge "+2.500 pessoas organizadas"

**Remover completamente (linhas 265-273):**
```tsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 0.3, type: "spring" }}
  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-8 ml-2"
>
  <Star className="w-4 h-4 text-secondary" />
  <span className="text-sm text-secondary">Já são +2.500 pessoas organizadas</span>
</motion.div>
```

---

### Estrutura Final do Hero

```text
Hero Section:
├─ Logo Athena (com fade-in suave)
├─ Headline "Organizar as finanças com a Athena..."
├─ Subheadline "A solução definitiva..."
├─ 3 Badges (100% Automático, Funciona com IA, +2.000 usuários)
├─ Mockup
└─ CTA Button
```

---

### Arquivo Modificado
- `src/components/funnel/SalesPage.tsx`

