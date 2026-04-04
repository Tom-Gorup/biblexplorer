import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Header } from '../components/Header';

const tabs = [
  { to: '/easter/passion-week', label: 'Passion Week' },
  { to: '/easter/prophecy', label: 'Prophecy Fulfilled' },
  { to: '/easter/last-words', label: 'The Final Words' },
];

export default function EasterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-dvh w-screen bg-stone-900">
      <Header onMenuToggle={() => setSidebarOpen(o => !o)} />
      <div className="border-b border-stone-700/80 bg-stone-900/95 backdrop-blur-sm px-4 md:px-6">
        <nav className="flex gap-1 overflow-x-auto py-2">
          {tabs.map(tab => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                    : 'text-stone-400 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex flex-1 overflow-hidden relative">
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
