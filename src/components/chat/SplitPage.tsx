import React from "react";

type Props = {
  primaryComponent: React.JSX.Element;
  asideComponent: React.JSX.Element;
};

function SplitPage({ primaryComponent, asideComponent }: Props) {
  return (
    <main className="flex gap-5">
      <section className="md:w-[30%] w-full min-h-[80vh] border-r-0 md:border-r border-purple-600">
        {asideComponent}
      </section>
      <section className="min-h-[80vh] hidden md:block md:w-[70%]">
        {primaryComponent}
      </section>
    </main>
  );
}

export default SplitPage;
