const UserMessage = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-end mx-5 mb-4">
      <p className="text-white text-left max-w-[60%] break-all bg-[var(--blue-color)] p-3 rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl">
        { text }
      </p>
    </div>
  );
};

export default UserMessage;
