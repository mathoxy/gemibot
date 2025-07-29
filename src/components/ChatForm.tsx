import ArrowUp from "../assets/arrow_up.svg";
import { useRef, useState, type Dispatch } from "react";

interface Props {
  chatHistory: { role: string; text: string }[];
  setHistory: Dispatch<React.SetStateAction<{ role: string; text: string }[]>>;
  generateBotResponse: (history: { role: string; text: string }[]) => void;
}

const ChatForm = ({ chatHistory, setHistory, generateBotResponse }: Props) => {
  const [isValid, setIsValid] = useState(false);
  const [nbreTextAeraRows, setNbreTextAeraRows] = useState(1);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsValid(e.target.checkValidity());

    // Reset number of rows to 1 when textaera is empty
    if (e.target.value.trim() === "") setNbreTextAeraRows(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) e.preventDefault();

    // Set number of rows to 2 when user press Enter + Shift
    if (e.key === "Enter" && e.shiftKey) setNbreTextAeraRows(2);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const inputText: string | undefined = inputRef.current.value.trim();
      if (!inputText) return;
      inputRef.current.value = "";
      setHistory((prevHistory) => [
        ...prevHistory,
        { role: "user", text: inputText },
      ]);

      setTimeout(() => {
        setHistory((prevHistory) => [
          ...prevHistory,
          { role: "model", text: "thinking..." },
        ]);

        generateBotResponse([...chatHistory, { role: "user", text: inputText }]);
      }, 500);
    }
  };

  return (
    <form
      action="#"
      onSubmit={handleSubmit}
      className={`border-2 w-[90%] min-h-[50px] ${
        isValid ? "border-[var(--blue-color)]" : "border-[#D8D4F2]"
      } duration-1000 ease-in-out mx-auto p-2 rounded-3xl flex justify-between items-center`}
    >
      <textarea
        placeholder="Message..."
        required
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        rows={nbreTextAeraRows}
        className="overflow-auto w-[80%] resize-none border-none outline-none font-semibold peer"
      ></textarea>
      <button className="hidden cursor-pointer peer-valid:flex duration-500 hover:opacity-75 bg-[var(--blue-color)]  w-[41px] h-[41px] rounded-[50%] justify-center items-center">
        <img src={ArrowUp} alt="arrow-up" />
      </button>
    </form>
  );
};

export default ChatForm;
