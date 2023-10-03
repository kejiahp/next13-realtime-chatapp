"use client";

import { ChevronLeft, Eye, Send } from "lucide-react";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { SenderMessage } from "./Messages";
import { useSelectedChat } from "@/hooks/useSelectedChat";
import { getSender } from "@/lib/chatUtils";
import { useCurrentUser } from "@/lib/authUtils/authHooks";
import { useUpdateGroupChat } from "@/hooks/useGroupChatModal";
import useSWR from "swr";
import modifiedPrivateRequester from "@/services/privatier";
import { Message } from "./types";
import { Skeleton } from "../ui/skeleton";
import EmptyState from "../empty-state/EmptyState";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormTextAreaField } from "../ui/form-components/form-item";
import {
  SendMessageValidatorType,
  send_message_validator,
} from "@/schema/messaging";
import { useRouter } from "next/navigation";

function ChatBox() {
  const [isLoading, setIsLoading] = useState(false);

  const { selectedChat, setChat } = useSelectedChat((state) => ({
    selectedChat: state.chat,
    setChat: state.setChat,
  }));
  const onOpen = useUpdateGroupChat((state) => state.onOpen);
  const currentUser = useCurrentUser();

  const {
    isLoading: messagesLoading,
    data,
    error,
    mutate,
  } = useSWR<Message[]>(`/message/${selectedChat?._id}`, (url: string) =>
    modifiedPrivateRequester.get(url).then((res) => res.data)
  );

  const chatsToRender = (allMessages: Message[]) => {
    return allMessages.map((item) => {
      let renderData: {
        image?: string;
        isUser?: boolean;
        username: string;
        message: string;
        createdAt: string;
      } = {
        image: "",
        isUser: false,
        username: "",
        message: "",
        createdAt: "",
      };

      if (item.sender._id === currentUser?.uid) {
        renderData.isUser = true;
      }

      renderData.image = item.sender.profilePhoto;
      renderData.message = item.content;
      renderData.username = item.sender.username;
      renderData.createdAt = item.createdAt;

      return renderData;
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SendMessageValidatorType>({
    resolver: zodResolver(send_message_validator),
  });

  const router = useRouter();

  const sendMessageHandler = (inputData: SendMessageValidatorType) => {
    const payload = { chatId: selectedChat?._id, content: inputData.content };

    setIsLoading(true);

    modifiedPrivateRequester
      .post(`/message`, payload)
      .then(() => {
        setValue("content", "");
        mutate();
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        toast.error("🥲 failed to send message");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const chatName = (data: any): string => {
    if (data.isGroupChat) {
      return data.chatName;
    } else {
      return getSender(currentUser?.uid, data.users);
    }
  };

  if (!selectedChat) {
    return (
      <div className="p-3 md:mr-3 h-full w-full flex justify-center items-center">
        <h1 className="text-xl">Select a conversation to begin chatting 👍</h1>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        header="🥲 Something went wrong"
        subHeader="couldn't get messages"
      />
    );
  }

  return (
    <div className="p-3 h-full md:mr-3">
      <div className="flex items-center justify-between">
        <div
          onClick={() => setChat(null)}
          className="md:hidden flex w-10 h-10 justify-center items-center rounded-md cursor-pointer bg-purple-400"
        >
          <ChevronLeft size={20} className="rounded-md" />
        </div>

        <h1 className="text-xl">
          {chatName(selectedChat).length >= 30
            ? chatName(selectedChat).slice(0, 30) + "..."
            : chatName(selectedChat)}
        </h1>

        {selectedChat.isGroupChat ? (
          <div
            onClick={onOpen}
            className="flex w-10 h-10 justify-center items-center rounded-md cursor-pointer bg-purple-400"
          >
            <Eye size={20} className="rounded-md" />
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="h-[500px] overflow-y-auto mt-2 p-2">
        {messagesLoading ? (
          <div className="w-full h-full">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={`w-full flex  ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <Skeleton className="h-10 w-[200px]" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {!data || data.length <= 0 ? null : (
              <>
                {chatsToRender(data).map((item, index) => (
                  <SenderMessage
                    key={index}
                    createdAt={item.createdAt}
                    username={item.username}
                    isUser={item.isUser}
                    message={item.message}
                    image={item.image}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>

      <div className="h-[120px] p-1 flex gap-3 items-center">
        <FormTextAreaField
          resizable
          className="w-full"
          id={"content"}
          placeholder={"Enter a message"}
          errorMessage={errors.content?.message}
          register={register("content")}
          disabled={false}
        />

        <Button onClick={handleSubmit(sendMessageHandler)}>
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default ChatBox;
