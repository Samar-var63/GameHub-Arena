import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireAdmin() {
  // Passing authOptions forces NextAuth to include your custom "role" field
  const session = await getServerSession(authOptions);
  
  if (!session || session.user?.role !== "Admin") {
    return null;
  }
  
  return session;
}