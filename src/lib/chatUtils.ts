import { SearchUser } from "@/components/chat/types";

export function getSender(
  currentUserId: string | undefined,
  users: Omit<SearchUser, "password">[]
) {
  if (!currentUserId) return users[0].username;
  return (
    users.find((item) => item._id !== currentUserId)?.username || "anonymous"
  );
}
