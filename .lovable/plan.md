

## Plano: Substituir Badge por Logo e Aumentar Headline

### Resumo das Alterações

Vou fazer duas alterações no Hero Section do arquivo `src/components/funnel/SalesPage.tsx`:

---

### 1. Substituir Badge "Sistema financeiro 100% personalizado" pela Logo Athena

**Localização atual (linhas 251-259):**
```tsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 0.2, type: "spring" }}
  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-4"
>
  <BadgeCheck className="w-4 h-4 text-secondary" />
  <span className="text-sm text-foreground">Sistema financeiro 100% personalizado</span>
</motion.div>
```

**Substituir por:**
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

**Ações adicionais:**
- Copiar o arquivo `user-uploads://logo.svg` para `src/assets/logo.svg`
- Adicionar import: `import athenaLogo from "@/assets/logo.svg";`

---

### 2. Aumentar Fonte da Headline Principal

**Localização atual (linha 279):**
```tsx
<h2 className="text-2xl md:text-3xl font-semibold mb-3 text-foreground">
```

**Alterar para:**
```tsx
<h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground leading-tight">
```

O tamanho aumentará de:
- Mobile: `text-2xl` (24px) → `text-3xl` (30px)
- Desktop: `text-3xl` (30px) → `text-5xl` (48px)

---

### Arquivo Modificado
- `src/components/funnel/SalesPage.tsx`

### Arquivos Copiados
- `user-uploads://logo.svg` → `src/assets/logo.svg`

