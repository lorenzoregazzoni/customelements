# Regole Copilot per questo repository

Queste regole definiscono come Copilot deve operare in questo progetto.

## Obiettivi

- Usare Parcel per il bundling.
- Usare Prettier per formattare HTML, CSS e JSON.
- Usare Biome come linter e formatter per i file JS.

## Convenzioni operative

- Non formattare i file JS con Prettier. I file JS sono gestiti da Biome.
- Eseguire i seguenti script:
  - `pnpm dev` per lo sviluppo locale.
  - `pnpm build` per la build di produzione.
  - `pnpm lint` per il linting JS con Biome.
  - `pnpm format` per formattare HTML/CSS/JSON con Prettier e JS con Biome.

## Styleguides

Le guide di stile sono disponibili in docs/styleguides/:

- HTML: docs/styleguides/html.md — standard semantici, tipografia, media e regole di layout. Nota: questo progetto usa un template engine custom; non usare mai sintassi Liquid/Jekyll ({% %}) nei template.
- CSS: docs/styleguides/css.md — standard e convenzioni CSS (unità di misura, css-hierarchy, naming, architettura, dipendenze). Preferire CSS nativo con bassa specificità e organizzazione modulare.
- JavaScript: docs/styleguides/javascript.md — convenzioni JS (camelCase, const/let, arrow functions, funzioni pure, linting, test, buone pratiche).
- Accessibility (a11y): docs/styleguides/a11y.md — standard e best practice per accessibilità, con riferimenti WAI-ARIA.
