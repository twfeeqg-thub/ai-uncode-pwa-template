"use client"

import { useState, useRef, useEffect } from "react"
import { X, Volume2, VolumeX, RotateCcw } from "lucide-react"
import Image from "next/image"

interface Message {
  type: "user" | "bot";
  text: string;
}

interface Option {
  text: string;
  nextId: string;
}

interface CurrentNode {
  message: string;
  options: Option[];
}

export function SmartAmbassadorGuided({ config }: { config: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentNode, setCurrentNode] = useState<CurrentNode>(config.root)
  const [isMuted, setIsMuted] = useState(true) // الصوت مكتوم افتراضياً
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, currentNode])

  useEffect(() => {
    if (typeof window !== "undefined" && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.error("Web Audio API is not supported in this browser.", e);
      }
    }
  }, [])

  const playClickSound = () => {
    if (isMuted || !audioContextRef.current || audioContextRef.current.state === 'suspended') {
      audioContextRef.current?.resume();
    }
    if (isMuted || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }

  const handleOptionClick = (option: Option) => {
    playClickSound();
    const userMessage: Message = { type: "user", text: option.text };
    const nextNodeKey = option.nextId;
    const nextNode = config[nextNodeKey];
    
    setMessages((prev) => [...prev, userMessage]);
    
    if (nextNode) {
      setCurrentNode(nextNode);
    } else {
      console.error(`Node with id "${nextNodeKey}" not found in config.`);
    }
  }

  const handleClearChat = () => {
    playClickSound();
    setMessages([]);
    setCurrentNode(config.root);
  }

  const toggleChat = () => {
    playClickSound();
    setIsOpen(!isOpen);
    if (!isOpen) {
      handleClearChat();
    }
  }

  return (
    <>
      <div onClick={toggleChat} className="group fixed bottom-6 left-6 z-50 flex cursor-pointer items-center gap-3" aria-label={config.buttonLabel}>
        <div className="rounded-full bg-white px-4 py-2 text-gray-800 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="font-bold">المساعدة؟</span>
        </div>
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl transition-transform duration-300 group-hover:scale-110 animate-pulse-shadow">
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="relative inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
          </span>
          <Image src={config.logoUrl} alt="Smart Ambassador" width={40} height={40} className="w-10 h-10" unoptimized />
        </div>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998]" onClick={toggleChat} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-2xl">
              <h3 className="font-bold text-lg">{config.chatTitle}</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => { playClickSound(); setIsMuted(!isMuted); }} className="p-2 hover:bg-white/20 rounded-lg transition-colors" aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}>
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button onClick={handleClearChat} className="p-2 hover:bg-white/20 rounded-lg transition-colors" aria-label="مسح المحادثة">
                  <RotateCcw size={20} />
                </button>
                <button onClick={toggleChat} className="p-2 hover:bg-white/20 rounded-lg transition-colors" aria-label="إغلاق">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-start">
                  <div className="max-w-[85%] p-3 rounded-2xl bg-primary text-primary-foreground rounded-bl-none">
                    <p className="text-sm leading-relaxed">{config.root.message}</p>
                  </div>
              </div>

              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${ message.type === 'user' ? 'bg-gray-100 text-gray-800 rounded-br-none' : 'bg-primary text-primary-foreground rounded-bl-none' }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
                <div className="flex flex-col gap-2">
                    {currentNode.options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(option)}
                          className="w-full text-right px-4 py-3 bg-white border border-gray-200 text-gray-800 rounded-lg text-sm hover:bg-gray-100 hover:border-primary transition-all"
                        >
                          {option.text}
                        </button>
                    ))}
                </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
