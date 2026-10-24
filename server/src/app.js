import express from 'express';
import cors from 'cors';
import expenseRoutes from './routes/expenseRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((origin) => origin.trim());

app.use(cors({ origin(origin, callback) {
  if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error('Origin is not allowed by CORS.'));
} }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Personal Expense Tracker API is running' }));
app.use('/api/expenses', expenseRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
