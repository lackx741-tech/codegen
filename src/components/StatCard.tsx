type Props = { label: string; value: string };

export default function StatCard({ label, value }: Props) {
  return (
    <article className="stat-card" data-testid="stat-card">
      <h3>{label}</h3>
      <p>{value}</p>
    </article>
  );
}
