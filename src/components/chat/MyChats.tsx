import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

function MyChats() {
  return (
    <div className="p-3 flex flex-col gap-5">
      <div className="m-3">
        <h1 className="text-4xl">My Chats</h1>

        <Button variant={"secondary"}>
          <div className="flex items-center gap-2">
            <p>New Group Chat</p>
            <Plus />
          </div>
        </Button>
      </div>
    </div>
  );
}

export default MyChats;
