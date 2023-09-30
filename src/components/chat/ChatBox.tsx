import { ChevronLeft, Eye, Send } from "lucide-react";
import React from "react";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { SenderMessage } from "./Messages";

function ChatBox() {
  return (
    <div className="p-3 h-full md:mr-3">
      <div className="flex items-center justify-between">
        <div className="md:hidden flex w-10 h-10 justify-center items-center rounded-md cursor-pointer bg-purple-400">
          <ChevronLeft size={20} className="rounded-md" />
        </div>

        <h1 className="text-xl">ChatBox</h1>

        <div className="flex w-10 h-10 justify-center items-center rounded-md cursor-pointer bg-purple-400">
          <Eye size={20} className="rounded-md" />
        </div>
      </div>

      {/* h-[calc(100%-142px)] */}
      <div className="h-[500px] overflow-y-auto mt-2 p-2">
        <SenderMessage message="losfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfob" />

        <SenderMessage
          isUser
          message="losfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfob"
        />

        <SenderMessage message="losfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfob" />

        <SenderMessage
          isUser
          message="losfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfoblosfob"
        />
      </div>

      <div className="h-[100px] p-1 flex gap-3 items-center">
        <Textarea placeholder="Enter a message" className="resize-none" />
        <Button>
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default ChatBox;
