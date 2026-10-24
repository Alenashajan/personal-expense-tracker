import mongoose from 'mongoose';

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Education', 'Entertainment', 'Housing', 'Other'];
const paymentModes = ['UPI', 'Cash', 'Card', 'Net Banking', 'Other'];

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Expense title is required'], trim: true, maxlength: 100 },
  category: { type: String, required: true, enum: categories },
  amount: { type: Number, required: true, min: [0.01, 'Amount must be greater than zero'] },
  date: { type: Date, required: true },
  paymentMode: { type: String, required: true, enum: paymentModes },
  notes: { type: String, trim: true, maxlength: 500, default: '' }
}, { timestamps: true });

expenseSchema.index({ date: -1 });
expenseSchema.index({ category: 1, date: -1 });
export { categories, paymentModes };
export default mongoose.model('Expense', expenseSchema);
