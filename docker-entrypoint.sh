#!/bin/sh

npx prisma migrate dev --name init
npx prisma migrate deploy && \
npm run start:prod
