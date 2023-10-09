import { ModalProvider } from "@/providers/modal-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import ToastContext from "@/context/ToastContext";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Kilogram: Connect Instantly with Friends and Colleagues | Best Chat App for Seamless Communication",
  description:
    "Explore Kilogram, the premier chat app that revolutionizes your messaging experience. Whether you're catching up with friends or collaborating with colleagues, Kilogram offers a seamless and intuitive platform. Enjoy instant messaging, high-quality calls, and secure file sharing, all within one app. Discover a world of possibilities with Kilogram's user-friendly interface and cutting-edge features. Download Kilogram now to stay connected, anytime, anywhere!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastContext />
          <ModalProvider />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
