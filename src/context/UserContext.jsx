import React, { createContext, useState } from 'react'
import run from '../gemini';
export const dataContext = createContext();

function UserContext({children}) {
    let [speaking, setSpeaking] = useState(false);
    let [prompt, setPrompt] = useState("Listening...");
    let [response, setResponse] = useState(false);
    function speak(text) {
        let chunks = splitTextIntoChunks(text, 200);
        let index = 0;
    
        function speakChunk() {
            if (index < chunks.length) {
                let text_speak = new SpeechSynthesisUtterance(chunks[index]);
                text_speak.volume = 1;
                text_speak.rate = 1;
                text_speak.pitch = 1;
                text_speak.lang = "hi-GB";
    
                text_speak.onend = () => {
                    index++;
                    speakChunk();
                };
    
                window.speechSynthesis.speak(text_speak);
            } else {
                setSpeaking(false);
            }
        }
    
        speakChunk();
    }

    function splitTextIntoChunks(text, chunkSize) {
        let chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.substring(i, i + chunkSize));
        }
        return chunks;
    }

    async function aiResponse(prompt) {
        let text = await run(prompt);
    
        let cleanText = text
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace("google", "Abdul Ahad")
            .replace("Google", "Abdul Ahad");
    
        setPrompt(cleanText);
        speak(cleanText);
        setResponse(true);
    }

    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult= (e) => {
        let currentIndex = e.resultIndex;
        let transcript = e.results[currentIndex][0].transcript;
        setPrompt(transcript);
        takeCommand(transcript.toLowerCase());
    }

    async function translateText(text, targetLang) {
        const translations = {
            hi: "मेरा नाम  AI है।",
            ur: "میرا نام  AI ہے۔",
            en: "My name is  AI.",
            fr: "Mon nom est  AI.",
            es: "Mi nombre es  AI.",
        };
        return translations[targetLang] || text;
    }

    let value = {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response
    };

  return (
    <div>
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
    </div>
  )
}

export default UserContext