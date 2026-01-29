// app/dashboard/components/RightPanel.tsx
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function RightPanel() {
  const { data: session } = useSession();

  return (
    <div className="w-80 h-[calc(100vh-4rem)] sticky top-20 hidden lg:block space-y-4">
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="p-3 bg-gray-700/50 border-b border-gray-700">
           <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Recent Posts</h3>
        </div>
        <div className="divide-y divide-gray-700">
          <div className="p-3 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-xs text-gray-300 font-medium">r/Ubuntu</span>
            </div>
            <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed">Freesync or VRR(Variable Refresh Rate) on Ubuntu 25.10...</p>
            <div className="text-xs text-gray-500 mt-2">6 upvotes • 7 comments</div>
          </div>
          
          <div className="p-3 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-300 font-medium">r/TheoTown</span>
            </div>
            <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed">How do I open plugins/mods on a cracked PC version?</p>
            <div className="text-xs text-gray-500 mt-2">2 upvotes • 11 comments</div>
          </div>
        </div>
      </div>

      {session && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-3">
          <div className="flex items-center space-x-3 mb-3">
            <div className="relative w-10 h-10">
                <Image
                    src="/default-avatar.png"
                    alt="Avatar"
                    fill
                    className="rounded-full object-cover"
                />
            </div>
             <div>
                <div className="text-sm font-semibold">{session.user?.name || "User"}</div>
                <div className="text-xs text-gray-500">Karma: 1,234</div>
             </div>
          </div>
          <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium transition-colors">
            View Profile
          </button>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Trending Communities</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between group cursor-pointer">
             <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-purple-600"></div>
                <div className="text-sm font-medium group-hover:underline">r/programming</div>
             </div>
             <button className="px-3 py-1 bg-gray-700 text-xs font-medium rounded-full hover:bg-gray-600">Join</button>
          </div>
           <div className="flex items-center justify-between group cursor-pointer">
             <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-yellow-400"></div>
                <div className="text-sm font-medium group-hover:underline">r/javascript</div>
             </div>
             <button className="px-3 py-1 bg-gray-700 text-xs font-medium rounded-full hover:bg-gray-600">Join</button>
          </div>
        </div>
      </div>
    </div>
  );
}