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

## O que o script faz
- Copia todos os arquivos da raiz do projeto para a pasta de destino.
- Exclui a pasta `.git`, `node_modules` e artefatos de build (`backend/target`, `frontend/contato/node_modules`).
- Mantém o layout e as customizações de estilo já aplicadas no projeto atual.

Assim você terá rapidamente um novo repositório com o tema atualizado pronto para versionamento e publicação.
