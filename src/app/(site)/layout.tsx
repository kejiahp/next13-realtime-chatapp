import NavBar from "@/components/navbar/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default Layout;
