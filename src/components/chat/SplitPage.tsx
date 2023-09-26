import React from "react";

type Props = {
  primaryComponent: React.JSX.Element;
  asideComponent: React.JSX.Element;
};

function SplitPage({ primaryComponent, asideComponent }: Props) {
  return (
    <main className="flex gap-5">
      <section className="hidden sm:flex">{asideComponent}</section>
      <section className="w-full sm:w-[70%]">{primaryComponent}</section>
    </main>
  );
}

export default SplitPage;
