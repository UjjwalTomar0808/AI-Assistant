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

    async function takeCommand(command) {
        if (command.includes("tumhara naam kya hai") || 
        command.includes("what is your name") || 
        command.includes("apka naam kya hai")) {
        
        let lang = "en";
        if (command.includes("kya hai")) lang = "hi";
        if (command.includes("نام")) lang = "ur";

        let response = await translateText("My name is  AI.", lang);
        speak(response);
        setPrompt(response);
        } else if (command.includes("open") && command.includes("youtube")) {
            window.open("https://www.youtube.com/", "_blank");
            speak("Opening YouTube");
            setResponse(true);
            setPrompt("Opening YouTube...");
            setTimeout(() => {
                setSpeaking(false);
            }, 5000);
        } else if (command.includes("open") && command.includes("facebook")) {
            window.open("https://www.facebook.com/", "_blank");
            speak("Opening Facebook");
            setResponse(true);
            setPrompt("Opening Facebook...");
            setTimeout(() => {
                setSpeaking(false);
            }, 5000);
        } else if (command.includes("open") && command.includes("google")) {
            window.open("https://www.google.com/", "_blank");
            speak("Opening Google");
            setResponse(true);
            setPrompt("Opening Google...");
            setTimeout(() => {
                setSpeaking(false);
            }, 5000);
        } else if (command.includes("open") && command.includes("instagram")) {
            window.open("https://www.instagram.com/", "_blank");
            speak("Opening Instagram");
            setResponse(true);
            setPrompt("Opening Instagram...");
            setTimeout(() => {
                setSpeaking(false);
            }, 5000);
        } else if (command.includes("open") && command.includes("github")) {
            window.open("https://github.com/", "_blank");
            speak("Opening GitHub");
            setResponse(true);
            setPrompt("Opening GitHub...");
            setTimeout(() => {
                setSpeaking(false);
            }, 5000);
        } else if (command.includes("open") && command.includes("linkedin")) {
            window.open("https://www.linkedin.com/", "_blank");
            speak("Opening LinkedIn");
            setResponse(true);
            setPrompt("Opening LinkedIn...");
            setTimeout(() => {
                setSpeaking(false);
            }, 5000);
        } else if (command.includes("open") && command.includes("canva")) {
            window.open("https://www.canva.com/", "_blank");
            speak("Opening Canva");
            setResponse(true);
            setPrompt("Opening Canva...");
            setTimeout(() => {
                setSpeaking(false);
            }, 5000);
        } else if (command.includes("open") && command.includes("vercel")) {
            window.open("https://vercel.com/", "_blank");
            speak("Opening Vercel");
            setResponse(true);
            setPrompt("Opening Vercel...");
            setTimeout(() => {
                setSpeaking(false);
            }, 5000);
        } else if (command.includes("open") && command.includes("netlify")) {
            window.open("https://www.netlify.com/", "_blank");
            speak("Opening Netlify");
            setResponse(true);
            setPrompt("Opening Netlify...");
            setTimeout(() => {
                setSpeaking(false);
            }, 5000);
        } else if (command.includes("open") && command.includes("gmail")) {
            window.open("https://mail.google.com/", "_blank");
            speak("Opening Gmail");
            setResponse(true);
            setPrompt("Opening Gmail...");
            setTimeout(() => {
                setSpeaking(false);
            }, 5000);
        } else {
            aiResponse(command);
        }
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