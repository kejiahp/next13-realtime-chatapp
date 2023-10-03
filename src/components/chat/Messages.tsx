import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

type Props = {
  image?: string;
  isUser?: boolean;
  username: string;
  message: string;
  createdAt: string;
};

export const SenderMessage = ({
  image,
  isUser,
  message,
  username,
  createdAt,
}: Props) => {
  return (
    <div
      className={`my-2 w-full flex items-center ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="relative">
        {!isUser && (
          <div className="absolute top-2 left-0">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar className="w-7 h-7">
                  <AvatarImage src={image} />
                  <AvatarFallback>{username?.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent>
                <small>
                  sent by:{" "}
                  <span className="font-bold text-purple-500">{username}</span>{" "}
                  on the:{" "}
                  <span className="font-bold text-purple-500">
                    {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </span>
                </small>
              </HoverCardContent>
            </HoverCard>
          </div>
        )}

        <div
          className={`rounded-xl ${
            isUser ? "bg-purple-500" : "bg-white dark:bg-[#353535] ml-10"
          } p-2 max-w-[200px] break-words shadow-md`}
        >
          <p className="text-[15px]">{message}</p>
        </div>
      </div>
    </div>
  );
};
