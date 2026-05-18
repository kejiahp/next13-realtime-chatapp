import dynamic from "next/dynamic";

import ChatBox from "@/components/chat/ChatBox";
import SplitPage from "@/components/chat/SplitPage";
import { getServerSideUser } from "@/lib/authUtils/getServerSideUser";
import { Skeleton } from "@/components/ui/skeleton";

const MyChats = dynamic(() => import("@/components/chat/MyChats"), {
  loading: () => (
    <>
      <Skeleton className="h-[40px] w-full" />
    </>
  ),
});

async function Page() {
  const currentUser = await getServerSideUser();
  return (
    <SplitPage
      primaryComponent={<ChatBox currentUser={currentUser} />}
      asideComponent={<MyChats />}
    />
  );
}

export default Page;
