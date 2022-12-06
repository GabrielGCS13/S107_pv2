#!/bin/sh

set -e

npm run start:dev

exec "$@"
