// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import MobileSidebar from "./components/MobileSidebar";
import SideBar from "./components/Sidebar";
import RightPanel from "./components/RightPanel";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import { fetcher } from "@/lib/fetcher";
import { Post } from "@/types/post";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// Interface for API response
interface ApiResponse {
  posts: Post[];
  has_more: boolean;
}

// Helper to format Google Timestamp
const formatTimestamp = (ts: { seconds: number; nanos: number } | string) => {
  if (typeof ts === 'string') return ts;

  // Handle null or undefined
  if (!ts) return 'Just now';

  // Convert to Date
  const date = new Date(ts.seconds * 1000);
  return date.toLocaleDateString(undefined, { 
    month: 'short', day: 'numeric', year: 'numeric' 
  });
};

const getkey = (pageIndex: number, previousPageData: ApiResponse | null) => {
  // First page always loads
  if (pageIndex === 0) {
    return `/api/posts/listpost?page=1&limit=10`;
  }

  // Stop if previous page has no more data
  if (!previousPageData || !previousPageData.has_more) {
    return null;
  }

  // return the URL with page and limit
  return `/api/posts/listpost?page=${pageIndex + 1}&limit=10`;
}

export default function DashboardPage() {

  const { ref, inView } = useInView();
  
  // Pass params in the URL string
  const { data: apiResponse, setSize, error, isLoading } = useSWRInfinite<ApiResponse>(
    getkey,
    fetcher
  );

  console.log("apiResponse",apiResponse);

  // Extract posts from API response
  const rawPosts = apiResponse ? apiResponse.flatMap((page) => page.posts) : [];
  
  // Transform API data to match Feed component expectation
  const posts = Array.isArray(rawPosts) ? rawPosts.map((p) => ({
    id: p.id,
    title: p.title,
    community: p.community_id || "Unknown Community", // Fallback as API returns ID
    author: p.author_id || "Unknown Author",       // Fallback as API returns ID
    createdAt: formatTimestamp(p.created_at || p.createdAt || ""),
    content: p.content,
    upvotes: p.upvotes || 0,     // Default as API missing
    comments: p.comments || 0,   // Default as API missing
  })) : [];

  // Check if we've reached the end of data
  const isReachingEnd = apiResponse?.[apiResponse.length - 1]?.has_more != true;

  console.log("err :",error);

  // Load more only when needed
  useEffect(() => {
    if (inView && !isLoading) {
      setSize(prevSize => prevSize + 1);
    }
  }, [inView, isLoading, setSize]);

  // Mobile menu state 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Active tab state
  const [activeTab, setActiveTab] = useState<"hot" | "new" | "top">("hot");

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="max-w-full mx-auto flex justify-between px-0 md:px-4 lg:px-6">
        {/* Desktop Sidebar - Width fixed, sticky handled in component */}
        <SideBar />

        {/* Main Feed */}
        <main className="flex-1 max-w-3xl min-w-0 w-full px-3 md:px-4 py-4">
          <div className="flex space-x-2 border-b border-gray-800 mb-6 bg-black z-30 sticky top-16 py-2">
            {(["hot", "new", "top"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-4 text-sm font-semibold transition-colors rounded-t-md ${
                  activeTab === tab
                    ? "text-gray-100 border-b-2 border-indigo-500"
                    : "text-gray-500 hover:text-gray-300 hover:bg-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Conditional Rendering based on SWR state */}
          {isLoading ? (
            <div className="text-center py-10">Loading posts...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">Failed to load posts</div>
          ) : (
            <Feed posts={posts} />
          )}

          {/* Load more indicator */}
          {isReachingEnd ? (
            <div className="text-center py-6 text-gray-500">No more posts</div>
          ) : (
            <div ref={ref} className="py-6 text-center">
              {isLoading ? 'Loading...' : 'Scroll to load more'}
            </div>
          )}

        </main>

        {/* Right Panel (Desktop Only) */}
        <RightPanel />
      </div>

      {/* Mobile Sidebar (Overlay) */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </div>
  );
}