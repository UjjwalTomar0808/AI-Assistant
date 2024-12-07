import { useContext } from 'react';
import AI from './assets/images/aiRobot.png';
import AiVoice from './assets/images/ai_voice.gif';
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from './context/UserContext';
import { TbLoader3 } from "react-icons/tb";

function App() {
  let {recognition, speaking, setSpeaking, prompt, setPrompt, response} = useContext(dataContext);
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="rounded-full flex justify-center items-center p-[10px] background shadow-xl">
      <div className="w-[250px] h-[250px] flex justify-center items-center overflow-hidden rounded-full background border-[#fff] border-[5px]">
        <img className="object-cover w-full rounded-full" src={AI} alt="AI Robot" />
      </div>
      </div>
      <span className=" text-[24px] font-bold text-[#525151] mt-[25px] text-center">I'm AI, Your Advance Virtual Assistant</span>
      {!speaking ? <button onClick={() => {
        setPrompt("Listening...")
        setSpeaking(true);
        recognition.start();
      }} className="text-[15px] uppercase font-bold border-[1px] border-[#525151] text-[#525151] rounded-[10px] px-[35px] py-[10px] mt-[25px] flex items-center">
        Start
        <CiMicrophoneOn className="text-[20px] font-bold text-" />
      </button> : <div className="w-full flex flex-col justify-center items-center gap-4 mt-[10px]">
        {!response ? <TbLoader3 className="text-[54px] animate-spin text-[#525151]" /> : <img src={AiVoice} alt="ai_response" className="w-[150px]" />}
          <p className="text-[14px] font-bold text-[#525151] text-center">{prompt}</p>
        </div>}
      
    </div>
  )
}

export default App
