# Copilot Instructions (entry point)

Queste istruzioni sono l'entry point del contesto per Copilot in questo repository.

- Leggi prima `docs/COPILOT_RULES.md`.
- Le styleguides specifiche verranno aggiunte in `docs/styleguides/` e referenziate da `docs/COPILOT_RULES.md`.

## Stack del progetto
- Bundler: Parcel
- Formatter: Prettier (HTML, CSS, JSON), Biome (JS)
- Linter: Biome (JS)

## Convenzioni
- Usa gli script npm definiti in `package.json` per lanciare dev/build/lint/format.
- Prettier non deve modificare i file JS; è già configurata l'ignore.
- Biome gestisce lint e format per JS.

## TODO per Copilot
- Mantenere allineati i file di configurazione quando vengono aggiunti nuovi formati o tool.
- Aggiungere regole/addendum in `docs/styleguides/` quando richiesto.
