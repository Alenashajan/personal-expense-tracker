import mongoose from 'mongoose';
import Expense from '../models/Expense.js';

function validMonth(month) {
  return typeof month === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
}
function monthRange(month) {
  const [year, monthNumber] = month.split('-').map(Number);
  return { start: new Date(Date.UTC(year, monthNumber - 1, 1)), end: new Date(Date.UTC(year, monthNumber, 1)) };
}
function dateFilter(month) {
  if (!month) return {};
  if (!validMonth(month)) {
    const error = new Error('Month must use YYYY-MM format.');
    error.status = 400;
    throw error;
  }
  const { start, end } = monthRange(month);
  return { date: { $gte: start, $lt: end } };
}

export async function listExpenses(req, res, next) {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page || '1', 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit || '50', 10) || 50));
    const filter = { ...dateFilter(req.query.month) };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) {
      const search = String(req.query.search).trim().slice(0, 100);
      if (search) {
        const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        filter.$or = [{ title: { $regex: escaped, $options: 'i' } }, { notes: { $regex: escaped, $options: 'i' } }];
      }
    }
    const [data, total] = await Promise.all([
      Expense.find(filter).sort({ date: -1, createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Expense.countDocuments(filter)
    ]);
    res.json({ success: true, data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
}

export async function getExpense(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid expense ID.' });
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found.' });
    res.json({ success: true, data: expense });
  } catch (error) { next(error); }
}

function normalizePayload(body) {
  const allowed = ['title', 'category', 'amount', 'date', 'paymentMode', 'notes'];
  const payload = {};
  for (const key of allowed) if (body[key] !== undefined) payload[key] = body[key];
  if (payload.title !== undefined) payload.title = String(payload.title).trim();
  if (payload.amount !== undefined) payload.amount = Number(payload.amount);
  if (payload.date !== undefined) {
    const date = new Date(payload.date);
    if (Number.isNaN(date.getTime())) {
      const error = new Error('Please provide a valid date.');
      error.status = 400;
      throw error;
    }
    payload.date = date;
  }
  return payload;
}

export async function createExpense(req, res, next) {
  try {
    const expense = await Expense.create(normalizePayload(req.body || {}));
    res.status(201).json({ success: true, data: expense, message: 'Expense created.' });
  } catch (error) { next(error); }
}

export async function updateExpense(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid expense ID.' });
    const expense = await Expense.findByIdAndUpdate(req.params.id, normalizePayload(req.body || {}), {
      new: true, runValidators: true
    });
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found.' });
    res.json({ success: true, data: expense, message: 'Expense updated.' });
  } catch (error) { next(error); }
}

export async function deleteExpense(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid expense ID.' });
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found.' });
    res.json({ success: true, message: 'Expense deleted.' });
  } catch (error) { next(error); }
}

export async function getSummary(req, res, next) {
  try {
    const month = req.query.month;
    const match = dateFilter(month);
    const [totals] = await Expense.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);
    const byCategory = await Expense.aggregate([
      { $match: match },
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $project: { _id: 0, category: '$_id', total: 1, count: 1 } }
    ]);
    res.json({ success: true, data: { total: totals?.total || 0, count: totals?.count || 0, byCategory } });
  } catch (error) { next(error); }
}
