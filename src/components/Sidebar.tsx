import { NavLink } from 'react-router-dom';

type Props = { open: boolean; onNavigate: () => void };

const items = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/settings', label: 'Settings' },
];

export default function Sidebar({ open, onNavigate }: Props) {
  return (
    <nav className={`sidebar${open ? ' open' : ''}`} aria-label="Main navigation" data-testid="sidebar">
      <ul>
        {items.map((i) => (
          <li key={i.to}>
            <NavLink to={i.to} end onClick={onNavigate}>{i.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
