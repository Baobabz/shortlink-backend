# Build stage
FROM node:22 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:22-slim

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/docker-entrypoint.sh .
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.env ./.env
COPY --from=build /app/package.json ./package.json

RUN npx prisma generate
RUN chmod +x ./docker-entrypoint.sh
RUN apt-get update -y && apt-get install -y openssl

EXPOSE 3001

ENTRYPOINT [ "/bin/sh", "./docker-entrypoint.sh" ]