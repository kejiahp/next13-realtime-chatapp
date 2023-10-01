"use client";

import React, { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ChatItem from "./ChatItem";
import useAxiosAuth from "@/lib/authUtils/useAxiosAuth";
import { SearchUser, UserChats } from "./types";
import { Skeleton } from "../ui/skeleton";
import EmptyState from "../empty-state/EmptyState";
import { useCurrentUser } from "@/lib/authUtils/authHooks";

function getSender(
  currentUserId: string | undefined,
  users: Omit<SearchUser, "password">[]
) {
  if (!currentUserId) return users[0].username || "anonymous";

  return (
    users.find((item) => item._id !== currentUserId)?.username || "anonymous"
  );
}

function MyChats() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [chats, setChats] = useState<UserChats[]>([]);

  const currentUser = useCurrentUser();
  const authRequest = useAxiosAuth();

  useEffect(() => {
    setIsLoading(true);
    authRequest
      .get<UserChats[]>(`/chat`)
      .then((res) => {
        setChats(res.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [authRequest]);

  return (
    <div className="p-3 flex flex-col gap-5">
      <div className="my-3 flex flex-wrap items-center gap-3 justify-between">
        <h1 className="text-2xl">My Chats</h1>

        <Button size={"sm"} variant={"secondary"}>
          <div className="flex items-center gap-2">
            <p>New Group Chat</p>
            <Plus />
          </div>
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {isLoading ? (
          <Skeleton className="h-[60px] w-full" />
        ) : !isError ? (
          <>
            {chats?.map((item, index) => (
              <ChatItem
                key={index}
                name={
                  item.isGroupChat
                    ? item.chatName
                    : getSender(currentUser?.uid, item.users)
                }
                lastestMessageSender={item?.latestMessage?.sender || ""}
                lastestMessage={item?.latestMessage?.content || ""}
              />
            ))}
          </>
        ) : (
          <EmptyState subHeader="Oops couldn't get chats 🥲" />
        )}
      </div>
    </div>
  );
}

export default MyChats;
