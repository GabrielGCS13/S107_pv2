#!/bin/sh

set -e

node dist/src/main

exec "$@"
