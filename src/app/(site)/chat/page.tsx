import ChatBox from "@/components/chat/ChatBox";
import MyChats from "@/components/chat/MyChats";
import SplitPage from "@/components/chat/SplitPage";
import { getServerSideUser } from "@/lib/authUtils/getServerSideUser";

function Page() {
  const currentUser = getServerSideUser();
  return (
    <SplitPage
      primaryComponent={<ChatBox currentUser={currentUser} />}
      asideComponent={<MyChats />}
    />
  );
}

export default Page;
