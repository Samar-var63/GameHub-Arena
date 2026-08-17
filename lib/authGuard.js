import { getServerSession } from "next-auth";

export async function requireAdmin() {
  const session = await getServerSession();
  if (!session || session.user?.role !== "Admin") {
    return null;
  }
  return session;
}