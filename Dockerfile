ARG NODE_VERSION=20.19.0

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

USER node

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

CMD node main.js