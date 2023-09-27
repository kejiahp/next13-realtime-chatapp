"use client";

import React from "react";

import Backdrop from "../backdrop/Backdrop";
import { useSearchDrawer } from "@/hooks/useSearchDrawer";
import { Search, X } from "lucide-react";
import SideDrawerUser from "./SideDrawerUser";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function SideDrawer() {
  const { isOpen, onClose } = useSearchDrawer((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));
  return (
    <Backdrop
      onClick={onClose}
      className={`${isOpen ? "translate-x-0" : "-translate-x-full"}
    transform transition-all duration-500`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="dark:bg-[#353535] bg-white h-full w-full xsm:w-[350px] rounded-tr-md rounded-br-md"
      >
        <div className="p-5 flex justify-between items-center">
          <h1 className="font-semibold">Search Users</h1>
          <X onClick={onClose} className="cursor-pointer" size={30} />
        </div>

        <form className="flex items-center my-3 gap-2 px-4">
          <Input placeholder="search by email or username" />
          <Button type="button">
            <Search />
          </Button>
        </form>

        <div className="flex flex-col gap-3">
          <SideDrawerUser
            image={
              "https://res.cloudinary.com/ditqcj7ee/image/upload/v1695220997/xntxlvvwhngxcjeycx6s.jpg"
            }
            username={"Jeffery"}
            email={"goindgo@gmail.com"}
          />
        </div>
      </section>
    </Backdrop>
  );
}

export default SideDrawer;
