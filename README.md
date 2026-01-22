# Региональный симулятор 2.0

Полнофункциональный веб-сайт - аналог "Регионального симулятора 2.0" от GSPM РАНХиГС с админ-панелью для управления контентом.

## Технологический стек

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **База данных:** PostgreSQL
- **ORM:** Prisma
- **Аутентификация:** JWT

## Требования

- Node.js 18+
- PostgreSQL 14+

## Установка

### 1. Клонирование и установка зависимостей

```bash
# Установка зависимостей клиента
cd client
npm install

# Установка зависимостей сервера
cd ../server
npm install
```

### 2. Настройка базы данных

1. Создайте базу данных PostgreSQL:
```sql
CREATE DATABASE regional_simulator;
```

2. Настройте файл `.env` в папке `server`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/regional_simulator"
JWT_SECRET="your-super-secret-key"
PORT=5000
```

3. Выполните миграции и сидирование:
```bash
cd server
npx prisma db push
npm run db:seed
```

## Запуск

### Режим разработки

```bash
# Терминал 1 - Сервер
cd server
npm run dev

# Терминал 2 - Клиент
cd client
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Доступ к админ-панели

После сидирования базы данных:

- **URL:** http://localhost:3000/admin
- **Email:** admin@simulator.ru
- **Пароль:** admin123

## Структура проекта

```
Симулятор/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # UI компоненты
│   │   ├── pages/             # Страницы
│   │   ├── services/          # API сервисы
│   │   └── context/           # React Context
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── routes/            # API маршруты
│   │   ├── middleware/        # Middleware
│   │   └── utils/             # Утилиты
│   ├── prisma/
│   │   └── schema.prisma      # Схема БД
│   └── package.json
│
└── README.md
```

## API Endpoints

### Публичные
- `GET /api/programs` - список программ
- `GET /api/programs/:id` - детали программы
- `GET /api/projects` - список проектов
- `GET /api/news` - список новостей
- `GET /api/experts` - список экспертов
- `POST /api/contact` - отправка заявки
- `GET /api/settings` - настройки сайта

### Защищённые (требуют JWT)
- `POST /api/auth/login` - авторизация
- `GET /api/auth/me` - текущий пользователь
- CRUD `/api/admin/programs` - управление программами
- CRUD `/api/admin/projects` - управление проектами
- CRUD `/api/admin/news` - управление новостями
- CRUD `/api/admin/experts` - управление экспертами
- `GET/DELETE /api/admin/contacts` - заявки
- `POST /api/admin/upload` - загрузка файлов
- `GET/PUT /api/admin/settings` - настройки

## Лицензия

MIT
