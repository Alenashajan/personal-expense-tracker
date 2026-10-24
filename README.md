# Personal Expense Tracker — MERN Stack

A student-friendly MERN application for recording, editing, deleting, searching and filtering personal expenses. The dashboard includes total spending, current-month spending, expense count, and a category breakdown.

## Features
- Create, read, update and delete expense records
- Fields: title, category, amount, date, payment mode, optional notes
- Search by title or notes
- Filter by category and month
- Monthly spending summary and category totals
- Input validation on the client and server
- Loading, empty and error states
- Responsive React interface
- Express REST API with centralized error handling
- MongoDB persistence through Mongoose
- Environment-based configuration; no secrets committed

## Technology stack
- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- CSS

## Project structure
```text
Personal_Expense_Tracker_MERN/
  client/
    src/
      components/
      pages/
      services/
      App.jsx
      main.jsx
      styles.css
    .env.example
    package.json
  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      app.js
      server.js
    .env.example
    package.json
  docs/
    internship-report-draft.md
    testing-checklist.md
  .gitignore
  README.md
```

## Requirements
Install a current Node.js LTS version and npm. You also need MongoDB running locally or a MongoDB Atlas connection string.

## Setup
### 1. Start the backend
```bash
cd server
npm install
```
Copy `.env.example` to `.env` and set `MONGODB_URI` to your own MongoDB connection string.
```bash
npm run dev
```
The API runs on `http://localhost:5000` by default.

### 2. Start the frontend in another terminal
```bash
cd client
npm install
```
Copy `.env.example` to `.env`.
```bash
npm run dev
```
Open the local URL printed by Vite, normally `http://localhost:5173`.

### 3. Verify API health
Open `http://localhost:5000/api/health`. A successful response is:
```json
{"status":"ok","message":"Personal Expense Tracker API is running"}
```

## Environment variables
### server/.env
- `PORT` — API port, default 5000
- `MONGODB_URI` — MongoDB connection string
- `CLIENT_ORIGIN` — frontend origin, default `http://localhost:5173`
- `NODE_ENV` — `development` or `production`

### client/.env
- `VITE_API_URL` — API base URL, default `http://localhost:5000/api`

Do not commit real `.env` files, credentials, or database secrets.

## API contract
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/expenses` | List expenses; supports `search`, `category`, `month`, `page`, `limit` |
| GET | `/api/expenses/summary?month=YYYY-MM` | Summary for selected month |
| GET | `/api/expenses/:id` | Read one expense |
| POST | `/api/expenses` | Create an expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |

Expense JSON fields: `title`, `category`, `amount`, `date`, `paymentMode`, `notes`.

Typical status codes: `200` success, `201` created, `400` invalid input, `404` not found, `500` unexpected server error.

## Testing
Use `docs/testing-checklist.md`. You can test the API with Postman or Thunder Client. Verify valid and invalid inputs, CRUD operations, filters, monthly totals, empty states and narrow screen layouts.

## Deployment
Deploy the React client, Express API and MongoDB database separately or with compatible services. Configure production environment variables and CORS using the deployed frontend origin. Use HTTPS and verify that the frontend does not call localhost in production.

## Project scope
### MVP included
CRUD expenses, search/filter, monthly summary, category breakdown and responsive layout.

### Future enhancements
User authentication and per-user data ownership, recurring expenses, budget alerts, CSV export, charts over time, and deployment.

## Important student note
This is a project starter, not a claim that deployment or formal testing has already been completed. Add your own screenshots, testing evidence, GitHub URL and live URL after you run and verify the application.
