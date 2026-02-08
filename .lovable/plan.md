

# Plano: Adicionar Logo nos Dados Estruturados

## Objetivo
Fazer com que o emoji 💡 apareça como logo nos resultados de pesquisa do Google, igual ao favicon.

---

## Mudanças a Implementar

### Ficheiro: `index.html`

Atualizar o JSON-LD (dados estruturados) para incluir a propriedade `logo` na organização autora:

**Antes:**
```json
"author": {
  "@type": "Organization",
  "name": "ContaDaLuz.pt",
  "url": "https://contadaluz.pt"
}
```

**Depois:**
```json
"author": {
  "@type": "Organization",
  "name": "ContaDaLuz.pt",
  "url": "https://contadaluz.pt",
  "logo": {
    "@type": "ImageObject",
    "url": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💡</text></svg>"
  }
}
```

---

## Detalhes Técnicos

- A propriedade `logo` no Schema.org permite definir a imagem que aparece associada à organização nos resultados de pesquisa
- Usamos o mesmo SVG inline com o emoji 💡 que já está no favicon
- O Google pode demorar algumas semanas a processar e mostrar o novo logo nos resultados
- O favicon já está correto, por isso os browsers já mostram o emoji 💡

---

## Resultado Esperado

Quando o Google re-indexar o site:
- O emoji 💡 aparecerá como logo nos resultados de pesquisa
- Consistência visual entre o favicon e a identidade nos motores de busca

