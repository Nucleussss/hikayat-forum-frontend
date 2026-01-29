// app/dashboard/components/PostCard.tsx
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MessageCircle, ChevronUp } from 'lucide-react';

interface PostProps {
  post: {
    id: string;
    title: string;
    community: string;
    author: string;
    createdAt: string;
    content: string;
    upvotes: number;
    comments: number;
  };
}

export default function PostCard({ post }: PostProps) {
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <div
      className="bg-gray-800 p-3 md:p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition"
      onClick={handlePostClick}
    >
      <div className="flex items-center space-x-2 mb-2">
        <Image
          src="/default-avatar.png"
          alt="Avatar"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className="text-xs md:text-sm text-gray-400">
          r/{post.community} • {post.createdAt}
        </span>
      </div>
      <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{post.title}</h2>
      <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 line-clamp-3">{post.content}</p>
      <div className="flex items-center space-x-3 md:space-x-4 text-xs md:text-sm text-gray-400">
        <div className="flex px-2 py-1 bg-gray-600 text-white rounded-full items-center gap-1 md:gap-2">
            <ChevronUp className="w-4 h-4 md:w-5 md:h-5" color="currentColor" strokeWidth={2} />
            <span>{post.upvotes}</span>
        </div>
        <div className="flex px-2 py-1 bg-gray-600 text-white rounded-full items-center gap-1 md:gap-2">
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" color="currentColor" strokeWidth={2} />
            <span>{post.comments}</span>
        </div>
        <button className="px-3 py-1 bg-blue-600 text-white rounded-full">Join</button>
      </div>
    </div>
  );
}