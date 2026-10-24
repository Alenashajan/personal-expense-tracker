import { Router } from 'express';
import { createExpense, deleteExpense, getExpense, getSummary, listExpenses, updateExpense } from '../controllers/expenseController.js';

const router = Router();
router.get('/', listExpenses);
router.get('/summary', getSummary);
router.get('/:id', getExpense);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
export default router;
