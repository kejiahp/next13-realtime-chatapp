"use client";

import React, { useState } from "react";

import Backdrop from "../backdrop/Backdrop";
import { useSearchDrawer } from "@/hooks/useSearchDrawer";
import { Loader, Search, X } from "lucide-react";
import SideDrawerUser from "./SideDrawerUser";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import useAxiosAuth from "@/lib/authUtils/useAxiosAuth";
import { SearchUser } from "./types";
import EmptyState from "../empty-state/EmptyState";

function SideDrawer() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<SearchUser[]>([]);
  const authRequest = useAxiosAuth();

  const onSearchHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!searchValue || searchValue.length <= 0) {
      toast.error("search input is required");
      return;
    }

    setIsLoading(true);
    authRequest
      .get(`/user/?search=${searchValue}`)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        toast.error("failed to get users");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const createOrGetExistingChat = (userId: string) => {
    authRequest
      .post(`/chat`, { userId })
      .then(() => {
        onClose();
      })
      .catch(() => {
        toast.error("oops...couldn't start chat");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { isOpen, onClose } = useSearchDrawer((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  const onCloseHandler = () => {
    onClose();
    setSearchValue("");
    setData([]);
  };

  return (
    <Backdrop
      onClick={onCloseHandler}
      className={`${isOpen ? "translate-x-0" : "-translate-x-full"}
    transform transition-all duration-500`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="dark:bg-[#353535] bg-white h-full w-full xsm:w-[350px] rounded-tr-md rounded-br-md"
      >
        <div className="p-5 flex justify-between items-center">
          <h1 className="font-semibold">Search Users</h1>
          <X onClick={onCloseHandler} className="cursor-pointer" size={30} />
        </div>

        <form className="flex items-center my-3 gap-2 px-4">
          <Input
            placeholder="search by email or username"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button onClick={(e) => onSearchHandler(e)}>
            <Search />
          </Button>
        </form>

        <div className="flex flex-col gap-3">
          {isLoading ? (
            <div className="w-full h-[30vh] flex justify-center items-center">
              <Loader className="animate-spin" />
            </div>
          ) : data.length <= 0 ? (
            <EmptyState subHeader={"no users found 🥲"} />
          ) : (
            <>
              {data?.map((item, index) => (
                <SideDrawerUser
                  onClick={() => createOrGetExistingChat(item._id)}
                  key={index}
                  image={item?.profilePhoto}
                  username={item?.username}
                  email={item?.email}
                />
              ))}
            </>
          )}
        </div>
      </section>
    </Backdrop>
  );
}

export default SideDrawer;
