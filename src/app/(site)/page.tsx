import Link from "next/link";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main
      className="w-full h-[100vh] bg-gray-300 dark:bg-purple-300 p-5 sm:p-10 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to left,rgba(0,0,0,0.2),rgba(0,0,0, 0.5)), url(./KilogramBgImage.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex w-full h-full items-center gap-6 justify-between">
        <div className="flex flex-col gap-3 flex-1">
          <h1 className="text-4xl sm:text-7xl font-bold text-white">
            Message privately
          </h1>
          <p className="w-[200px] text-white">
            Simple, reliable, private messaging and calling for free*, available
            all over the world.
          </p>

          <div>
            <Link
              href={"/login"}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "text-lg sm:text-xl font-bold"
              )}
            >
              Start Chatting
            </Link>
          </div>
        </div>

        <div className="hidden flex-1 sm:grid sm:grid-cols-2 gap-3 my-3">
          <Image
            src={"/HeroImg3.png"}
            alt="dark mode chat page"
            width={300}
            height={300}
            className="object-contain w-full col-span-2 rounded-lg"
          />

          <Image
            src={"/HeroImg1.png"}
            alt="dark mode chat page"
            width={200}
            height={200}
            priority
            className="object-contain rounded-lg"
          />

          <Image
            src={"/HeroImg2.png"}
            alt="dark mode chat page"
            width={200}
            height={200}
            priority
            className="object-contain rounded-lg"
          />
        </div>
      </div>
    </main>
  );
}
