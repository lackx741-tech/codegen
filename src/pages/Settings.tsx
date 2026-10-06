import { useState } from 'react';

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <>
      <h1>Settings</h1>
      <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
        <label htmlFor="name">Display name</label>
        <input id="name" placeholder="Your name" />
        <label><input type="checkbox" /> Email notifications</label>
        <button type="button" onClick={() => setOpen(true)}>Open options</button>
        <button type="submit">Save</button>
      </form>
      {saved && <p role="status">Settings saved</p>}
      {open && (
        <dialog open aria-label="Options">
          <h2>Options</h2>
          <button onClick={() => setOpen(false)}>Confirm</button>
        </dialog>
      )}
    </>
  );
}
