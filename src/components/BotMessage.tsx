import ChatBotIcon from "./ChatBotIcon";

const BotMessage = ({ text }: { text: string }) => {
  const blueColor = "#20A2D9";
  return (
    <div className="flex justify-start items-end gap-3 mx-2 mt-12">
      <ChatBotIcon botColor="#ffffff" bg={blueColor} />
      <p className="text-left max-w-[60%] bg-[#f2f2f8] p-3 relative bottom-7 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
        { text }
      </p>
    </div>
  );
};

export default BotMessage;