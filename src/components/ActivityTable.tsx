const rows = [
  { user: 'Alice', action: 'Created project', time: '2 min ago' },
  { user: 'Bob', action: 'Deployed build', time: '15 min ago' },
  { user: 'Carol', action: 'Updated settings', time: '1 hour ago' },
];

export default function ActivityTable() {
  return (
    <table aria-label="Recent Activity">
      <caption>Recent Activity</caption>
      <thead>
        <tr><th>User</th><th>Action</th><th>Time</th></tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.user}><td>{r.user}</td><td>{r.action}</td><td>{r.time}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
