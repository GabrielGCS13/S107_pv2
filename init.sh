#!/usr/bin/env bash

set -e

COMMAND=${1:-"web"}                            # define `web` como o comando padrão caso nenhum comando tenha sido passado
echo $COMMAND

case "$COMMAND" in
  baseCheck)                                    # Responde ao command `baseCheck` que executa testes, linters, etc
    exit 0
  ;;
  web)
    node ./dist/src/main.js
    ;;
  *)
    exec sh -c "$*"
    ;;
esac
