import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  image?: string | undefined;
  fallback: string | undefined;
  logoutfn?: () => void;
  openProfilefn?: () => void;
};

function ProfileDropdown({ image, fallback, logoutfn, openProfilefn }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{fallback?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={openProfilefn}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={logoutfn}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
