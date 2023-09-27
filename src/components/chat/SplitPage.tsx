import React from "react";

type Props = {
  primaryComponent: React.JSX.Element;
  asideComponent: React.JSX.Element;
};

function SplitPage({ primaryComponent, asideComponent }: Props) {
  return (
    <main className="flex gap-5">
      <section className="hidden md:block md:w-[30%] min-h-[80vh] shadow-md">
        {asideComponent}
      </section>
      <section className="w-full min-h-[80vh] md:w-[70%]">
        {primaryComponent}
      </section>
    </main>
  );
}

export default SplitPage;
