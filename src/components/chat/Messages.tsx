type Props = {
  isUser?: boolean;
  message: string;
};

export const SenderMessage = ({ isUser, message }: Props) => {
  return (
    <div
      className={`w-full flex items-center ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`rounded-md ${
          isUser ? "bg-purple-500" : "bg-white dark:bg-[#353535]"
        } p-2 w-[200px] break-words shadow-md`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};
