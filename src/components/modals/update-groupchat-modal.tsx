"use client";

import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { useSWRConfig } from "swr";

import { useUpdateGroupChat } from "@/hooks/useGroupChatModal";
import Modal from "../ui/modal";
import { useSelectedChat } from "@/hooks/useSelectedChat";
import { getSender } from "@/lib/chatUtils";
import { useCurrentUser } from "@/lib/authUtils/authHooks";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErrorMessage } from "../ui/form-components/form-comps";
import modifiedPrivateRequester from "@/services/privatier";
import { SearchUser } from "../chat/types";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Loader, X } from "lucide-react";

function UpdateGroupChatModal() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose } = useUpdateGroupChat((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));
  const { selectedChat, setChat } = useSelectedChat((state) => ({
    selectedChat: state.chat,
    setChat: state.setChat,
  }));
  const currentUser = useCurrentUser();
  const route = useRouter();

  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    if (selectedChat?.chatName) {
      setGroupName(selectedChat?.chatName);
    }
  }, [selectedChat?.chatName]);

  const leaveGroupHandler = () => {
    setIsLoading(true);

    modifiedPrivateRequester
      .put(`/chat/group/remove`, {
        groupId: selectedChat?._id,
        userId: currentUser?.uid,
      })
      .then(() => {
        toast.success("group exit successful");
        setChat(null);
        mutate(`/chat`);
        onClose();
        route.refresh();
      })
      .catch((error) => {
        toast.error("something went wrong");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renameGroupHandler = () => {
    if (groupName.length <= 0) {
      toast.error("group name is required");
      return;
    }
    setIsLoading(true);

    modifiedPrivateRequester
      .put(`/chat/group/rename`, {
        groupId: selectedChat?._id,
        newGroupName: groupName,
      })
      .then(() => {
        mutate(`/chat`);
        route.refresh();
      })
      .catch((error) => {
        toast.error("something went wrong");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const removeUserHandler = (userId: string) => {
    setIsLoading(true);

    modifiedPrivateRequester
      .put(`/chat/group/remove`, {
        groupId: selectedChat?._id,
        userId: userId,
      })
      .then(() => {
        mutate(`/chat`);
        route.refresh();
      })
      .catch((error) => {
        toast.error("something went wrong");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addUserHandler = (userId: string) => {
    const userExist = selectedChat?.users.find((user) => user._id === userId);

    if (userExist) {
      toast.error("user already in the group");
      return;
    } else {
      setIsLoading(true);

      modifiedPrivateRequester
        .put(`/chat/group/add`, {
          groupId: selectedChat?._id,
          userId: userId,
        })
        .then(() => {
          mutate(`/chat`);
          route.refresh();
        })
        .catch((error) => {
          toast.error("something went wrong");
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const searchOnChange = async (inputValue: string) => {
    const data = await modifiedPrivateRequester.get<SearchUser[]>(
      `/user/?search=${inputValue}`
    );
    return data.data.map((item) => ({ label: item.username, value: item._id }));
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<
      {
        label: string;
        value: string;
      }[]
    >((resolve) => {
      resolve(searchOnChange(inputValue));
    });

  if (!selectedChat) {
    return (
      <Modal title="" description="" isOpen={isOpen} onClose={onClose}>
        <h1 className="text-rose-500 text-center">
          Oops...it appears no chat is selected, select a conversation to
          continue.
        </h1>
      </Modal>
    );
  }

  return (
    <Modal
      title={
        selectedChat.isGroupChat
          ? selectedChat.chatName
          : getSender(currentUser?.uid, selectedChat.users)
      }
      description={""}
      isOpen={isOpen}
      onClose={onClose}
    >
      {isLoading && <Loader className="animate-spin mb-2" />}
      <div className="flex flex-wrap items-center gap-2">
        <small className="font-bold">Group members</small>
        {selectedChat.users
          .filter((item) => item._id !== currentUser?.uid)
          .map((item, index) => (
            <Badge
              onClick={
                isLoading
                  ? () => {
                      return;
                    }
                  : () => removeUserHandler(item._id)
              }
              key={index}
              variant={"secondary"}
              className="cursor-pointer"
            >
              {item.username}
              <X size={15} />
            </Badge>
          ))}
      </div>

      <form className="my-5 flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-center">
          <div className="w-full">
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            {groupName?.length <= 0 && (
              <FormErrorMessage errorMessage={"Invalid group name"} />
            )}
          </div>

          <Button onClick={renameGroupHandler} disabled={isLoading}>
            Update
          </Button>
        </div>

        <AsyncSelect
          isDisabled={isLoading}
          placeholder={"Add a member"}
          cacheOptions
          loadOptions={promiseOptions}
          onChange={(e) => addUserHandler(e?.value || "")}
        />
      </form>
      <div className="flex items-center justify-end">
        <Button variant={"destructive"} onClick={leaveGroupHandler}>
          Leave group
        </Button>
      </div>
    </Modal>
  );
}

export default UpdateGroupChatModal;
