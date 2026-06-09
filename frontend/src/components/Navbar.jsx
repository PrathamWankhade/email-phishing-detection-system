import React from 'react';

const links = [
  ['scan', 'Scanner'],
  ['dashboard', 'Dashboard'],
  ['analytics', 'Analytics'],
  ['about', 'Architecture'],
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#scan" className="flex items-center gap-3 font-bold tracking-tight">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-400 text-slate-950 shadow-glow">AI</span>
          <span>PhishGuard</span>
        </a>
        <div className="hidden gap-6 text-sm text-slate-300 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={`#${href}`} className="transition hover:text-cyan-300">{label}</a>
          ))}
        </div>
      </nav>
    </header>
  );
}
