// app/dashboard/components/Feed.tsx
import PostCard from './PostCard';

interface post {
    id: string,
    title: string,
    community: string,
    author: string,
    createdAt: string,
    content: string,
    upvotes: number,
    comments: number,  
}

export default function Feed({ posts }: { posts: post[] }) {

  if (posts.length === 0) {
    // return empty feed
    return (
      <div className="space-y-6">
        <p className="text-center text-gray-500">No posts found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}