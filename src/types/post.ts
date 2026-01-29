export interface Post {
  id: string;
  title: string;
  community_id: string;
  author_id: string;
  created_at: {seconds: number; nanos: number};
  content: string;
  upvotes: number;
  comments: number;
  createdAt: string;
}