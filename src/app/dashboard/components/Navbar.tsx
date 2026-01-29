import { useState } from "react";
import { Search, MessageSquare, Bell, Plus, User, Menu, X, TrendingUp } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onMenuClick?: () => void;
}

const TRENDING_SEARCHES = [
  "React 19",
  "Next.js Performance", 
  "Tailwind Tips",
  "Community Guidelines", 
  "Hikayat Events"
];

const TrendingList = ({ className }: { className?: string }) => (
  <div className={`bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden py-2 ${className}`}>
    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
      Trending Today
    </div>
    <ul>
      {TRENDING_SEARCHES.map((term, index) => (
        <li key={index}>
          <button className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center group">
             <TrendingUp className="h-4 w-4 mr-3 text-indigo-500 group-hover:text-indigo-400" />
             {term}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isDesktopSearchFocused, setIsDesktopSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-backdrop-filter:bg-black/60">
      <div className="flex h-16 items-center px-4 relative">
        {/* Mobile Menu Button - Visible mainly on mobile if we decide to show this navbar on mobile */}
        <button
          className="mr-4 md:hidden text-gray-400 hover:text-gray-100"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo - Hide on mobile when search is open to save space */}
        {!isMobileSearchOpen && (
          <Link href="/dashboard" className="mr-8 flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="hidden text-xl font-bold sm:inline-block text-gray-100">
              Hikayat Forum
            </span>
          </Link>
        )}

        {/* Mobile Search Input - Takes up full width when open */}
        {isMobileSearchOpen ? (
          <div className="flex flex-1 items-center md:hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className="block w-full rounded-full border border-gray-700 bg-gray-900 py-2 pl-10 pr-10 text-gray-100 placeholder-gray-400 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
              />
              <button 
                onClick={() => setIsMobileSearchOpen(false)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              
              {/* Mobile Trending List - Absolute positioned below input */}
              <div className="absolute top-full left-0 right-0 mt-2 z-50 px-1">
                 <TrendingList />
              </div>
            </div>
          </div>
        ) : (
          /* Search Bar - Desktop hidden, Mobile hidden */
          /* We'll add the mobile trigger icon below */
          <div className="flex-1 max-w-xl hidden md:flex relative">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search Hikayat Forum"
                onFocus={() => setIsDesktopSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsDesktopSearchFocused(false), 200)} // Delay to allow clicks
                className="block w-full rounded-full border border-gray-700 bg-gray-900 py-2 pl-10 pr-3 text-gray-100 placeholder-gray-400 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            
            {/* Desktop Trending List - Absolute positioned dropdown */}
            {isDesktopSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50">
                <TrendingList />
              </div>
            )}
          </div>
        )}

        {/* Right Actions */}
        <div className={`flex items-center justify-end space-x-4 ${isMobileSearchOpen ? 'w-auto ml-2' : 'flex-1'}`}>
          
          {/* Mobile Search Trigger */}
          {!isMobileSearchOpen && (
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-gray-100"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <Search className="h-6 w-6" />
            </button>
          )}

          {/* Action Icons */}
          <div className="hidden items-center space-x-2 md:flex">
             <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-full transition-colors">
               <MessageSquare className="h-5 w-5" />
             </button>
             <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-full transition-colors">
               <Bell className="h-5 w-5" />
             </button>
             <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-full transition-colors">
               <Plus className="h-5 w-5" />
             </button>
          </div>

          {/* User Menu */}
          {!isMobileSearchOpen && (
            <div className="flex items-center space-x-2 p-1 hover:bg-gray-800 rounded-md cursor-pointer border border-transparent hover:border-gray-700 transition-all">
               <div className="h-8 w-8 rounded bg-gray-700 flex items-center justify-center relative overflow-hidden">
                  <User className="h-5 w-5 text-gray-300" />
               </div>
               <div className="hidden lg:flex flex-col text-xs">
                  <span className="font-medium text-gray-100">User Name</span>
                  <span className="text-gray-500">1.2k karma</span>
               </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
