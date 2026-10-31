---
name: release-workflow
description: >-
  Automatiza o fluxo completo de release do Groq Desktop após qualquer alteração de código:
  incrementa a versão no package.json, apaga releases antigos (locais e no GitHub),
  gera o novo build local, faz commit, cria a tag da nova versão e faz push para o repositório remoto.
---

# Release Workflow (Groq Desktop)

Sempre que uma alteração de código for concluída neste projeto, execute este procedimento completo para avançar a versão, limpar releases antigos, commitar, fazer push e gerar o novo release.

## Passo a Passo

### 1. Avançar a versão no `package.json`
Incremente o número de versão patch (ex.: `1.0.2` -> `1.0.3`) no arquivo `package.json`:

```powershell
node -e "const fs = require('fs'); const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); const parts = pkg.version.split('.').map(Number); parts[2] += 1; pkg.version = parts.join('.'); fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n'); console.log('New version:', pkg.version);"
```

### 2. Apagar releases locais antigos e gerar o novo build
Execute o script de distribuição que limpa a pasta `release/` (`pnpm clean:release`), compila o frontend (`pnpm build`) e gera os executáveis da nova versão:

```powershell
pnpm dist:win
```

Verifique se os arquivos `Groq Desktop Setup <versão>.exe` e `Groq Desktop <versão>.exe` foram gerados na pasta `release/`.

### 3. Commit, Tag e Push
Faça o stage das alterações, crie o commit, crie a tag `v<versão>` e envie para o remoto `fork` (`https://github.com/giseldo/groq-desktop-beta.git`):

```powershell
$version = node -p "require('./package.json').version"
git add -A
git commit -m "chore(release): v$version - <descrição resumida da mudança>"
git tag "v$version"
git push fork main
git push fork "v$version"
```

### 4. Limpar releases antigos no GitHub
Remova os releases anteriores do repositório `giseldo/groq-desktop-beta` no GitHub para manter apenas o novo release:

```powershell
$version = node -p "require('./package.json').version"
$oldReleases = gh release list --repo giseldo/groq-desktop-beta --json tagName -q ".[].tagName"
foreach ($tag in $oldReleases) {
  if ($tag -ne "v$version") {
    gh release delete $tag --repo giseldo/groq-desktop-beta --yes --cleanup-tag
  }
}
```
