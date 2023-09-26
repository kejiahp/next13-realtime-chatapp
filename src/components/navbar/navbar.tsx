"use client";

import React from "react";
import { Input } from "../ui/input";
import { Bell, Search } from "lucide-react";
import Logo from "../logo/logo";
import Dropdown from "../dropdown/dropdown";
import ThemeToggle from "../ui/theme-toggle";
import SideDrawer from "../chat/SideDrawer";
import { useSearchDrawer } from "@/hooks/useSearchDrawer";

function NavBar() {
  const { onOpen } = useSearchDrawer((state) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
  }));

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
          <Bell />
          <ThemeToggle />
          <Dropdown />
        </div>
      </div>
    </>
  );
}

export default NavBar;
