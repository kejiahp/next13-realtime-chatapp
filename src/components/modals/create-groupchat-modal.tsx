"use client";

import React, { useState } from "react";

import AsyncSelect from "react-select/async";

import Modal from "../ui/modal";
import { useGroupChatModal } from "@/hooks/useGroupChatModal";
import {
  FormCustomSelectField,
  FormInputField,
} from "../ui/form-components/form-item";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateGroupChatValidatorType,
  create_groupchat_validator,
} from "@/schema/groupchat.schema";
import { Button } from "../ui/button";

import { SearchUser } from "../chat/types";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import useAxiosPrivate from "@/lib/authUtils/useAxiosPrivate";

function CreateGroupChatModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const modifiedPrivateRequester = useAxiosPrivate();

  const router = useRouter();

  const { isOpen, onClose } = useGroupChatModal((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateGroupChatValidatorType>({
    resolver: zodResolver(create_groupchat_validator),
  });

  const onSubmitHandler = (inputData: CreateGroupChatValidatorType) => {
    const usersData = inputData.users.map((item) => item.value);

    modifiedPrivateRequester
      .post(`/chat/group`, { groupName: inputData.groupName, users: usersData })
      .then(() => {
        toast.success("group created");
        mutate(`/chat`);
        reset();
        router.refresh();
        onClose();
      })
      .catch((error) => {
        toast.error("failed to create group try again");
        console.log(error);
      })
      .finally(() => setIsLoading(false));
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

  return (
    <Modal
      title="Create Group Chat"
      description=""
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <form className="my-5 flex flex-col gap-4">
        <FormInputField
          id={"groupName"}
          placeholder={"Group name"}
          errorMessage={errors.groupName?.message}
          register={register("groupName")}
          disabled={false}
          type={"text"}
        />

        <FormCustomSelectField
          selectType={AsyncSelect}
          id={"members"}
          onChangeHandler={(e) => setValue("users", e)}
          cacheOptions
          loadOptions={promiseOptions}
          placeholder={"Group members"}
          defaultValue={""}
          disabled={false}
          errorMessage={errors.users?.message}
          required={true}
          multiple
        />

        <Button disabled={isLoading} onClick={handleSubmit(onSubmitHandler)}>
          Create Chat
        </Button>
      </form>
    </Modal>
  );
}

export default CreateGroupChatModal;
