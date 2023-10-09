import NavBar from "@/components/navbar/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title:
    "Kilogram Chat: Connect, Share, and Collaborate Effortlessly | Kilogram App",
  description:
    "Experience the heart of Kilogram with our chat feature. Connect with friends and colleagues, share moments, and collaborate seamlessly. Kilogram Chat makes communication a breeze, ensuring you stay in touch and work together effortlessly. Explore the chat section now and discover a world of possibilities!",
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
