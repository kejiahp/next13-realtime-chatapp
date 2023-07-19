"use client";

import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import fetcher from "@/lib/fetcher";

import useSWR from "swr";

type Props = {};

function Page({}: Props) {
  const storeOpen = useLogin.getState().onOpen;

  const { isLoading, data, error } = useSWR(
    `http://localhost:5000/api/chat`,
    fetcher
  );

  console.log(data);

  return (
    <main>
      <Button onClick={storeOpen} variant={"ghost"}>
        This is our Btn
      </Button>
      <h1 className="text-rose-500 text-4xl">Hello there</h1>
    </main>
  );
}

export default Page;
