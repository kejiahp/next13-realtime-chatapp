import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Message } from "../chat/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSender } from "@/lib/chatUtils";
import { DecodedToken } from "@/lib/authUtils/cookieCtrl";

type Props = {
  currentUser: DecodedToken;
  notifyMessage: Message[];
  selectChat: (chat: any) => void;
  setNotifyMessage: (messages: Message[]) => void;
};

function NotificationDropdown({
  notifyMessage,
  setNotifyMessage,
  currentUser,
  selectChat,
}: Props) {
  const onNotificationClickHandler = (item: Message) => {
    const newNotificationMsg = notifyMessage.filter(
      (notification) => notification._id !== item._id
    );
    setNotifyMessage(newNotificationMsg);
    selectChat(item.chat);
  };

  const chatName = (data: any): string => {
    let returnName: string;

    if (data.isGroupChat) {
      returnName = data.chatName;
    } else {
      returnName = getSender(currentUser?.uid, data.users);
    }

    if (returnName.length >= 30) {
      return returnName.slice(0, 30) + "...";
    } else {
      return returnName;
    }
  };

  let notificationContent;

  if (notifyMessage.length <= 0) {
    notificationContent = (
      <DropdownMenuLabel>No new messages</DropdownMenuLabel>
    );
  } else {
    notificationContent = notifyMessage.map((item, index) => (
      <div key={index}>
        <DropdownMenuLabel
          className="cursor-pointer"
          onClick={() => onNotificationClickHandler(item)}
        >
          <p>{chatName(item.chat)}</p>
          <p className="text-purple-500">
            {item.sender.username}:{" "}
            <span className="font-normal">
              {item.content.length >= 20
                ? item.content.slice(0, 20)
                : item.content}
            </span>
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </div>
    ));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          <Bell />
          <div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-rose-500 text-white">
            <small>{notifyMessage.length}</small>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <ScrollArea className="h-72 w-48 rounded-md border">
          {notificationContent}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationDropdown;
