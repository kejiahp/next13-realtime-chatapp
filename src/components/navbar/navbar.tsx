"use client";

import React from "react";
import { Input } from "../ui/input";
import { Bell, Menu, Search } from "lucide-react";
import Logo from "../logo/logo";
import Dropdown from "../dropdown/dropdown";
import ThemeToggle from "../ui/theme-toggle";

type Props = {};

function NavBar({}: Props) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="relative">
        <Search className="text-purple-600 absolute top-2 left-1" />
        <Input className="pl-10 w-[200px]" placeholder="Search User" />
      </div>

      <div className="hidden md:flex">
        <Logo />
      </div>

      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
        <Bell className="cursor-pointer" />
        <Dropdown />
      </div>

      <div className="block md:hidden cursor-pointer">
        <Menu />
      </div>
    </div>
  );
}

export default NavBar;
