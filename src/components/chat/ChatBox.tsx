"use client";

import { ChevronLeft, Dot, Eye, Send } from "lucide-react";
import React, { useState, useEffect } from "react";

import { Button } from "../ui/button";
import { SenderMessage } from "./Messages";
import { useSelectedChat } from "@/hooks/useSelectedChat";
import { getSender } from "@/lib/chatUtils";
import { useUpdateGroupChat } from "@/hooks/useGroupChatModal";
import modifiedPrivateRequester from "@/services/privatier";
import { Message, UserChats } from "./types";
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
import { Socket, io } from "socket.io-client";
import { BASE_URL } from "@/services/axios-utils";
import { DecodedToken } from "@/lib/authUtils/cookieCtrl";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import useSWR, { useSWRConfig } from "swr";
import { useNotification } from "@/hooks/useNotification";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  selectedChatCompare: UserChats;

type Props = {
  currentUser: DecodedToken | null;
};

function ChatBox({ currentUser }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { notifyMessage, setNotifyMessage } = useNotification((state) => ({
    notifyMessage: state.notifyMessage,
    setNotifyMessage: state.setNotifyMessage,
  }));

  const [socketConnected, setSocketConnected] = useState(false);

  const { selectedChat, setChat } = useSelectedChat((state) => ({
    selectedChat: state.chat,
    setChat: state.setChat,
  }));

  const onOpen = useUpdateGroupChat((state) => state.onOpen);

  const { mutate } = useSWRConfig();

  // const {
  //   isLoading: messagesLoading,
  //   data,
  //   mutate: localMutate,
  //   error,
  //   ...others
  // } = useSWR<Message[]>(
  //   selectedChat?._id ? `/message/${selectedChat?._id}` : null,
  //   (url: string) => modifiedPrivateRequester.get(url).then((res) => res.data)
  // );

  const [messagesLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setDataMessage] = useState<Message[]>([]);

  useEffect(() => {
    if (selectedChat?._id) {
      const fetcher = () => {
        setLoading(true);

        modifiedPrivateRequester
          .get(`/message/${selectedChat?._id}`)
          .then((res) => setDataMessage(res.data))
          .catch(() => {
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
      };

      fetcher();
    }
  }, [selectedChat?._id]);

  useEffect(() => {
    //instanciating the socket will emit the connect event on the backend
    socket = io(BASE_URL);
    socket.emit("setup", currentUser);
    socket.on("connected", () => setSocketConnected(true));

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop_typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.on("message_recieved", (newMessage: Message) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessage.chat._id
      ) {
        const messageIds = notifyMessage.map((item) => item._id);

        if (!messageIds.includes(newMessage._id)) {
          setNotifyMessage([...notifyMessage, newMessage]);
          mutate(`/chat`);
        }
      } else {
        setDataMessage([...data, newMessage]);
      }
    });
  });

  // useEffect(() => {
  //   socket.on("message_recieved", (newMessage: Message) => {
  //     if (
  //       !selectedChatCompare ||
  //       selectedChatCompare._id !== newMessage.chat._id
  //     ) {
  //       const messageIds = notifyMessage.map((item) => item._id);

  //       if (!messageIds.includes(newMessage._id)) {
  //         setNotifyMessage(newMessage);
  // mutate(`/chat`);
  //         console.log("Notified");
  //       }
  //     } else {
  //       setDataMessage([...data, newMessage]);
  //     }
  //   });
  // });

  useEffect(() => {
    if (selectedChat) {
      selectedChatCompare = selectedChat;
      socket.emit("join_chat", selectedChat._id);
    }
  }, [selectedChat]);

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
      .then((res) => {
        setValue("content", "");
        socket.emit("new_message", res.data);
        setDataMessage([...data, res.data]);
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        toast.error("🥲 failed to send message");
      })
      .finally(() => {
        setIsLoading(false);
        socket.emit("stop typing", selectedChat?._id);
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

      <div className="transform transition-all duration-1000">
        {isTyping ? (
          <div className="flex items-center">
            <Dot
              fontWeight={800}
              size={20}
              className="text-purple-500 animate-bounce"
            />
            <Dot
              fontWeight={800}
              size={20}
              className="text-purple-500 animate-bounce delay-75"
            />
            <Dot
              fontWeight={800}
              size={20}
              className="text-purple-500 animate-bounce delay-100"
            />
          </div>
        ) : (
          <></>
        )}
        <div className="h-[120px] p-1 flex gap-3 items-center">
          <FormTextAreaField
            resizable
            className="w-full"
            id={"content"}
            placeholder={"Enter a message"}
            errorMessage={errors.content?.message}
            register={register("content", {
              onChange() {
                if (!socketConnected) {
                  return;
                }

                if (!typing) {
                  setTyping(true);
                  socket.emit("typing", selectedChat._id);
                }

                let lastTypingTime = new Date().getTime();
                var timerLength = 3000;

                setTimeout(() => {
                  var currentTime = new Date().getTime();
                  var timeDiff = currentTime - lastTypingTime;

                  if (timeDiff >= timerLength && typing) {
                    socket.emit("stop_typing", selectedChat._id);
                    setTyping(false);
                  }
                }, timerLength);
              },
            })}
            disabled={false}
          />

          <Button
            disabled={isLoading}
            onClick={handleSubmit(sendMessageHandler)}
          >
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
