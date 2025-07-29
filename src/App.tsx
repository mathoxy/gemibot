import ChatBot from "./components/ChatBot";


function App() {
  return (
    <div className="w-screen h-dvh bg-[#D8D4F2] flex justify-between items-center max-lg:justify-center">
      {/* Welcome*/}
      <div className="text-center w-1/2 ml-5 max-lg:hidden ">
        <h1 className="font-extrabold text-8xl mb-5 text-[#454E9E] hover:text-[#1b1b33] hover:-translate-y-5 duration-1000 ease-in-out">WELCOME</h1>
        <h2 className="font-semibold text-xl text-[#1B3022]">Together, let's turn simple ideas into powerful conversations.</h2>
      </div>
      <ChatBot />      
    </div>
  );
}

export default App;
