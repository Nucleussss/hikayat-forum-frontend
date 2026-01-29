// app/dashboard/components/MobileNav.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/dashboard', icon: '🏠' },
  { name: 'Popular', href: '/dashboard/popular', icon: '🔥' },
  { name: 'Create', href: '/dashboard/create', icon: '+' },
  { name: 'Messages', href: '/dashboard/messages', icon: '✉️' },
  { name: 'Profile', href: '/profile', icon: '👤' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex justify-around items-center p-2 md:hidden">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex flex-col items-center p-2 rounded ${
            pathname === item.href ? 'text-orange-500' : 'text-gray-400'
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-xs mt-1">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}