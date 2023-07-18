"use client";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";

export default function Home() {
  const storeOpen = useLogin.getState().onOpen;

  return (
    <main>
      <Button onClick={storeOpen} variant={"ghost"}>
        This is our Btn
      </Button>
      <h1 className="text-rose-500 text-4xl">Hello there</h1>
    </main>
  );
}
