"use client";

import React, { useEffect } from "react";
import useSWR from "swr";

import { Plus } from "lucide-react";

import { Button } from "../ui/button";
import ChatItem from "./ChatItem";
import { UserChats } from "./types";
import { Skeleton } from "../ui/skeleton";
import EmptyState from "../empty-state/EmptyState";
import { useCurrentUser } from "@/lib/authUtils/authHooks";
import { useGroupChatModal } from "@/hooks/useGroupChatModal";
import modifiedPrivateRequester from "@/services/privatier";
import { useSelectedChat } from "@/hooks/useSelectedChat";
import { getSender } from "@/lib/chatUtils";

function MyChats() {
  const currentUser = useCurrentUser();

  const { isLoading, error, data } = useSWR<UserChats[]>(
    `/chat`,
    (url: string) => modifiedPrivateRequester.get(url).then((res) => res.data)
  );

  const { onOpen } = useGroupChatModal((state) => ({ onOpen: state.onOpen }));
  const { setChat, chat } = useSelectedChat((state) => ({
    setChat: state.setChat,
    chat: state.chat,
  }));

  useEffect(() => {
    if (chat && data) {
      const values = data.find((item) => item._id === chat._id);
      if (values) {
        setChat(values);
      }
    }
  }, [data]);

  return (
    <div className="p-3 flex flex-col gap-5">
      <div className="my-3 flex flex-wrap items-center gap-3 justify-between">
        <h1 className="text-2xl">My Chats</h1>

        <Button size={"sm"} variant={"secondary"} onClick={onOpen}>
          <div className="flex items-center gap-2">
            <p>New Group Chat</p>
            <Plus />
          </div>
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {isLoading ? (
          <Skeleton className="h-[60px] w-full" />
        ) : !error ? (
          <>
            {data?.map((item, index) => (
              <ChatItem
                selected={chat?._id === item._id}
                onClick={() => setChat(item)}
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
