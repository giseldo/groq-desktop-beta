# Groq Desktop (Enhanced Edition)

[![Latest Release](https://img.shields.io/github/v/release/giseldo/groq-desktop-beta?label=Última%20Versão&color=f55036)](https://github.com/giseldo/groq-desktop-beta/releases/latest)
[![Windows](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)](https://github.com/giseldo/groq-desktop-beta/releases/latest)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Versão aprimorada do cliente desktop para o [Groq](https://groq.com), com suporte nativo a servidores MCP (Model Context Protocol), suporte a modelos de raciocínio, atalhos de produtividade, gerenciamento avançado de histórico e otimizações exclusivas para Windows, macOS e Linux.

> 📌 **Repositório Original de Referência**: [groq/groq-desktop-beta](https://github.com/groq/groq-desktop-beta)  
> 📥 **Downloads dos Executáveis**: Obtenha os instaladores e versões portáteis na [Aba de Releases](https://github.com/giseldo/groq-desktop-beta/releases).

---

## 🚀 Diferenciais deste Fork (O que há de novo?)

Este fork foi desenvolvido para corrigir limitações do projeto original e adicionar melhorias essenciais de usabilidade e produtividade para uso diário.

### 📊 Tabela Comparativa

| Recurso / Melhoria | Repositório Original (`groq/groq-desktop-beta`) | Este Fork (`giseldo/groq-desktop-beta`) |
| :--- | :---: | :---: |
| **Atalho para Novo Chat (`Ctrl+N` / `Cmd+N`)** | ❌ Não possui | ✅ **Presente com foco automático** no campo de digitação |
| **Excluir Todas as Conversas** | ❌ Apenas uma por uma | ✅ **Botão dedicado** com confirmação para limpar todo o histórico |
| **Janela Maximizada no Windows** | ❌ Abre com tamanho limitado (`max-width: 1200px`) | ✅ **Abre maximizada** aproveitando 100% da resolução do monitor |
| **Modelos de Raciocínio (Reasoning Models)** | ⚠️ Título do chat era poluído com tags `<think>` | ✅ **Filtro automático** que extrai títulos limpos sem tokens de raciocínio |
| **Modelo Auxiliar Atualizado** | ⚠️ Utilizava `llama-3.1-8b-instant` (descontinuado) | ✅ Atualizado para **`openai/gpt-oss-120b`** |
| **Exibição da Versão do App** | ❌ Não exibe versão na interface | ✅ **Versão visível nas Configurações** (`Settings`) |
| **Interface Superior (Top Bar)** | ⚠️ Poluída com badge "Completions/Responses" | ✅ **Interface limpa**, moderna e sem distrações visuais |
| **Nomes dos Instaladores Padronizados** | ⚠️ Nomes com versão variável dificultando automações | ✅ `Groq Desktop Setup.exe` e `Groq Desktop.exe` padronizados |
| **CI/CD Multiplataforma Completo** | ⚠️ Foco inicial apenas em macOS | ✅ **Workflow GitHub Actions** para Windows, macOS e Linux |

---

### 🔍 Detalhamento das Funcionalidades Adicionadas

#### 1. ⌨️ Atalho de Teclado `Ctrl+N` / `Cmd+N` com Auto-Foco
- Pressione `Ctrl+N` (no Windows/Linux) ou `Cmd+N` (no macOS) a qualquer momento para abrir uma nova conversa instantaneamente.
- O cursor é automaticamente posicionado no campo de texto (`textarea`), permitindo começar a digitar imediatamente sem tocar no mouse.

#### 2. 🗑️ Exclusão em Massa do Histórico de Conversas
- No topo da barra lateral de conversas, foi adicionado um botão de lixeira para **Limpar todas as conversas** de uma só vez.
- Conta com diálogo de confirmação seguro para prevenir exclusões acidentais, limpando tanto os arquivos locais quanto a interface.

#### 3. 🖥️ Janela Maximizada e Responsiva no Windows
- Ao iniciar no Windows, o aplicativo abre em estado maximizado e ocupa toda a área útil da tela, removendo a trava de largura (`maxWidth`) herdada do app original para telas ultrawide e monitores de alta resolução.

#### 4. 🧠 Suporte Aprimorado a Modelos de Raciocínio (Reasoning Models)
- Modelos como Qwen, DeepSeek R1 e variantes de raciocínio costumam gerar blocos `<think> ... </think>`. No fork original, esses blocos contaminavam os títulos automáticos das conversas.
- Este fork trata e remove os blocos de raciocínio interno antes de salvar o título, mantendo a barra lateral sempre limpa e legível.
- O modelo auxiliar para títulos e tarefas secundárias foi atualizado para `openai/gpt-oss-120b`, substituindo modelos que foram aposentados na Groq Cloud.

#### 5. 🎨 Interface Minimalista e Polida
- O seletor desnecessário de modo de API ("Completions" vs "Responses") que ocupava espaço no topo foi removido da barra superior, mantendo o foco no modelo selecionado e nas mensagens.
- A página de **Configurações (Settings)** agora informa claramente a versão instalada da aplicação no rodapé.

#### 6. 📦 Distribuição e Instalação Simplificadas
- Nomes de artefatos previsíveis e padronizados para Windows:
  - `Groq Desktop Setup.exe` (Instalador NSIS com atalhos e desinstalador)
  - `Groq Desktop.exe` (Executável Portátil / Portable, dispensa instalação)
- Pipeline automatizada de build no GitHub Actions para geração de releases a cada versão lançada.

---

## 📥 Como Baixar e Instalar

Acesse a página de [Releases](https://github.com/giseldo/groq-desktop-beta/releases/latest) e baixe o executável para a sua plataforma:

- **Windows**:
  - `Groq Desktop Setup.exe` (Instalador recomendado)
  - `Groq Desktop.exe` (Versão portátil)
- **macOS**:
  - `Groq Desktop.dmg`
- **Linux**:
  - `Groq Desktop.AppImage` ou pacote `.deb`

> **Nota para usuários do macOS**: Caso o macOS bloqueie a inicialização após o download, execute:
> ```sh
> xattr -c /Applications/Groq\ Desktop.app
> ```

---

## ⚙️ Configuração da Chave de API

Para utilizar o aplicativo, você precisará de uma chave de API gratuita da Groq:

1. Obtenha sua chave no console: [https://console.groq.com](https://console.groq.com).
2. No Groq Desktop, abra o menu de **Configurações (Settings)**.
3. Insira sua chave no campo `GROQ_API_KEY`:
   ```json
   {
     "GROQ_API_KEY": "gsk_sua_chave_aqui"
   }
   ```

---

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v9+)

### Instalação e Execução
```bash
# 1. Clonar o repositório
git clone https://github.com/giseldo/groq-desktop-beta.git
cd groq-desktop-beta

# 2. Instalar dependências
pnpm install

# 3. Iniciar em ambiente de desenvolvimento
pnpm dev
```

### Gerando os Executáveis (Build)
```bash
# Build para Windows (limpa release/ e gera executáveis)
pnpm dist:win

# Build para macOS
pnpm dist:mac

# Build para Linux
pnpm dist:linux
```

---

## 📄 Licença

Este projeto é distribuído sob os termos da licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
