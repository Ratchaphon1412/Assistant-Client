"use client"

import { Mic, MicOff, AlertCircle, Wifi, WifiOff } from "lucide-react"
import { useState, useEffect, type Dispatch, type SetStateAction, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { wsManager } from "@/lib/websocket"


type Thumbnail = {
  width: number
  height: number
  src: string
}

type SearchResult = {
  kind: string
  title: string
  display_link: string
  link: string
  image: string
  chat_id: number
  thumbnails: Thumbnail[]
}

export function VoiceVisual({ setSearchResult }: { setSearchResult: Dispatch<SetStateAction<SearchResult[]>> }) {
  const [error, setError] = useState<string>("")
  const [isListening, setIsListening] = useState<boolean>(false)
  const [speechToText, setSpeechToText] = useState<string>("")
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Initialize WebSocket connection
  const initializeWebSocket = useCallback(async () => {
    if (isConnecting) return

    setIsConnecting(true)
    setError("")

    try {
      await wsManager.connect()
      setIsConnected(true)
    } catch (error) {
      console.error("Failed to connect WebSocket:", error)
      setError("ไม่สามารถเชื่อมต่อ WebSocket ได้")
      setIsConnected(false)
    } finally {
      setIsConnecting(false)
    }
  }, [isConnecting])

  // WebSocket event handlers
  useEffect(() => {
    const handleOpen = () => {
      console.log("WebSocket connection established")
      setIsConnected(true)
      setError("")
    }

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        console.log("WebSocket message received:", data)

        if (data) {
          setSpeechToText(data.answer || "")

          if (data.media) {
            const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL + data.media
            setAudioUrl(mediaUrl)

            if (audioRef.current) {
              audioRef.current.src = mediaUrl
              audioRef.current.play().catch((error) => {
                console.error("Error playing audio:", error)
              })
            }
          }

          if (data.search) {
            setSearchResult(data.search)
          }
        }

        if (data.error) {
          setError(data.error)
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error)
        setError("เกิดข้อผิดพลาดในการประมวลผลข้อมูล")
      }
    }

    const handleError = (event: Event) => {
      console.error("WebSocket error:", event)
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ WebSocket")
      setIsConnected(false)
    }

    const handleClose = () => {
      console.log("WebSocket connection closed")
      setIsConnected(false)
    }

    const handleMaxReconnectAttempts = () => {
      setError("ไม่สามารถเชื่อมต่อ WebSocket ได้ กรุณาลองใหม่อีกครั้ง")
      setIsConnected(false)
    }

    // Register event listeners
    wsManager.on("open", handleOpen)
    wsManager.on("message", handleMessage as (event: unknown) => void)
    wsManager.on("error", handleError as (event: unknown) => void)
    wsManager.on("close", handleClose)
    wsManager.on("maxReconnectAttemptsReached", handleMaxReconnectAttempts)

    // Initialize connection
    if (!wsManager.isConnected()) {
      initializeWebSocket()
    } else {
      setIsConnected(true)
    }

    // Cleanup
    return () => {
      wsManager.off("open", handleOpen)
      wsManager.off("message", handleMessage as (event: unknown) => void)
      wsManager.off("error", handleError as (event: unknown) => void)
      wsManager.off("close", handleClose)
      wsManager.off("maxReconnectAttemptsReached", handleMaxReconnectAttempts)
    }
  }, [initializeWebSocket, setSearchResult])

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.webkitSpeechRecognition) {
        recognitionRef.current = new window.webkitSpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
      } else {
        setError("ไม่รองรับการใช้งานบนเบราว์เซอร์นี้")
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const handleStartRecording = useCallback(() => {
    if (!recognitionRef.current) {
      setError("Speech Recognition ไม่พร้อมใช้งาน")
      return
    }

    if (!isConnected) {
      setError("กรุณารอการเชื่อมต่อ WebSocket")
      initializeWebSocket()
      return
    }

    setError("")
    setIsListening(true)
    setSpeechToText("")

    const recognition = recognitionRef.current
    recognition.lang = "th-TH"

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      console.log("Transcript:", transcript)
      setSpeechToText(transcript)

      // Send to WebSocket
      if (wsManager.isConnected()) {
        wsManager.send(
          JSON.stringify({
            input: transcript,
          }),
        )
      } else {
        setError("การเชื่อมต่อ WebSocket หลุด กำลังเชื่อมต่อใหม่...")
        initializeWebSocket()
      }
    }

    recognition.onerror = (event: { error: unknown }) => {
      console.error("Speech recognition error:", event.error)
      setError(`เกิดข้อผิดพลาด: ${event.error}`)
      setIsListening(false)
    }

    recognition.onend = () => {
      console.log("Speech recognition ended")
      setIsListening(false)
    }

    recognition.onstart = () => {
      console.log("Speech recognition started")
      setIsListening(true)
    }

    try {
      recognition.start()
    } catch (error) {
      console.error("Failed to start recognition:", error)
      setError("ไม่สามารถเริ่มการรับฟังได้")
      setIsListening(false)
    }
  }, [isConnected, initializeWebSocket])

  const handleStopRecording = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      console.log("Speech recognition stopped")
    }
  }, [isListening])

  const handleReconnect = useCallback(() => {
    setError("")
    initializeWebSocket()
  }, [initializeWebSocket])

  return (
    <>
      {/* Speech Text Display */}
      <div className="px-4 max-h-24 overflow-y-auto">
        <p className="text-center text-white/80 text-sm leading-relaxed">{speechToText}</p>
        <audio ref={audioRef} className="hidden" controls autoPlay>
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              {isConnected ? <Wifi className="w-4 h-4 text-green-400" /> : <WifiOff className="w-4 h-4 text-red-400" />}
              <h3 className="text-lg font-semibold">Voice Recognition</h3>
              {isConnecting && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
            </div>

            {/* Error Display */}
            {error && (
              <Alert className="bg-red-500/20 border-red-500/50 w-full">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-white text-sm">
                  {error}
                  {!isConnected && (
                    <Button
                      onClick={handleReconnect}
                      variant="outline"
                      size="sm"
                      className="ml-2 h-6 text-xs bg-transparent"
                      disabled={isConnecting}
                    >
                      เชื่อมต่อใหม่
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Microphone Button */}
            <Button
              onClick={isListening ? handleStopRecording : handleStartRecording}
              disabled={!isConnected || isConnecting}
              className={`w-16 h-16 rounded-full transition-all duration-200 ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/50"
                  : "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50"
              } ${!isConnected || isConnecting ? "opacity-50 cursor-not-allowed" : ""}`}
              size="lg"
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>

            {/* Status */}
            <div className="text-center">
              <p
                className={`text-sm font-medium ${
                  error
                    ? "text-red-400"
                    : !isConnected
                      ? "text-yellow-400"
                      : isListening
                        ? "text-red-400"
                        : "text-white/60"
                }`}
              >
                {!isConnected
                  ? isConnecting
                    ? "กำลังเชื่อมต่อ..."
                    : "ไม่ได้เชื่อมต่อ"
                  : error
                    ? `Error: ${error}`
                    : isListening
                      ? "กำลังฟัง... (พูดได้เลย)"
                      : "คลิกเพื่อเริ่มพูด"}
              </p>
            </div>

            {/* Visual Indicator */}
            {isListening && !error && isConnected && (
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
