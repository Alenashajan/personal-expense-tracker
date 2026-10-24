export default function StatCard({ label, value, note, icon: Icon, tone = '' }) {
  return <article className={`stat-card ${tone}`}><div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon size={18}/></span></div><strong>{value}</strong><small>{note}</small></article>;
}
