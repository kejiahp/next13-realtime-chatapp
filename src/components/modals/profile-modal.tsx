"use client";

import React from "react";
import { useProfile } from "@/hooks/useProfile";
import Modal from "@/components/ui/modal";
import { useCurrentUser } from "@/lib/authUtils/authHooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function ProfileModal() {
  const currentUser = useCurrentUser();

  const { isOpen, onClose } = useProfile((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  return (
    <Modal title={""} description={""} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-xl uppercase font-semibold dark:text-purple-400">
          {currentUser?.username}
        </h1>
        <Avatar className="w-[200px] h-[200px]">
          <AvatarImage src={currentUser?.profilePhoto} />
          <AvatarFallback>{currentUser?.username?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <p className="font-semibold dark:text-purple-400 text-xl">
          Email:{" "}
          <span className="font-normal dark:text-white">
            {currentUser?.email}
          </span>
        </p>
      </div>
    </Modal>
  );
}

export default ProfileModal;
