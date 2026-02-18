
# Plano: Navbar, Footer e Novas Páginas de Conteúdo

## Objetivo
Aumentar o tráfego orgânico do site criando novas páginas com conteúdo rico em SEO, uma navbar de navegação e um footer — tudo no estilo neobrutalista já existente.

---

## Arquitetura das Novas Páginas

```text
contadaluz.pt/                  → Calculadora (já existe)
contadaluz.pt/analisar-fatura   → NOVA: Guia de leitura de fatura
contadaluz.pt/perguntas-frequentes → NOVA: FAQ sobre eletricidade PT
contadaluz.pt/poupar-energia    → NOVA: Dicas de poupança de energia
contadaluz.pt/tarifas           → NOVA: Comparação de tarifas PT
```

4 novas páginas com conteúdo aprofundado geram mais keywords indexadas e aumentam o tempo no site.

---

## Ficheiros a Criar / Modificar

### 1. Novo Componente: `src/components/Navbar.tsx`
Barra de navegação topo com:
- Logo "💡 ContaDaLuz.pt" clicável (vai para home)
- Links: Calculadora / Analisar Fatura / Tarifas / Poupar Energia / FAQ
- Menu hamburger em mobile (usando estado React simples)
- Estilo: fundo branco com `brutal-border` na parte inferior, texto bold, link activo destacado com `gradient-primary`

### 2. Novo Componente: `src/components/Footer.tsx`
Rodapé com:
- Logo e descrição curta
- Links rápidos para todas as páginas
- Informação de copyright
- Estilo: fundo escuro (`foreground`) com texto claro, `brutal-border` no topo

### 3. Novo Layout: `src/components/Layout.tsx`
Componente wrapper que envolve `<Navbar />` + `{children}` + `<Footer />`, usado por todas as páginas.

### 4. Nova Página: `src/pages/AnalisarFatura.tsx`
Conteúdo rico sobre como ler a fatura da luz em Portugal:
- O que é o kWh e como se calcula
- Como identificar a tarifa na fatura
- O que são os custos fixos vs variáveis
- Infografia visual (HTML/CSS) dos campos da fatura
- CTA para a calculadora
- **Keywords alvo**: "como ler fatura eletricidade", "o que é kWh fatura", "tarifa bi-horária portugal"

### 5. Nova Página: `src/pages/PerguntasFrequentes.tsx`
FAQ com Accordion (componente já instalado) com 15+ perguntas:
- Quanto gasta um frigorífico por mês?
- Vale a pena mudar para tarifa bi-horária?
- Como reduzir a conta da luz?
- O que é a potência contratada?
- Qual o preço do kWh em Portugal?
- Como funciona o ciclo diário/semanal?
- ... e mais
- **Keywords alvo**: "quanto gasta frigorífico luz", "tarifa bi-horária vale pena", "preço kwh portugal 2025"

### 6. Nova Página: `src/pages/PouparEnergia.tsx`
Guia completo de poupança com conteúdo detalhado:
- 10 dicas práticas para cada divisão da casa
- Tabela comparativa consumo aparelhos eficientes vs antigos
- Calculadora rápida de retorno em investimento em LED
- **Keywords alvo**: "como poupar electricidade", "dicas poupança energia casa", "aparelhos mais consumo electricidade"

### 7. Nova Página: `src/pages/Tarifas.tsx`
Comparação completa de tarifas em Portugal:
- Tabela comparativa Tarifa Normal vs Bi-horária vs Tri-horária
- Quando compensa cada tarifa
- Como mudar de tarifa no fornecedor
- Horários de vazio/cheio/super-vazio
- **Keywords alvo**: "tarifa bi-horaria portugal horarios", "comparar tarifas eletricidade", "mudar tarifa eletricidade"

### 8. Modificar: `src/App.tsx`
Adicionar as 4 novas rotas:
- `/analisar-fatura`
- `/perguntas-frequentes`
- `/poupar-energia`
- `/tarifas`

### 9. Modificar: `src/components/EnergyCalculator.tsx`
Remover o header/padding exterior (que passa para o Layout) e manter só o conteúdo da calculadora.

### 10. Modificar: `src/pages/Index.tsx`, `src/pages/Report.tsx`, páginas novas
Envolver com `<Layout>` para ter navbar e footer.

### 11. Atualizar: `public/sitemap.xml`
Adicionar as 4 novas URLs ao sitemap para indexação imediata pelo Google.

---

## Estilo Visual (consistência com o site existente)

- Navbar: fundo `background`, linha inferior `brutal-border`, links com `font-bold`, link ativo com cor `primary`
- Footer: fundo `hsl(var(--foreground))`, texto branco, links com hover underline
- Páginas novas: mesma estrutura `max-w-4xl mx-auto space-y-6` com cards `brutal-border brutal-shadow`
- Headings com `font-black` e gradientes nos destaques
- Mobile-first em tudo

---

## Impacto SEO Esperado

| Página | Keywords Principais |
|--------|---------------------|
| /analisar-fatura | "como ler fatura luz", "kWh fatura eletricidade" |
| /perguntas-frequentes | "quanto gasta [aparelho]", "preço kWh portugal" |
| /poupar-energia | "como poupar electricidade", "dicas conta da luz" |
| /tarifas | "tarifa bi-horaria", "comparar tarifas eletricidade PT" |

Cada página com 800-1200 palavras de conteúdo real aumenta significativamente a probabilidade de aparecer no topo dos resultados de pesquisa para termos de cauda longa.
