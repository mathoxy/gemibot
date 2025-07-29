import ChatBotIcon from "./ChatBotIcon";
import KeyBoardArrow from "../assets/keyboard_arrow_down.svg";
import ChatForm from "./ChatForm";
import { useEffect, useRef, useState } from "react";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import chatIcon from "../assets/chat_icon.svg";
import closeIcon from "../assets/close_icon.svg";

function ChatBot() {
  const blueColor = "#20A2D9";
  const [history, setHistory] = useState<{ role: string; text: string }[]>([]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [showChatBot, setShowChatBot] = useState(false);

  const generateBotResponse = async (
    history: { role: string; text: string }[]
  ): Promise<void> => {
    const updateHistory = (text: string) => {
      setHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "thinking..."),
        {
          role: "model",
          text: text,
        },
      ]);
    };

    // Reformate history to match api specifications
    const geminiHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    // Request Options
    const requestOptions: {} = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: geminiHistory,
      }),
    };

    // Make api call
    try {
      const apiUrl = import.meta.env.VITE_API_URL as string;
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      if (!response.ok)
        throw new Error(
          data.error.message || "Erreur lors de l'appel de l'API"
        );
      // console.log(data)
      const apiResponseMessage = data.candidates[0].content.parts[0].text
        .replace(/^\*\s+/gm, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim() as string;
      updateHistory(apiResponseMessage);
    } catch (error) {
      console.log(error);
    }
  };

  // Auto-Scroll whenever chat history updates
  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  return (
    <div className="chatbot-container relative w-[450px] h-[600px] mr-16 max-sm:w-full max-sm:h-full max-sm:m-0">
      <div
        className={`${
          showChatBot ? "show-chatbot" : ""
        } chatbot-popup bg-white rounded-2xl w-full h-full shadow-2xl relative shadow-blue-250 max-sm:rounded-none`}
      >
        {/* Chat Header*/}
        <div className="bg-[var(--blue-color)] rounded-t-2xl p-5 flex justify-between max-sm:rounded-none">
          <div className="flex justify-center items-center gap-5">
            <ChatBotIcon botColor={blueColor} bg="#ffffff" />
            <h2 className="logo-text text-white font-semibold">GemiBot</h2>
          </div>
          <button
            onClick={() => setShowChatBot(false)}
            className="cursor-pointer rounded-full duration-75 p-[2px] hover:bg-[#85cdec]"
          >
            <img src={KeyBoardArrow} alt="KeyBoardArrow" />
          </button>
        </div>
        {/* Chat Body*/}
        <div
          ref={chatBodyRef}
          className="flex flex-col h-[68%] overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: `${blueColor} transparent`,
          }}
        >
          {/* Chatbot message*/}
          <div className="flex justify-start items-center gap-3 mx-2 mt-12">
            <ChatBotIcon botColor="#ffffff" bg={blueColor} />
            <p className="text-left bg-[#f2f2f8] p-3 relative bottom-7 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
              Hey there 👋 <br /> How can I help you today?
            </p>
          </div>
          {/* Chats */}
          {history.map((chat, index) =>
            chat.role === "user" ? (
              <UserMessage key={index} text={chat.text} />
            ) : (
              <BotMessage key={index} text={chat.text} />
            )
          )}
        </div>
        {/* Chat Footer*/}
        <div className="absolute bottom-5 w-full">
          <ChatForm
            chatHistory={history}
            setHistory={setHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
      {/* Button toggler */}
      <button
        onClick={() => setShowChatBot((prev) => !prev)}
        id="chatbot-toggler"
        className={`cursor-pointer duration-500 ease-in-out hover:opacity-75 bg-[var(--blue-color)] w-[58px] h-[58px] flex rounded-full justify-center items-center absolute -bottom-10 -right-5 max-sm:bottom-10 max-sm:right-5 ${
          showChatBot ? "max-sm:hidden" : "max-sm:flex"
        }`}
      >
        <img
          src={chatIcon}
          alt="chat-icon"
          className={`${showChatBot ? "hide-chat-icon" : ""}`}
        />
        <img
          src={closeIcon}
          alt="close-icon"
          className={`${!showChatBot ? "hide-close-icon" : ""}`}
        />
      </button>
    </div>
  );
}

export default ChatBot;
