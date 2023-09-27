import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ChatItem from "./ChatItem";

function MyChats() {
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
        <ChatItem
          name={"John Doe"}
          lastestMessageSender={"Lintose"}
          lastestMessage={"Jamal"}
        />
      </div>
    </div>
  );
}

export default MyChats;
