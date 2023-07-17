FROM node:18-alpine AS base
RUN apk add --no-cache git
RUN npm i -g pnpm

FROM base as depends
WORKDIR /app
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm install

FROM base AS deploy
WORKDIR /app
COPY ["index.js", "./"]
COPY --from=depends /app/node_modules ./node_modules

EXPOSE 9999

CMD ["node", "index.js"]
