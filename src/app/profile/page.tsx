import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileView } from "./ProfileView";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/login");
  }
  
  return <ProfileView />;
}