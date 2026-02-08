
# SEO Improvement Plan for contadaluz.pt

## Overview
This plan will significantly improve your website's search engine visibility, especially for Portuguese users searching for electricity consumption calculators.

---

## Changes to Implement

### 1. Fix index.html Meta Tags

**File: `index.html`**

- Change `lang="en"` to `lang="pt-PT"` for proper Portuguese localization
- Fix Open Graph tags with real content:
  - `og:title`: "Calculadora Consumo Electricidade - Quanto Gasta em Luz | Portugal"
  - `og:description`: "Calcule o consumo eletrico dos seus eletrodomesticos em Portugal..."
  - `og:url`: "https://contadaluz.pt"
  - `og:locale`: "pt_PT"
- Fix Twitter Card tags with proper Portuguese content
- Add canonical URL: `<link rel="canonical" href="https://contadaluz.pt/">`
- Add keywords meta tag with Portuguese terms: "calculadora consumo eletrico, conta luz portugal, kWh, eletrodomesticos, poupanca energia"
- Add theme-color meta tag for mobile browsers

### 2. Create sitemap.xml

**File: `public/sitemap.xml`**

Create a sitemap with:
- Homepage: https://contadaluz.pt/ (priority 1.0, daily updates)
- Report page template noted for dynamic generation

### 3. Update robots.txt

**File: `public/robots.txt`**

Add sitemap reference:
```
Sitemap: https://contadaluz.pt/sitemap.xml
```

### 4. Add Structured Data (JSON-LD)

**File: `index.html`**

Add WebApplication schema for rich search results:
- Type: WebApplication
- Name: Calculadora de Consumo Eletrico
- Description in Portuguese
- Application category: UtilitiesApplication
- Operating system: Web
- Offers: Free
- Country of origin: Portugal

### 5. Create SEO Helper Component (Optional Enhancement)

**File: `src/components/SEOHead.tsx`**

Create a reusable component using react-helmet-async for:
- Dynamic page titles
- Dynamic meta descriptions
- Open Graph tags per page
- JSON-LD structured data

This would allow the Report page to have custom SEO tags based on the report content.

---

## Summary of Files to Modify/Create

| File | Action | Purpose |
|------|--------|---------|
| `index.html` | Modify | Fix all meta tags, add structured data |
| `public/sitemap.xml` | Create | Help Google discover pages |
| `public/robots.txt` | Modify | Add sitemap reference |

---

## Expected SEO Impact

- Better ranking for Portuguese electricity-related searches
- Rich snippets in Google search results
- Proper social media previews when shared
- Faster Google indexing via sitemap
- Regional targeting for Portugal (pt-PT)

---

## Technical Notes

- No new dependencies required for basic improvements
- For dynamic SEO on the Report page, we could add `react-helmet-async` package
- All changes are frontend-only and deploy immediately
