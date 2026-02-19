

# Melhorias de SEO para Aumentar o Trafego

## Problema Atual
O site e uma Single Page Application (SPA) onde todas as paginas partilham os mesmos meta tags do `index.html`. Isto significa que o Google ve o mesmo titulo e descricao para `/tarifas`, `/poupar-energia`, etc. Alem disso, faltam dados estruturados especificos que podem gerar rich snippets nos resultados de pesquisa.

---

## Melhorias Propostas

### 1. Meta Tags Dinamicos por Pagina (Titulo + Descricao)
Criar um componente `SEOHead` que usa `document.title` e meta tags dinamicos para cada pagina. Cada rota tera titulo, descricao e canonical URL unicos.

| Pagina | Titulo |
|--------|--------|
| `/` | Calculadora Consumo Electricidade - Quanto Gasta em Luz &#124; Portugal |
| `/analisar-fatura` | Como Ler a Fatura da Eletricidade - Guia Completo &#124; ContaDaLuz.pt |
| `/tarifas` | Comparar Tarifas Eletricidade Portugal - Simples vs Bi-horaria &#124; ContaDaLuz.pt |
| `/poupar-energia` | Como Poupar Energia em Casa - Dicas Praticas &#124; ContaDaLuz.pt |
| `/perguntas-frequentes` | Perguntas Frequentes sobre Eletricidade Portugal &#124; ContaDaLuz.pt |

### 2. Dados Estruturados FAQPage (Schema.org)
Adicionar JSON-LD `FAQPage` na pagina de Perguntas Frequentes. Isto permite que o Google mostre as perguntas diretamente nos resultados de pesquisa como rich snippets, aumentando significativamente o CTR.

### 3. Dados Estruturados BreadcrumbList
Adicionar breadcrumbs estruturados em todas as paginas internas para melhor navegacao nos resultados do Google.

### 4. Links Internos entre Paginas
Adicionar links contextuais dentro do conteudo de cada pagina que apontem para outras paginas do site. Exemplo: na pagina de Tarifas, linkar para Poupar Energia; no FAQ, linkar para a Calculadora. Isto melhora o SEO interno e reduz a taxa de rejeicao.

### 5. Atualizar Sitemap com Datas de 2026
As datas no sitemap estao em 2025. Atualizar para refletir a data atual.

---

## Detalhes Tecnicos

### Ficheiros a Criar
- `src/components/SEOHead.tsx` — Componente React que atualiza `document.title`, meta description, canonical e OG tags via `useEffect`

### Ficheiros a Modificar
| Ficheiro | Alteracao |
|----------|-----------|
| `src/pages/Index.tsx` | Adicionar `<SEOHead>` com meta tags da homepage |
| `src/pages/AnalisarFatura.tsx` | Adicionar `<SEOHead>` + links internos para Tarifas e FAQ |
| `src/pages/Tarifas.tsx` | Adicionar `<SEOHead>` + links internos para Poupar Energia |
| `src/pages/PouparEnergia.tsx` | Adicionar `<SEOHead>` + links internos para Calculadora e Tarifas |
| `src/pages/PerguntasFrequentes.tsx` | Adicionar `<SEOHead>` + JSON-LD FAQPage + links internos |
| `src/pages/Report.tsx` | Adicionar `<SEOHead>` com noindex (paginas de relatorio nao devem ser indexadas) |
| `public/sitemap.xml` | Atualizar lastmod para 2026-02-19 |
| `index.html` | Manter meta tags atuais como fallback |

### Componente SEOHead
Vai usar `useEffect` para:
- Definir `document.title`
- Atualizar `<meta name="description">`
- Atualizar `<link rel="canonical">`
- Atualizar `<meta property="og:title">`, `og:description`, `og:url`
- Injetar/remover `<script type="application/ld+json">` para dados estruturados

### FAQPage Schema (para /perguntas-frequentes)
Vai gerar automaticamente o JSON-LD a partir do array `faqs` ja existente, sem duplicar dados.

---

## Impacto Esperado
- **Rich snippets FAQ**: As perguntas podem aparecer diretamente nos resultados do Google, ocupando mais espaco visual
- **Titulos unicos**: Cada pagina compete por keywords diferentes em vez de todas competirem pelo mesmo titulo
- **Canonical URLs**: Evita problemas de conteudo duplicado
- **Links internos**: Melhora a distribuicao de autoridade entre paginas e aumenta o tempo no site

