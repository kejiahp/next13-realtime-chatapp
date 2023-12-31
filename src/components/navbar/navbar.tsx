"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Loader, Search } from "lucide-react";
import Logo from "../logo/logo";
import ProfileDropdown from "../dropdown/profile-dropdown";
import ThemeToggle from "../ui/theme-toggle";
import SideDrawer from "../chat/SideDrawer";
import { useSearchDrawer } from "@/hooks/useSearchDrawer";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteCookie, getAsyncCookie } from "@/lib/authUtils/cookieCtrl";
import { logOutService } from "@/services/authentication";
import { useCurrentUser } from "@/lib/authUtils/authHooks";
import { useProfile } from "@/hooks/useProfile";
import NotificationDropdown from "../dropdown/notification-dropdown";
import { useNotification } from "@/hooks/useNotification";
import { useSelectedChat } from "@/hooks/useSelectedChat";

function NavBar() {
  const [isLoading, setIsLoading] = useState(false);

  const { onOpen } = useSearchDrawer((state) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
  }));

  const selectChat = useSelectedChat((state) => state.setChat);

  const { onOpen: profileOnOpen } = useProfile((state) => ({
    onOpen: state.onOpen,
  }));

  const { notifyMessage, setNotifyMessage } = useNotification((state) => ({
    notifyMessage: state.notifyMessage,
    setNotifyMessage: state.setNotifyMessage,
  }));

  const currentUser = useCurrentUser();

  const router = useRouter();

  const logoutfn = async () => {
    setIsLoading(true);

    const refreshToken = await getAsyncCookie("rtk");

    logOutService(refreshToken as string)
      .then(() => {
        deleteCookie("tk");
        deleteCookie("rtk");
      })
      .catch(() => {
        deleteCookie("tk");
        deleteCookie("rtk");
      })
      .finally(() => {
        setIsLoading(false);

        toast.success("successfully logged out");
        router.push("/login");
        router.refresh();
      });
  };

  return (
    <>
      <SideDrawer />

      <div className="flex flex-wrap gap-5 justify-center items-center md:justify-between px-5 py-4">
        <div onClick={onOpen} className="relative cursor-pointer">
          <Search className="text-purple-600 absolute top-2 left-1" />
          <Input
            className="pl-10 w-[200px]"
            placeholder="Search User"
            onFocus={onOpen}
          />
        </div>

        <div className="hidden md:flex">
          <Logo />
        </div>

        <div className="flex items-center gap-5">
          {currentUser?.uid && (
            <NotificationDropdown
              selectChat={selectChat}
              currentUser={currentUser}
              notifyMessage={notifyMessage}
              setNotifyMessage={setNotifyMessage}
            />
          )}
          <ThemeToggle />
          {currentUser?.uid && (
            <>
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <ProfileDropdown
                  image={currentUser?.profilePhoto}
                  fallback={currentUser?.username}
                  logoutfn={logoutfn}
                  openProfilefn={profileOnOpen}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
