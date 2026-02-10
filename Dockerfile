FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY client/package.json client/package-lock.json ./client/
RUN cd client && npm ci

COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci

COPY client/ ./client/
COPY server/ ./server/

RUN cd client && npm run build
RUN cd server && npx prisma generate

RUN mkdir -p /app/server/uploads

EXPOSE 5000

CMD cd /app/server && npm start