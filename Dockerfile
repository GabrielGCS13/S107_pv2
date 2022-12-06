FROM node:16-alpine AS node
FROM node AS builder

ARG CONTAINER_PROJECT_DIR=/usr/overchain-web-api
ARG HOST_PROJECT_DIR=./

COPY $HOST_PROJECT_DIR $CONTAINER_PROJECT_DIR
WORKDIR $CONTAINER_PROJECT_DIR

RUN npm ci --only=production --ignore-scripts
RUN npm run build

EXPOSE 5000
ENTRYPOINT ["sh", "init.sh"]

# -----------------------------------------------------------------------------

FROM node AS development

RUN echo DEVELOPMENT

COPY --from=builder /usr/overchain-web-api/dist ./dist
COPY --from=builder /usr/overchain-web-api/node_modules ./node_modules

EXPOSE 5000
ENTRYPOINT ["node", "dist/src/main"]
