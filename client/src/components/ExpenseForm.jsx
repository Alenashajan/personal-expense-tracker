import { useEffect, useState } from 'react';
import { X, Plus, Save } from 'lucide-react';

const blank = () => ({
  title: '', category: 'Food', amount: '', date: new Date().toISOString().slice(0, 10),
  paymentMode: 'UPI', notes: ''
});

export default function ExpenseForm({ initial, onSubmit, onClose, busy }) {
  const [form, setForm] = useState(initial || blank());
  const [error, setError] = useState('');

  useEffect(() => setForm(initial || blank()), [initial]);

  const update = (event) => setForm((old) => ({ ...old, [event.target.name]: event.target.value }));

  async function submit(event) {
    event.preventDefault();
    setError('');
    if (!form.title.trim()) return setError('Please enter an expense title.');
    if (!form.amount || Number(form.amount) <= 0) return setError('Amount must be greater than zero.');
    if (!form.date) return setError('Please select a date.');
    try {
      await onSubmit({ ...form, title: form.title.trim(), amount: Number(form.amount) });
    } catch (e) {
      setError(e.message || 'Could not save this expense.');
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="modal-heading">
          <div><p className="eyebrow">{initial ? 'UPDATE RECORD' : 'NEW RECORD'}</p><h2 id="form-title">{initial ? 'Edit expense' : 'Add an expense'}</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close form"><X size={19} /></button>
        </div>
        <form onSubmit={submit} className="expense-form">
          <label>Expense title<input name="title" value={form.title} onChange={update} placeholder="e.g. Weekly groceries" maxLength="100" required /></label>
          <div className="form-grid">
            <label>Amount (₹)<input name="amount" type="number" min="0.01" step="0.01" value={form.amount} onChange={update} placeholder="0.00" required /></label>
            <label>Date<input name="date" type="date" value={form.date} onChange={update} required /></label>
          </div>
          <div className="form-grid">
            <label>Category<select name="category" value={form.category} onChange={update}>{['Food','Transport','Shopping','Bills','Health','Education','Entertainment','Housing','Other'].map((c) => <option key={c}>{c}</option>)}</select></label>
            <label>Payment mode<select name="paymentMode" value={form.paymentMode} onChange={update}>{['UPI','Cash','Card','Net Banking','Other'].map((c) => <option key={c}>{c}</option>)}</select></label>
          </div>
          <label>Notes <span className="optional">Optional</span><textarea name="notes" value={form.notes} onChange={update} rows="3" maxLength="500" placeholder="Add a short note..." /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-actions"><button type="button" className="button button-quiet" onClick={onClose}>Cancel</button><button className="button button-primary" disabled={busy}>{initial ? <Save size={16}/> : <Plus size={16}/>} {busy ? 'Saving…' : initial ? 'Save changes' : 'Add expense'}</button></div>
        </form>
      </section>
    </div>
  );
}
