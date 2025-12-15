# Exportar o projeto para um novo repositório

Use este repositório como base para criar outro com o tema atualizado.

## Como gerar uma cópia limpa
1. Certifique-se de ter o `rsync` instalado.
2. Execute o script abaixo para copiar o projeto sem a pasta `.git` ou artefatos de build:
   ```bash
   ./scripts/prepare-new-repo.sh
   ```
   - Opcionalmente, passe um caminho de destino: `./scripts/prepare-new-repo.sh ../meu-novo-repo`.
3. No diretório de destino, inicialize o Git e faça o primeiro commit:
   ```bash
   cd ../contatos-tema-novo
   git init
   git add .
   git commit -m "Initial commit"
   ```
4. Crie um repositório remoto (GitHub, GitLab etc.) e faça o push.

## Como publicar no GitHub
Você pode criar o repositório manualmente pela interface web ou com a GitHub CLI. Depois, conecte o remoto e envie o código:

### Opção A: via site do GitHub
1. Acesse https://github.com/new, defina o nome do repositório (ex.: `contatos-tema-novo`) e clique em **Create repository**.
2. No terminal, configure o remoto e envie o commit inicial:
   ```bash
   git remote add origin git@github.com:<seu-usuario>/contatos-tema-novo.git
   git branch -M main
   git push -u origin main
   ```

### Opção B: usando GitHub CLI (`gh`)
1. Instale e autentique o `gh` (https://cli.github.com/):
   ```bash
   gh auth login
   ```
2. Crie o repositório e faça o push diretamente:
   ```bash
   gh repo create <seu-usuario>/contatos-tema-novo --public --source=. --remote=origin --push
   ```

Caso prefira HTTPS em vez de SSH, troque o endereço do remoto para `https://github.com/<seu-usuario>/contatos-tema-novo.git` e autentique conforme suas credenciais.

## O que o script faz
- Copia todos os arquivos da raiz do projeto para a pasta de destino.
- Exclui a pasta `.git`, `node_modules` e artefatos de build (`backend/target`, `frontend/contato/node_modules`).
- Mantém o layout e as customizações de estilo já aplicadas no projeto atual.

Assim você terá rapidamente um novo repositório com o tema atualizado pronto para versionamento e publicação.
