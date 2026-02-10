FROM node:20-alpine

WORKDIR /app

# Копируем и ставим зависимости клиента
COPY client/package.json client/package-lock.json ./client/
RUN cd client && npm ci

# Копируем и ставим зависимости сервера
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci

# Копируем весь код
COPY client/ ./client/
COPY server/ ./server/

# Собираем React-клиент
RUN cd client && npm run build

# Генерируем Prisma Client
RUN cd server && npx prisma generate

# Создаём папку для загрузок
RUN mkdir -p /app/server/uploads

EXPOSE 5000

# При запуске: миграция + seed + старт
CMD cd /app/server && npx prisma db push && node prisma/seed.js && npm start