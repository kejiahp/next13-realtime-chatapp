import React from "react";

type Props = {
  name: string;
  lastestMessageSender: string;
  lastestMessage: string;
  selected?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function ChatItem({
  name,
  lastestMessage,
  selected,
  lastestMessageSender,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`${
        selected ? "bg-purple-500" : ""
      } shadow-sm rounded-md py-2 px-4 cursor-pointer hover:bg-purple-500 hover:text-white transform transition-all duration-200`}
    >
      <h1 className="capitalize font-bold">{name}</h1>

      <p className="font-bold text-sm">
        {lastestMessageSender && lastestMessageSender}{" "}
        <span className="font-normal">
          {lastestMessage.length >= 30
            ? lastestMessage.slice(0, 30) + "..."
            : lastestMessage}
        </span>
      </p>
    </div>
  );
}

export default ChatItem;
