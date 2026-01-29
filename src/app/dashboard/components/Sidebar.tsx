// app/dashboard/components/Sidebar.tsx
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Home, Compass, TrendingUp, List, Plus } from "lucide-react";

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="w-64 pb-4 pr-4 h-[calc(100vh-4rem)] sticky top-20 overflow-y-auto hidden md:block border-r border-gray-800">
      <nav className="space-y-2">
        <Link href="/dashboard" className="flex items-center space-x-3 text-gray-300 hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
        </Link>
        <Link href="/dashboard/popular" className="flex items-center space-x-3 text-gray-300 hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Popular</span>
        </Link>
        <Link href="/dashboard/explore" className="flex items-center space-x-3 text-gray-300 hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <Compass className="w-5 h-5" />
            <span className="text-sm font-medium">Explore</span>
        </Link>
        <Link href="/dashboard/all" className="flex items-center space-x-3 text-gray-300 hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <List className="w-5 h-5" />
            <span className="text-sm font-medium">All</span>
        </Link>
        
        <div className="pt-4 border-t border-gray-800 my-2"></div>
        
        {session && (
          <Link href="/dashboard/create-community" className="flex items-center space-x-3 text-gray-300 hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Create Community</span>
          </Link>
        )}
      </nav>

      <div className="mt-6">
        <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">GAMES ON REDDIT</h3>
        <div className="bg-gray-800/50 p-3 rounded-lg mb-2 hover:bg-gray-800 cursor-pointer transition-colors">
          <div className="font-bold text-gray-200 text-sm">Syllo</div>
          <div className="text-xs text-gray-400">Merge syllables</div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">COMMUNITIES</h3>
        <div className="space-y-1">
          {["r/AetherGazer", "r/de", "r/movies", "r/spotify"].map((name) => (
            <div key={name} className="flex justify-between items-center px-2 py-1.5 hover:bg-gray-800 rounded-lg cursor-pointer text-sm text-gray-300 transition-colors">
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}