"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Smile,
  Paperclip,
  Mic,
  ImageIcon,
  ThumbsUp,
  Heart,
  Sparkles,
  Volume2,
  Volume,
  Moon,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Custom hook for sound effects
const useSound = (url: string) => {
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audio.current = new Audio(url)
    return () => {
      if (audio.current) {
        audio.current.pause()
      }
    }
  }, [url])

  const play = () => {
    if (audio.current) {
      audio.current.currentTime = 0
      audio.current.play()
    }
  }

  return play
}

// Particle effect component for celebrations
const ParticleEffect = ({ isActive }: { isActive: boolean }) => {
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 400,
    y: Math.random() * 400,
    size: Math.random() * 6 + 2,
    color: [
      "#FF5E5B",
      "#D8D8D8",
      "#FFFFEA",
      "#00CECB",
      "#FFED66",
      "#A64AC9",
      "#FCCD04",
      "#FFB48F",
      "#F5B700",
      "#17BEBB",
    ][Math.floor(Math.random() * 10)],
  }))

  if (!isActive) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          initial={{
            x: 200,
            y: 200,
            opacity: 1,
            scale: 0,
          }}
          animate={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
        />
      ))}
    </div>
  )
}

// Quick reply component
const QuickReply = ({ text, onClick }: { text: string; onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-3 py-1.5 bg-gray-800 text-white text-sm rounded-full hover:bg-gray-700 transition-colors"
    onClick={onClick}
  >
    {text}
  </motion.button>
)

// Message reaction component
const MessageReaction = ({
  type,
  count,
  active,
  onClick,
}: {
  type: "like" | "love"
  count: number
  active: boolean
  onClick: () => void
}) => {
  const icons = {
    like: <ThumbsUp className="h-3 w-3" />,
    love: <Heart className="h-3 w-3" />,
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "flex items-center space-x-1 px-2 py-1 rounded-full text-xs",
        active ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700",
      )}
      onClick={onClick}
    >
      {icons[type]}
      <span>{count}</span>
    </motion.button>
  )
}

// Typing indicator with realistic animation
const TypingIndicator = () => (
  <div className="flex space-x-1.5 items-end h-5 px-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-gray-400 rounded-full"
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: i * 0.15,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
)

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      content: "Hi there! 👋 How can I help you today?",
      timestamp: new Date(),
      reactions: { like: 0, love: 0 },
      userReaction: null as null | "like" | "love",
      isSpecial: false,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [quickReplies, setQuickReplies] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatControls = useAnimation()
  const buttonControls = useAnimation()

  // Sound effects
  const playMessageSent = useSound("/message-sent.mp3")
  const playMessageReceived = useSound("/message-received.mp3")
  const playCelebration = useSound("/celebration.mp3")

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate recording time counter
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      setRecordingTime(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  // Pulse animation for the chat button
  useEffect(() => {
    const pulseAnimation = async () => {
      while (true) {
        await buttonControls.start({
          scale: 1.05,
          boxShadow: "0 0 15px 5px rgba(168, 85, 247, 0.4)",
          transition: { duration: 1.5 },
        })
        await buttonControls.start({
          scale: 1,
          boxShadow: "0 0 5px 2px rgba(168, 85, 247, 0.2)",
          transition: { duration: 1.5 },
        })
      }
    }

    if (!isOpen) {
      pulseAnimation()
    } else {
      buttonControls.stop()
      buttonControls.set({ scale: 1, boxShadow: "0 0 0 0 rgba(0,0,0,0)" })
    }
  }, [isOpen, buttonControls])

  const toggleChat = () => {
    if (!isOpen) {
      setUnreadCount(0)
    }
    setIsOpen(!isOpen)
    setMinimized(false)
  }

  const toggleMinimize = () => {
    setMinimized(!minimized)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const generateQuickReplies = (message: string) => {
    // Generate contextual quick replies based on the bot's message
    if (message.includes("product")) {
      return ["Tell me more", "Show pricing", "Features?"]
    } else if (message.includes("help")) {
      return ["Yes, please", "No thanks", "Contact support"]
    } else if (message.includes("collection")) {
      return ["Show latest", "Any discounts?", "How to order?"]
    } else {
      return ["Yes", "No", "Maybe", "Tell me more"]
    }
  }

  const simulateTypingDelay = (message: string) => {
    // Calculate a realistic typing delay based on message length
    const baseDelay = 500 // minimum delay in ms
    const charsPerSecond = 20 // average typing speed
    const messageLength = message.length
    const typingTime = Math.max(baseDelay, Math.min(3000, (messageLength / charsPerSecond) * 1000))
    return typingTime
  }

  const handleSendMessage = (e?: React.FormEvent, quickReply?: string) => {
    if (e) e.preventDefault()

    const messageContent = quickReply || newMessage
    if (!messageContent.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: messageContent,
      timestamp: new Date(),
      reactions: { like: 0, love: 0 },
      userReaction: null as null | "like" | "love",
      isSpecial: false,
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)
    setQuickReplies([])

    if (isSoundOn) playMessageSent()

    // Simulate bot response after a realistic delay
    const botResponses = [
      "I'd be happy to help with that! Could you provide more details?",
      "Thanks for your question. Let me check that for you.",
      "Great question! Here's what you need to know about our products...",
      "I understand what you're looking for. Have you checked our latest collection?",
      "I can definitely assist with that. Is there anything specific you're interested in?",
      "That's an excellent point! Let me show you some options that might work for you.",
      "I appreciate your patience. I've found some information that might help.",
      "Perfect! I've made a note of your preferences and will tailor my recommendations accordingly.",
    ]

    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
    const typingDelay = simulateTypingDelay(randomResponse)

    // Special responses that trigger celebration
    const isSpecialMessage =
      messageContent.toLowerCase().includes("amazing") ||
      messageContent.toLowerCase().includes("awesome") ||
      messageContent.toLowerCase().includes("thank")

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        role: "bot",
        content: isSpecialMessage
          ? "That's fantastic! 🎉 I'm so glad I could help you today! Is there anything else you'd like to know?"
          : randomResponse,
        timestamp: new Date(),
        reactions: { like: 0, love: 0 },
        userReaction: null as null | "like" | "love",
        isSpecial: isSpecialMessage,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)

      if (isSoundOn) playMessageReceived()

      if (!isOpen) {
        setUnreadCount((prev) => prev + 1)
      }

      if (isSpecialMessage) {
        setShowCelebration(true)
        if (isSoundOn) playCelebration()
        setTimeout(() => setShowCelebration(false), 3000)
      }

      // Generate quick replies based on bot message
      setQuickReplies(generateQuickReplies(botMessage.content))
    }, typingDelay)
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(undefined, reply)
  }

  const handleReaction = (messageId: number, reactionType: "like" | "love") => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          // If user already reacted with this type, remove it
          if (msg.userReaction === reactionType) {
            return {
              ...msg,
              reactions: {
                ...msg.reactions,
                [reactionType]: msg.reactions[reactionType] - 1,
              },
              userReaction: null,
            }
          }
          // If user reacted with different type, switch it
          else if (msg.userReaction) {
            return {
              ...msg,
              reactions: {
                ...msg.reactions,
                [msg.userReaction]: msg.reactions[msg.userReaction] - 1,
                [reactionType]: msg.reactions[reactionType] + 1,
              },
              userReaction: reactionType,
            }
          }
          // If no previous reaction
          else {
            return {
              ...msg,
              reactions: {
                ...msg.reactions,
                [reactionType]: msg.reactions[reactionType] + 1,
              },
              userReaction: reactionType,
            }
          }
        }
        return msg
      }),
    )
  }

  const handleVoiceMessage = () => {
    if (isRecording) {
      // Simulate sending a voice message
      const voiceMessage = {
        id: messages.length + 1,
        role: "user",
        content: `🎤 Voice message (${formatTime(recordingTime)})`,
        timestamp: new Date(),
        reactions: { like: 0, love: 0 },
        userReaction: null as null | "like" | "love",
        isSpecial: false,
      }

      setMessages((prev) => [...prev, voiceMessage])
      setIsRecording(false)

      // Trigger bot response
      setIsTyping(true)
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          role: "bot",
          content: "I've received your voice message. Let me process that for you...",
          timestamp: new Date(),
          reactions: { like: 0, love: 0 },
          userReaction: null as null | "like" | "love",
          isSpecial: false,
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)

        if (isSoundOn) playMessageReceived()
        setQuickReplies(["Yes", "No", "Can you repeat that?"])
      }, 1500)
    } else {
      setIsRecording(true)
    }
  }

  const getThemeClasses = () => {
    return isDarkMode
      ? {
          container: "border-gray-700 bg-gray-900",
          header: "bg-gray-800",
          input: "border-gray-700 bg-gray-800 text-white placeholder:text-gray-400",
          message: {
            user: "bg-purple-700 text-white",
            bot: "bg-gray-800 text-white",
          },
        }
      : {
          container: "border-gray-200 bg-white",
          header: "bg-gray-100",
          input: "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-500",
          message: {
            user: "bg-purple-600 text-white",
            bot: "bg-gray-100 text-gray-900",
          },
        }
  }

  const theme = getThemeClasses()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: minimized ? "auto" : "auto",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            className={`chatbot-container mb-4 w-[350px] overflow-hidden rounded-lg border shadow-xl sm:w-[400px] ${theme.container}`}
          >
            {/* Chat header */}
            <div className={`flex items-center justify-between p-4 ${theme.header}`}>
              <div className="flex items-center">
                <motion.div whileHover={{ rotate: 10 }} whileTap={{ scale: 0.9 }}>
                  <Avatar className="mr-2 h-8 w-8 bg-gradient-to-br from-purple-600 to-indigo-600">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div>
                  <h3 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                      AI Assistant
                    </motion.span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "auto" }}
                      className="ml-1 inline-block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                    >
                      Pro
                    </motion.span>
                  </h3>
                  <div className="flex items-center text-xs">
                    <motion.span
                      animate={{
                        backgroundColor: ["#10B981", "#10B981", "#10B981"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500"
                    ></motion.span>
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Online | Instant replies</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSound}
                  className={`h-8 w-8 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
                >
                  {isSoundOn ? <Volume2 className="h-4 w-4" /> : <Volume className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className={`h-8 w-8 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMinimize}
                  className={`h-8 w-8 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
                >
                  {minimized ? (
                    <motion.div initial={{ rotate: 0 }} animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                      <MessageCircle className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div initial={{ rotate: 180 }} animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
                      <MessageCircle className="h-4 w-4" />
                    </motion.div>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChat}
                  className={`h-8 w-8 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages area */}
            {!minimized && (
              <motion.div
                className="h-[350px] overflow-y-auto p-4"
                initial={{ height: 0 }}
                animate={{ height: "350px" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "bot" && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Avatar className="mr-2 mt-1 h-8 w-8 bg-gradient-to-br from-purple-600 to-indigo-600">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                    )}
                    <div className="flex flex-col">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className={`max-w-[75%] rounded-lg p-3 ${
                          message.role === "user" ? theme.message.user : theme.message.bot
                        } ${message.isSpecial ? "ring-2 ring-purple-400 ring-opacity-50" : ""}`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="mt-1 text-right text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {message.role === "user" && <span className="ml-1">✓✓</span>}
                        </p>
                      </motion.div>

                      {/* Message reactions */}
                      <div className="mt-1 flex space-x-1 self-end">
                        {message.role === "bot" && (
                          <>
                            <MessageReaction
                              type="like"
                              count={message.reactions.like}
                              active={message.userReaction === "like"}
                              onClick={() => handleReaction(message.id, "like")}
                            />
                            <MessageReaction
                              type="love"
                              count={message.reactions.love}
                              active={message.userReaction === "love"}
                              onClick={() => handleReaction(message.id, "love")}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="mb-4 flex justify-start">
                    <Avatar className="mr-2 mt-1 h-8 w-8 bg-gradient-to-br from-purple-600 to-indigo-600">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className={`max-w-[75%] rounded-lg p-3 ${theme.message.bot}`}>
                      <TypingIndicator />
                    </div>
                  </div>
                )}

                {/* Quick replies */}
                {quickReplies.length > 0 && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 flex flex-wrap gap-2"
                  >
                    {quickReplies.map((reply, index) => (
                      <QuickReply key={index} text={reply} onClick={() => handleQuickReply(reply)} />
                    ))}
                  </motion.div>
                )}

                {/* Celebration effect */}
                <ParticleEffect isActive={showCelebration} />

                {/* Invisible div for auto-scrolling */}
                <div ref={messagesEndRef} />
              </motion.div>
            )}

            {/* Input area */}
            {!minimized && (
              <motion.form
                onSubmit={handleSendMessage}
                className={`border-t p-4 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {isRecording ? (
                  <div className="flex items-center">
                    <div className={`flex-1 rounded-md px-3 py-2 ${theme.input}`}>
                      <div className="flex items-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                          className="mr-2 h-3 w-3 rounded-full bg-red-500"
                        />
                        <span>Recording... {formatTime(recordingTime)}</span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      onClick={handleVoiceMessage}
                      className="ml-2 bg-red-500 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className={`pr-10 ${theme.input}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 transform"
                      >
                        <Smile className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                    <div className="ml-2 flex space-x-1">
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className={`h-9 w-9 ${isDarkMode ? "border-gray-700 text-gray-400 hover:text-white" : "border-gray-200 text-gray-500 hover:text-gray-900"}`}
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className={`h-9 w-9 ${isDarkMode ? "border-gray-700 text-gray-400 hover:text-white" : "border-gray-200 text-gray-500 hover:text-gray-900"}`}
                        onClick={handleVoiceMessage}
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className={`h-9 w-9 ${isDarkMode ? "border-gray-700 text-gray-400 hover:text-white" : "border-gray-200 text-gray-500 hover:text-gray-900"}`}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        type="submit"
                        size="icon"
                        className="h-9 w-9 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        disabled={!newMessage.trim() && !isRecording}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </motion.form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat button with notification badge */}
      <motion.button
        animate={buttonControls}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:from-purple-700 hover:to-indigo-700"
        aria-label="Chat with us"
      >
        <motion.div initial={{ rotate: 0 }} animate={{ rotate: isOpen ? 360 : 0 }} transition={{ duration: 0.5 }}>
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.div>

        {/* Notification badge */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
          >
            {unreadCount}
          </motion.div>
        )}

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ boxShadow: "0 0 0 0 rgba(168, 85, 247, 0.7)" }}
          animate={{
            boxShadow: ["0 0 0 0 rgba(168, 85, 247, 0.7)", "0 0 0 10px rgba(168, 85, 247, 0)"],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            repeatDelay: 0.5,
          }}
        />
      </motion.button>

      {/* Sparkles effect around the button */}
      <motion.div
        className="absolute bottom-7 right-7 text-purple-400"
        animate={{
          rotate: 360,
          opacity: [0.7, 0.3, 0.7],
        }}
        transition={{
          rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      >
        <Sparkles className="h-20 w-20" />
      </motion.div>
    </div>
  )
}
