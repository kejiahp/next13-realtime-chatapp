import React from "react";

const Container = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: any }>) => {
  return (
    <div className={`max-w-[2520px] mx-auto xl:px-10 md:px-9 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
