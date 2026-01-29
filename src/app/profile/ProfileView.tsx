"use client";

import { User } from "@/types/user"; 
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function ProfileView() {
  const { data: user, error, isLoading} = useSWR<User>(`/api/user/me`, fetcher);
  
  // Redirect to login page if session is not available
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data</div>;
  if (!user) return <div>User not found</div>;

  // Render user details
  return (
    <div>
      <h1>Profile: {user.name}</h1>
      <p>ID: {user.id}</p>
    </div>
  );
}