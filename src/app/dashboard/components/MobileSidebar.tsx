// app/dashboard/components/MobileSidebar.tsx
"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { Home, Compass, TrendingUp, List, Plus, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Popular", href: "/dashboard/popular", icon: TrendingUp },
  { name: "Explore", href: "/dashboard/explore", icon: Compass },
  { name: "All", href: "/dashboard/all", icon: List },
];

const emptySubscribe = () => () => {};

export default function MobileSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  /* 
    Fix for "setState synchronously within an effect":
    Using useSyncExternalStore avoids the cascading render caused by useEffect + setState.
  */
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.classList.add("overflow-hidden"); // prevent background scroll
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="relative flex-1 w-full max-w-xs bg-gray-900 h-full p-4 shadow-xl transform transition-transform duration-300 ease-in-out border-r border-gray-800"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="flex justify-between items-center mb-6 px-2">
          <span className="text-xl font-bold text-gray-100">Hikayat Forum</span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
          <div className="pt-2">
              <Link
                href="/dashboard/create-community"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Create Community</span>
              </Link>
          </div>
        </nav>

        <div className="mt-8 px-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            COMMUNITIES
          </h3>
          <div className="space-y-1">
             {["r/AetherGazer", "r/de", "r/movies", "r/spotify"].map((name) => (
                <div
                key={name}
                className="flex justify-between items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer text-gray-300 transition-colors"
                >
                <span className="text-sm">{name}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}