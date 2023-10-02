"use client";

import CreateGroupChatModal from "@/components/modals/create-groupchat-modal";
import ProfileModal from "@/components/modals/profile-modal";
import UpdateGroupChatModal from "@/components/modals/update-groupchat-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProfileModal />
      <CreateGroupChatModal />
      <UpdateGroupChatModal />
    </>
  );
};
