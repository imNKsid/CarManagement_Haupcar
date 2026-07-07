# CarManagement_Haupcar_Assignment

# Car Management - Fullstack Web Application

A full-stack web application for managing company cars — add, view, edit, and delete car records.

## Tech Stack

**Frontend:** React, Vite, TypeScript, Ant Design, Axios, React Router, React Hook Form
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

frontend/
  src/
    components/      # reusable UI components (e.g. CarFormModal)
    pages/           # route-level pages (e.g. Dashboard)
    services/        # Axios API clients
    hooks/           # custom React hooks (e.g. useCars)
    types/           # shared TypeScript types
    App.tsx          # app routes
```

## Prerequisites

- Node.js 18+ and npm

## Backend Setup

Create a .env file, and add these lines -

```
DATABASE_URL="file:./dev.db"
PORT=4000
```

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

## Frontend Setup

Create a .env file, and add this line -

```
VITE_API_BASE_URL=http://localhost:4000/api
```

```bash
cd frontend
yarn

# Start the dev server (http://localhost:5173)
yarn dev
```

The frontend reads the API base URL from `frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:4000/api
```

Make sure the backend is running on port 4000 (or update `VITE_API_BASE_URL` accordingly) before using the app.

Other useful frontend scripts:

```bash
yarn build      # type-check and build for production
yarn preview     # preview the production build locally
```

## Running the App

1. Start the backend: `cd backend && yarn dev`
2. Start the frontend: `cd frontend && yarn dev`
3. Open http://localhost:5173 in your browser

## Features

- **Dashboard** — view all cars in an Ant Design table (Registration, Brand, Model, Year, Color, Notes) with edit (pencil) and delete (bin) actions per row, plus an "Add Car" button
- **Add/Edit Modal** — a single modal (driven by React Hook Form) used for both creating and editing a car, with field validation
- Confirmation prompt before deleting a car ("Are you sure?" with Cancel/Delete)
- Success/error toast messages for add, update, and delete actions
- Loading indicators while data is being fetched or mutated

## REST API

Base URL: `http://localhost:4000/api`

| Method | Endpoint         | Description         | Success | Errors            |
|--------|------------------|----------------------|---------|--------------------|
| GET    | `/cars`          | Returns all cars     | 200     | 500                |
| GET    | `/cars/:id`      | Returns one car      | 200     | 400, 404, 500      |
| POST   | `/cars`          | Creates a car        | 201     | 400, 500           |
| PUT    | `/cars/:id`      | Updates a car        | 200     | 400, 404, 500      |
| DELETE | `/cars/:id`      | Deletes a car        | 200     | 400, 404, 500      |

### Car object

```json
{
  "id": 1,
  "registrationNumber": "KA01AB1234",
  "brand": "Toyota",
  "model": "Innova",
  "year": 2022,
  "color": "White",
  "notes": "Optional notes",
  "createdAt": "2026-07-06T09:11:08.927Z",
  "updatedAt": "2026-07-06T09:11:08.927Z"
}
```

`registrationNumber` is unique — creating or updating a car with a duplicate registration number returns `400`.
