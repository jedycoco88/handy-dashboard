# Fonts

This system uses two webfonts, currently loaded from **Google Fonts CDN**:

- **Plus Jakarta Sans** — UI & display. Weights 400/500/600/700/800.
- **JetBrains Mono** — data numerals (counts, money, IDs, timestamps). Weights 400/500/700.

In HTML, include:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

## SUBSTITUTION FLAG
These are **documented stand-ins** chosen to match the brief (friendly + professional + warm),
not a confirmed brand typeface. When the client confirms a typeface:
1. Drop the `.woff2` files here.
2. Replace the CDN `<link>` with `@font-face` rules pointing at `/fonts`.
3. Update `--font-sans` / `--font-mono` in `colors_and_type.css`.
