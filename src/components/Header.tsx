import { useState } from 'react';

type Props = { onMenu: () => void; menuOpen: boolean };

export default function Header({ onMenu, menuOpen }: Props) {
  const [profile, setProfile] = useState(false);
  return (
    <header className="header">
      <button className="menu-btn" aria-label="Open menu" aria-expanded={menuOpen} onClick={onMenu}>
        ☰
      </button>
      <span className="logo">Visual Web Developer</span>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search" className="sr-only">Search</label>
        <input id="search" type="search" placeholder="Search projects" />
      </form>
      <div className="profile">
        <button aria-haspopup="menu" aria-expanded={profile} onClick={() => setProfile((v) => !v)}>
          Profile menu
        </button>
        {profile && (
          <ul role="menu" aria-label="Profile">
            <li role="none"><button role="menuitem">Account</button></li>
            <li role="none"><button role="menuitem">Sign out</button></li>
          </ul>
        )}
      </div>
    </header>
  );
}
