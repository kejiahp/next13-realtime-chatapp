import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import LoginForm from "@/components/authentication/login-form";
import Logo from "@/components/logo/logo";

export const metadata: Metadata = {
  title: "Login - KiLoGraM",
  description: "Login into your kilogram account and start chat.",
};

type Props = {};

function Page({}: Props) {
  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Sign Up
        </Link>

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-zinc-900"
            style={{
              backgroundImage: `linear-gradient(to left,rgba(0,0,0,0.5),rgba(0,0,0, 0.7)), url("./NigerianYouths.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <Logo hideText />
          </div>

          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo; Welcome to our chat web application - a place where
                connection meets simplicity. Say hello to seamless conversations
                and real-time communication. Join the conversation and let's
                make every moment unforgettable. Get ready to chat, connect, and
                create memories together. Welcome to the future of chat!&rdquo;
              </p>
              <footer className="text-sm">-Elijah Papi</footer>
              <p className="text-sm text-purple-500">
                this kids use KiLoGraM everyday, more reason to join us😊
              </p>
            </blockquote>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials and chat away 🚀
              </p>
            </div>

            <LoginForm />

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
