import { useEffect, useMemo, useState } from 'react';
import { Activity, ArrowDownRight, CalendarDays, CirclePlus, CreditCard, Search, TrendingUp, Wallet, Pencil, Trash2, ReceiptText, RefreshCw } from 'lucide-react';
import ExpenseForm from '../components/ExpenseForm.jsx';
import StatCard from '../components/StatCard.jsx';
import { expenseApi } from '../services/api.js';

const money = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(amount || 0));
const currentMonth = () => new Date().toISOString().slice(0, 7);
const categoryColors = ['#2c7661', '#d6a04a', '#7198bb', '#b88bca', '#d47d67', '#8b9c65', '#648e95', '#bc9c76', '#8a8c98'];

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ total: 0, count: 0, byCategory: [] });
  const [month, setMonth] = useState(currentMonth());
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  async function load() {
    setLoading(true); setError('');
    try {
      const [list, stats] = await Promise.all([
        expenseApi.list({ search, category, month, page: 1, limit: 100 }),
        expenseApi.summary(month)
      ]);
      setExpenses(list.data || []);
      setSummary(stats.data || { total: 0, count: 0, byCategory: [] });
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, [month, category, search]);

  const maxCategory = useMemo(() => Math.max(1, ...(summary.byCategory || []).map((c) => c.total)), [summary]);
  const allTimeTotal = useMemo(() => expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0), [expenses]);

  async function save(data) {
    setBusy(true);
    try {
      if (editing) await expenseApi.update(editing._id, data);
      else await expenseApi.create(data);
      setFormOpen(false); setEditing(null); setNotice(editing ? 'Expense updated.' : 'Expense added.');
      await load();
    } finally { setBusy(false); }
  }

  async function remove(item) {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    try { await expenseApi.remove(item._id); setNotice('Expense deleted.'); await load(); }
    catch (e) { setError(e.message); }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Spendwise home"><span className="brand-mark"><Wallet size={22}/></span><span>spendwise<small>PERSONAL FINANCE</small></span></a>
        <div className="side-label">WORKSPACE</div>
        <a className="nav-item active" href="#dashboard"><Activity size={18}/> Overview</a>
        <a className="nav-item" href="#transactions"><ReceiptText size={18}/> Transactions</a>
        <div className="sidebar-bottom"><div className="sidebar-tip"><span className="tip-spark">✦</span><p>Small steps today,<br/><b>stronger habits tomorrow.</b></p><small>Make every rupee count.</small></div><div className="profile"><div className="avatar">S</div><div><b>My finances</b><small>Personal workspace</small></div></div></div>
      </aside>

      <section className="main-area" id="dashboard">
        <header className="topbar"><div><span className="breadcrumb">Workspace / <b>Overview</b></span><h1>Your money, in focus.</h1><p className="subheading">A clear picture of where your money goes.</p></div><button className="button button-primary add-top" onClick={() => { setEditing(null); setFormOpen(true); }}><CirclePlus size={17}/> Add expense</button></header>

        {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss message">×</button></div>}
        {error && <div className="error-banner" role="alert"><span>{error}</span><button className="button button-quiet" onClick={load}><RefreshCw size={15}/> Retry</button></div>}

        <div className="summary-heading"><div><p className="eyebrow">MONTHLY SNAPSHOT</p><h2>Overview</h2></div><label className="month-picker"><CalendarDays size={16}/><input aria-label="Choose month" type="month" value={month} onChange={(e) => setMonth(e.target.value)}/></label></div>
        <section className="stats-grid" aria-label="Spending summary">
          <StatCard label="Total this month" value={money(summary.total)} note="Recorded spending" icon={Wallet} tone="stat-featured"/>
          <StatCard label="Transactions" value={summary.count || 0} note="Expenses in selected month" icon={CreditCard}/>
          <StatCard label="Categories used" value={(summary.byCategory || []).length} note="Different spending areas" icon={Activity}/>
          <StatCard label="Average expense" value={money(summary.count ? summary.total / summary.count : 0)} note="Per transaction this month" icon={TrendingUp}/>
        </section>

        <section className="insights-grid">
          <article className="panel category-panel"><div className="panel-heading"><div><p className="eyebrow">SPENDING PATTERN</p><h3>By category</h3></div><span className="soft-icon"><ArrowDownRight size={18}/></span></div>
            {loading ? <div className="skeleton-block"/> : (summary.byCategory || []).length === 0 ? <div className="mini-empty">Your category breakdown will appear here after you add expenses.</div> :
              <div className="category-list">{summary.byCategory.map((item, i) => <div className="category-row" key={item.category}><div className="category-label"><span className="category-dot" style={{ background: categoryColors[i % categoryColors.length] }}/><span>{item.category}</span><b>{money(item.total)}</b></div><div className="bar-track"><div className="bar-fill" style={{ width: `${Math.max(3, item.total / maxCategory * 100)}%`, background: categoryColors[i % categoryColors.length] }}/></div></div>)}</div>}
          </article>
          <article className="panel note-panel"><div className="note-art"><div className="note-circle circle-one"/><div className="note-circle circle-two"/><TrendingUp size={30}/></div><p className="eyebrow">A GOOD HABIT</p><h3>Awareness is the first step.</h3><p>Track each expense to spot patterns, plan ahead and make confident choices with your money.</p><div className="note-footer"><span>MONTH SELECTED</span><b>{month ? new Date(`${month}-02`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'All months'}</b></div></article>
        </section>

        <section className="panel transactions-panel" id="transactions">
          <div className="transactions-heading"><div><p className="eyebrow">YOUR RECORDS</p><h3>Recent transactions</h3><p className="muted">Review and manage your spending.</p></div><span className="record-count">{expenses.length} shown</span></div>
          <div className="filters"><label className="search-box"><Search size={17}/><input aria-label="Search expenses" placeholder="Search expenses..." value={search} onChange={(e) => setSearch(e.target.value)}/></label><select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)}><option value="">All categories</option>{['Food','Transport','Shopping','Bills','Health','Education','Entertainment','Housing','Other'].map((c) => <option key={c}>{c}</option>)}</select></div>
          <div className="table-wrap"><table><thead><tr><th>EXPENSE</th><th>CATEGORY</th><th>DATE</th><th>PAYMENT</th><th className="amount-cell">AMOUNT</th><th aria-label="Actions"/></tr></thead><tbody>
            {loading ? <tr><td colSpan="6" className="table-message">Loading your expenses…</td></tr> :
              expenses.length === 0 ? <tr><td colSpan="6" className="table-message"><div className="empty-state"><span className="empty-icon"><ReceiptText size={23}/></span><b>No expenses found</b><span>Try changing your filters or add your first expense.</span><button className="button button-primary" onClick={() => { setEditing(null); setFormOpen(true); }}><CirclePlus size={16}/> Add expense</button></div></td></tr> :
              expenses.map((item, i) => <tr key={item._id}><td><div className="expense-title"><span className="expense-symbol" style={{ background: `${categoryColors[i % categoryColors.length]}18`, color: categoryColors[i % categoryColors.length] }}>{(item.title || '?').slice(0,1).toUpperCase()}</span><span><b>{item.title}</b>{item.notes && <small>{item.notes}</small>}</span></div></td><td><span className="category-pill">{item.category}</span></td><td>{new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td><td>{item.paymentMode}</td><td className="amount-cell">{money(item.amount)}</td><td><div className="row-actions"><button aria-label={`Edit ${item.title}`} onClick={() => { setEditing(item); setFormOpen(true); }}><Pencil size={15}/></button><button aria-label={`Delete ${item.title}`} onClick={() => remove(item)}><Trash2 size={15}/></button></div></td></tr>)}
          </tbody></table></div>
          <div className="table-footer"><span>Showing matching records for {month || 'all dates'}</span><span className="footer-total">Visible total <b>{money(allTimeTotal)}</b></span></div>
        </section>
        <footer className="page-footer"><span>SPENDWISE <span className="footer-dot">●</span> PERSONAL EXPENSE TRACKER</span><span>Built for more mindful spending.</span></footer>
      </section>
      {formOpen && <ExpenseForm initial={editing} onSubmit={save} onClose={() => { setFormOpen(false); setEditing(null); }} busy={busy}/>}
    </main>
  );
}
