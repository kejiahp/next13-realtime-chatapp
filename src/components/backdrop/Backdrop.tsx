import React from "react";

const Backdrop = ({
  children,
  className,
  onClick,
}: React.PropsWithChildren<{ className?: string; onClick?: () => void }>) => {
  return (
    <div
      onClick={onClick}
      className={`fixed top-0 left-0 w-full h-full overflow-y-auto z-[5000] bg-black dark:bg-purple-200 bg-opacity-50 dark:bg-opacity-50 ${className}`}
    >
      {children}
    </div>
  );
};

export default Backdrop;
