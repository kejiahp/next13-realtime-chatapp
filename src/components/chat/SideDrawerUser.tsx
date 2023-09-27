import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  image: string;
  username: string;
  email: string;
};

function SideDrawerUser({ image, username, email }: Props) {
  return (
    <div className="flex items-center p-2 gap-3 cursor-pointer hover:bg-purple-600 hover:text-white dark:hover:text-black transition-all duration-200">
      <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback>{username?.slice(0, 1)}</AvatarFallback>
      </Avatar>

      <div>
        <p>{username}</p>
        <p className="font-semibold text-sm">
          Email: <span className="font-normal">{email}</span>
        </p>
      </div>
    </div>
  );
}

export default SideDrawerUser;
