#!/usr/bin/env bash
set -euo pipefail

# This script copies the current themed project to a clean folder ready to be initialized as a new Git repository.
# Usage: ./scripts/prepare-new-repo.sh [destination-folder]

SRC_DIR=$(cd "$(dirname "$0")/.." && pwd)
DEST_DIR=${1:-"${SRC_DIR}/../contatos-tema-novo"}

if [[ -d "$DEST_DIR/.git" ]]; then
  echo "Destination already contains a Git repository: $DEST_DIR" >&2
  exit 1
fi

mkdir -p "$DEST_DIR"

rsync -av --delete --exclude '.git' --exclude 'node_modules' \
  --exclude 'backend/target' --exclude 'frontend/contato/node_modules' \
  "$SRC_DIR"/ "$DEST_DIR"/

echo "Project copied to $DEST_DIR" 
cat <<'POST'
Next steps:
  1) cd "$DEST_DIR"
  2) git init
  3) git add . && git commit -m "Initial commit"
  4) Create your remote repository and push.
POST
