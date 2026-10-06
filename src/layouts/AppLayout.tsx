import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="layout">
      <Header onMenu={() => setOpen((v) => !v)} menuOpen={open} />
      <Sidebar open={open} onNavigate={() => setOpen(false)} />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
