import React from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Games', href: '/games' },
  { label: 'Leaderboards', href: '/leaderboard' },
  { label: 'Forums', href: '/forum' },
  { label: 'Wiki', href: '/wiki' },
  { label: 'Rules & Policies', href: '/rules' },
  { label: 'Support', href: '/support' },
  { label: 'Store', href: '/store' }
];

const Navigation = () => (
  <nav className="flex justify-center mb-4">
    <div className="flex bg-yellow-600 rounded-lg overflow-hidden border-2 border-yellow-800">
      {navItems.map((item, idx) => (
        <a key={item.label} href={item.href} className={`nav-button px-6 py-2 border-r border-yellow-800 ${idx === navItems.length - 1 ? '' : 'border-r'}`}>
          {item.label}
        </a>
      ))}
    </div>
    <button className="ml-2 bg-yellow-600 px-3 py-2 rounded border-2 border-yellow-800">🔍</button>
  </nav>
);

export default Navigation;
