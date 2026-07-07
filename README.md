# CarManagement_Haupcar_Assignment

# Car Management - Fullstack Web Application

A full-stack web application for managing company cars — add, view, edit, and delete car records.

## Tech Stack

**Backend:** Node.js, Express, TypeScript, Prisma ORM, REST APIs
**Database:** SQLite

## Project Structure

```
frontend/
backend/
README.md
```

```
backend/
  src/
    controllers/    # request handlers (business logic)
    routes/          # Express route definitions
    prisma/          # Prisma schema, migrations, and SQLite database
    middleware/       # error handling middleware
    app.ts           # Express app setup
    server.ts        # application entrypoint
```

## Prerequisites

- Node.js 18+ and npm

## Backend Setup

```bash
cd backend
yarn

# Apply the Prisma migration and generate the client (creates dev.db)
yarn prisma:migrate

# Start the dev server (http://localhost:4000)
yarn dev
```

The backend reads configuration from `backend/.env`:

```
DATABASE_URL="file:./dev.db"
PORT=4000
```

Other useful backend scripts:

```bash
yarn build             # compile TypeScript to dist/
yarn start                 # run the compiled server
yarn prisma:studio     # open Prisma Studio to inspect the database
```
