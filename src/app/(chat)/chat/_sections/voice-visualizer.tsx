"use client"

import { Mic, MicOff, AlertCircle, Wifi,  } from "lucide-react"
import { useState,useEffect, type Dispatch ,type SetStateAction , useRef} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ws } from "@/lib/websocket"


type Thumbnail = {
  width: number;
  height: number;
  src: string;
};

type SearchResult = {
  kind: string;
  title: string;
  display_link: string;
  link: string;
  image: string;
  chat_id: number;
  thumbnails: Thumbnail[];
};


const  handleOnRecord = (recognition:SpeechRecognition,
                        setSpeechToText:Dispatch<SetStateAction<string>> ,
                        setError:Dispatch<SetStateAction<string>>,
                        setIsListening:Dispatch<SetStateAction<boolean>>,
                      ) => {
  setIsListening(false);
  const language = "th-TH";

  
  recognition.lang = language;
  recognition.onresult = async function (event) {
    const transcript = event.results[0][0].transcript;
    setSpeechToText(transcript);
    ws.send(JSON.stringify({
      input: transcript,
    }));

    console.log("event", event);
    console.log("Transcript:", transcript);

  }
  recognition.onerror = function (event) {
    // console.error("Speech recognition error:", event.error,event.message);
    setError(event.message);
  }

  recognition.onend = function () {
    setIsListening(false);
    console.log("Speech recognition ended");

  }

  recognition.onstart = function () {
    setIsListening(true);
    setError("");
    console.log("Speech recognition started");
  }


  recognition.start();

  
  

}


export function handleOnStop(recognition:SpeechRecognition,setIsListening:Dispatch<SetStateAction<boolean>>) {
  setIsListening(false);
  recognition.stop();
  console.log("Speech recognition stopped");
}



export function VoiceVisual({setSearchResult}: {setSearchResult:Dispatch<SetStateAction<SearchResult[]>> }) {
  const [error, setError] = useState<string>("")
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechToText, setSpeechToText] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string | undefined>( undefined);
  const audioRef = useRef<HTMLAudioElement>(null);
  let recognition: SpeechRecognition;

  

  useEffect(()=> {
    if (typeof window != "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
    }else {
      setError("ไม่รองรับการใช้งานบนเบราว์เซอร์นี้");
    }

    
    ws.onopen = () => {
      console.log("WebSocket connection established");
    }
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket message received:", data);
      if (data) {
        setSpeechToText(data.answer);
        setAudioUrl(process.env.NEXT_PUBLIC_MEDIA_URL  + data.media || undefined);
        
        if (audioRef.current ) {
          audioRef.current.src = process.env.NEXT_PUBLIC_MEDIA_URL + data.media || undefined;
          // audioRef.current.play().catch((error) => {
          //   console.error("Error playing audio:", error);
          //   setError("ไม่สามารถเล่นเสียงได้");
          // });
        }
        setSearchResult(data.search)

      }
      if (data.error) {
        setError(data.error);
      }


    }

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ WebSocket");
    };
   


  })

  

  return (
    <>
    {/* Scrollable Text positioned closer to the model */}
    <div className=" px-4  max-h-24 overflow-y-auto ">

      <p className=" text-center  text-white/80 text-sm leading-relaxed ">
        {speechToText}
      </p>
      {audioUrl}
      <audio ref={audioRef} className="hidden" controls autoPlay={true}>
        <source src={audioUrl} type="audio/mpeg" />
      </audio>

    </div>
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white  ">
      <CardContent className="">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-green-400" />
            <h3 className="text-lg font-semibold">Voice Recognition</h3>
          </div>

          {/* Error Display */}
          {error && (
            <Alert className="bg-red-500/20 border-red-500/50 w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-white text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {/* Microphone Button */}
          <Button
            onClick={() =>
              isListening
                ? handleOnStop(recognition, setIsListening)
                : handleOnRecord(recognition, setSpeechToText, setError, setIsListening)
            }
            disabled={!!error}
            className={`w-16 h-16 rounded-full transition-all duration-200 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/50"
                : "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50"
            } ${error ? "opacity-50 cursor-not-allowed" : ""}`}
            size="lg"
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          {/* Status */}
          <div className="text-center">
            <p
              className={`text-sm font-medium ${
                error ? "text-red-400" : isListening ? "text-red-400" : "text-white/60"
              }`}
            >
              {error ? "Error: "+ error  : isListening ? "กำลังฟัง... (พูดได้เลย)" : "คลิกเพื่อเริ่มพูด"}
            </p>
          </div>

          {/* Visual Indicator */}
          {isListening && !error && (
            <div className="flex space-x-1 items-end">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-blue-400 rounded-full animate-bounce"
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          )}
   
        </div>
      </CardContent>
    </Card>
    </>
  )
}
