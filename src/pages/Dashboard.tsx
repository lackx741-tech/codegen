import ActivityTable from '../components/ActivityTable';
import StatCard from '../components/StatCard';

const stats = [
  { label: 'Users', value: '1,204' },
  { label: 'Revenue', value: '$32,400' },
  { label: 'Sessions', value: '8,912' },
  { label: 'Conversion', value: '4.2%' },
];

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <section aria-label="Statistics" className="stats">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </section>
      <ActivityTable />
    </>
  );
}
