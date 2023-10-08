import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="w-full p-6 h-[100vh]">
      <section
        className="w-full rounded-2xl h-full bg-gray-300 dark:bg-purple-300 p-5"
        style={{
          backgroundImage: `linear-gradient(to left,rgba(0,0,0,0.2),rgba(0,0,0, 0.5)), url(./KilogramBgImage.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex w-full h-full items-center gap-6 justify-between">
          <div className="flex flex-col gap-3 flex-1">
            <h1 className="text-7xl font-bold text-white">Message privately</h1>
            <p className="w-[200px] text-white">
              Simple, reliable, private messaging and calling for free*,
              available all over the world.
            </p>

            <div>
              <Link
                href={"/login"}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "text-xl font-bold"
                )}
              >
                Start Chatting
              </Link>
            </div>
          </div>

          <div className="hidden sm:block flex-1"></div>
        </div>
      </section>
    </main>
  );
}
