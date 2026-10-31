# Regras do Projeto (Groq Desktop)

- **Fluxo obrigatório a cada mudança de código (Skill `release-workflow`)**:
  Sempre que fizer qualquer alteração de código neste projeto, siga a skill `.agents/skills/release-workflow/SKILL.md`:
  1. **Avance a versão**: Incremente a versão no `package.json` (ex.: `1.0.2` -> `1.0.3`).
  2. **Apague os releases antigos e gere o novo `dist` e `release` local**: Execute `pnpm dist:win` (que limpa a pasta `release/`, compila o frontend gerando a pasta `dist/` via `pnpm build` e empacota o instalador e executável portátil na pasta `release/`).
  3. **Commit, Tag e Push**: Faça `git add`, `git commit`, crie a tag `v<nova-versão>` e faça `git push fork main` e `git push fork v<nova-versão>`.
  4. **Apague os releases antigos no GitHub**: Remova as releases anteriores no repositório `giseldo/groq-desktop-beta` para que apenas a nova versão fique publicada.
