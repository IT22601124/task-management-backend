# Task Management Backend

Production-ready Express, TypeScript, Sequelize, MySQL API for a role-based task management system.

## Tech Stack

- Node.js, Express.js, TypeScript
- MySQL, Sequelize ORM, Sequelize CLI
- JWT authentication
- bcrypt password hashing
- express-validator validation
- Standardized API responses and global error handling

## Setup

```bash
npm install
cp .env.example .env
```

Create a MySQL database:

```sql
CREATE DATABASE task_management;
```

Update `.env`, then run:

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

## Required Packages

Runtime:

```bash
npm install express cors helmet dotenv sequelize mysql2 jsonwebtoken bcryptjs express-validator
```

Development:

```bash
npm install -D typescript ts-node-dev sequelize-cli @types/node @types/express @types/cors @types/jsonwebtoken @types/bcryptjs
```

## API

Base URL: `http://localhost:5000`

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Users:

- `GET /api/users` admin only

Tasks:

- `GET /api/tasks?title=&priority=&status=&due_date=&page=1&limit=10&sortBy=created_at&sortOrder=DESC`
- `GET /api/tasks/stats`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Demo Accounts

After seeding:

- Admin: `admin@example.com` / `Password123!`
- User: `user@example.com` / `Password123!`

## Deployment

Render or Railway backend:

1. Create a new Node service from this repository.
2. Set build command: `npm install && npm run build`.
3. Set start command: `npm start`.
4. Add environment variables from `.env.example`.
5. Run migrations using the platform shell: `npm run db:migrate && npm run db:seed`.

Railway MySQL:

1. Create a Railway MySQL database.
2. Copy host, port, database, username, and password into backend environment variables.
3. Use a strong `JWT_SECRET`.

Frontend integration:

- Set `FRONTEND_URL` to the deployed Vercel URL.
- Set the frontend API base URL to the deployed backend URL.
