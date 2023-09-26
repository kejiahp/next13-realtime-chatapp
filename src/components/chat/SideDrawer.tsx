"use client";

import React from "react";

import Backdrop from "../backdrop/Backdrop";
import { useSearchDrawer } from "@/hooks/useSearchDrawer";
import { X } from "lucide-react";

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
        className="bg-[#353535] h-full w-full xsm:w-[350px] rounded-tr-md rounded-br-md"
      >
        <div className="p-5 flex justify-end">
          <X onClick={onClose} className="cursor-pointer" size={30} />
        </div>
      </section>
    </Backdrop>
  );
}

export default SideDrawer;
