"use client";

import { useSelectedChat } from "@/hooks/useSelectedChat";
import React from "react";

type Props = {
  primaryComponent: React.JSX.Element;
  asideComponent: React.JSX.Element;
};

function SplitPage({ primaryComponent, asideComponent }: Props) {
  const chat = useSelectedChat((state) => state.chat);

  return (
    <main className="flex gap-5">
      <section
        className={`min-h-[80vh] ${
          chat ? "hidden" : "w-full"
        } md:block md:w-[30%] border-r-0 md:border-r border-purple-600`}
      >
        {asideComponent}
      </section>
      <section
        className={`min-h-[80vh] ${
          chat ? "w-full" : "hidden"
        } md:block md:w-[70%]`}
      >
        {primaryComponent}
      </section>
    </main>
  );
}

export default SplitPage;
