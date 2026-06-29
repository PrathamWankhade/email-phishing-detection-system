import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';

const links = [
  { to: '/', label: 'Home', icon: 'shield' },
  { to: '/scanner', label: 'Scanner', icon: 'scan' },
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/analytics', label: 'Analytics', icon: 'analytics' },
  { to: '/contact', label: 'Contact', icon: 'contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-300 bg-white shadow-card">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 md:px-6">
        {/* Left: Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 font-bold text-text-primary no-underline">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 shadow-sm">
            <Icon name="shieldCheck" size={18} className="text-white" />
          </span>
          <span className="hidden text-base tracking-tight sm:inline">PhishGuard</span>
        </NavLink>

        {/* Center: Nav Links */}
        <div className="hidden items-center gap-0.5 md:flex">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
               className={({ isActive }) =>
                 `nav-underline flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium no-underline anim-standard ${
                   isActive
                     ? 'bg-primary-50 text-primary-500 active'
                     : 'text-text-secondary hover:bg-surface-100 hover:text-text-primary'
                 }`
               }
            >
              <Icon name={icon} size={16} />
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary anim-fast hover:bg-surface-100"
            aria-label="Search"
          >
            <Icon name="search" size={18} />
          </button>

          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary anim-fast hover:bg-surface-100"
            aria-label="Notifications"
          >
            <Icon name="notification" size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-danger-500 ring-2 ring-white" />
          </button>

          {/* Mobile menu toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary anim-fast hover:bg-surface-100 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-surface-300 bg-white px-4 py-3 md:hidden">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium no-underline transition ${
                  isActive
                    ? 'bg-primary-50 text-primary-500'
                    : 'text-text-secondary hover:bg-surface-100 hover:text-text-primary'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              <Icon name={icon} size={18} />
              {label}
            </NavLink>
          ))}
        </div>
      )}

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t border-surface-300 bg-surface-50 px-4 py-3">
          <div className="mx-auto flex max-w-2xl items-center gap-3 rounded-xl border border-surface-300 bg-white px-4 py-2 shadow-sm">
            <Icon name="search" size={18} className="text-text-disabled" />
            <input
              type="text"
              placeholder="Search scans, URLs, or senders..."
              className="w-full border-0 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-disabled"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="rounded-lg p-1 text-text-disabled transition hover:bg-surface-100 hover:text-text-secondary"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
