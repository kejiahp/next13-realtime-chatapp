import ChatBox from "@/components/chat/ChatBox";
import MyChats from "@/components/chat/MyChats";
import SplitPage from "@/components/chat/SplitPage";

function Page() {
  return (
    <SplitPage primaryComponent={<ChatBox />} asideComponent={<MyChats />} />
  );
}

export default Page;
