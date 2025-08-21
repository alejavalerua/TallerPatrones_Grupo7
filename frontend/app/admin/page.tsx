"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Bell, MessageCircle, Send, User, Clock, CheckCircle, Menu, X } from "lucide-react"

interface ChatSession {
  id: string
  userName: string
  userEmail: string
  status: "waiting" | "active" | "resolved"
  startTime: string
  lastMessage: string
  unreadCount: number
  messages: Array<{
    id: string
    sender: "user" | "admin"
    message: string
    timestamp: string
  }>
}

export default function AdminDashboard() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      userName: "María González",
      userEmail: "maria@email.com",
      status: "waiting",
      startTime: "14:30",
      lastMessage: "Hola, necesito ayuda con mi pedido",
      unreadCount: 1,
      messages: [
        {
          id: "1",
          sender: "user",
          message: "Hola, necesito ayuda con mi pedido",
          timestamp: "14:30",
        },
      ],
    },
    {
      id: "2",
      userName: "Carlos Rodríguez",
      userEmail: "carlos@email.com",
      status: "active",
      startTime: "14:15",
      lastMessage: "Perfecto, muchas gracias por la ayuda",
      unreadCount: 0,
      messages: [
        {
          id: "1",
          sender: "user",
          message: "¿Tienen descuentos en ropa deportiva?",
          timestamp: "14:15",
        },
        {
          id: "2",
          sender: "admin",
          message: "Sí, tenemos 20% de descuento en toda la colección de running",
          timestamp: "14:16",
        },
        {
          id: "3",
          sender: "user",
          message: "Perfecto, muchas gracias por la ayuda",
          timestamp: "14:18",
        },
      ],
    },
  ])

  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [notifications, setNotifications] = useState(1)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newSession: ChatSession = {
          id: Date.now().toString(),
          userName: `Usuario ${Math.floor(Math.random() * 100)}`,
          userEmail: `usuario${Math.floor(Math.random() * 100)}@email.com`,
          status: "waiting",
          startTime: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
          lastMessage: "Hola, necesito ayuda",
          unreadCount: 1,
          messages: [
            {
              id: "1",
              sender: "user",
              message: "Hola, necesito ayuda",
              timestamp: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
            },
          ],
        }
        setChatSessions((prev) => [newSession, ...prev])
        setNotifications((prev) => prev + 1)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return

    const message = {
      id: Date.now().toString(),
      sender: "admin" as const,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
    }

    setChatSessions((prev) =>
      prev.map((session) =>
        session.id === selectedChat.id
          ? {
              ...session,
              messages: [...session.messages, message],
              lastMessage: newMessage,
              status: "active",
            }
          : session,
      ),
    )

    setSelectedChat((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, message],
            lastMessage: newMessage,
            status: "active",
          }
        : null,
    )

    setNewMessage("")
  }

  const handleSelectChat = (chat: ChatSession) => {
    setSelectedChat(chat)
    setChatSessions((prev) =>
      prev.map((session) => (session.id === chat.id ? { ...session, unreadCount: 0 } : session)),
    )
    if (chat.unreadCount > 0) {
      setNotifications((prev) => Math.max(0, prev - chat.unreadCount))
    }
  }

  const handleResolveChat = () => {
    if (!selectedChat) return

    setChatSessions((prev) =>
      prev.map((session) => (session.id === selectedChat.id ? { ...session, status: "resolved" } : session)),
    )
    setSelectedChat((prev) => (prev ? { ...prev, status: "resolved" } : null))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-red-500"
      case "active":
        return "bg-green-500"
      case "resolved":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "waiting":
        return "Esperando"
      case "active":
        return "Activo"
      case "resolved":
        return "Resuelto"
      default:
        return "Desconocido"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <Link href="/" className="hidden sm:block">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Volver al sitio</span>
                <span className="md:hidden">Volver</span>
              </Button>
            </Link>
            <h1 className="text-lg lg:text-2xl font-bold text-gray-900">
              <span className="hidden sm:inline">Panel de Administración</span>
              <span className="sm:hidden">Admin</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="relative">
              <Bell className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                  {notifications}
                </Badge>
              )}
            </div>
            <div className="text-xs lg:text-sm text-gray-600 hidden sm:block">Admin: SportFlex</div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)] relative">
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Lista de chats */}
        <div
          className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative
          fixed left-0 top-0 z-50
          w-80 lg:w-1/3 xl:w-1/4
          h-full lg:h-auto
          bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out
        `}
        >
          <div className="p-3 lg:p-4 border-b border-gray-200">
            <h2 className="text-base lg:text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="hidden sm:inline">Sesiones de Chat ({chatSessions.length})</span>
              <span className="sm:hidden">Chats ({chatSessions.length})</span>
            </h2>
          </div>
          <ScrollArea className="h-[calc(100vh-140px)] lg:h-full">
            <div className="p-2">
              {chatSessions.map((chat) => (
                <Card
                  key={chat.id}
                  className={`mb-2 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedChat?.id === chat.id ? "ring-2 ring-emerald-500" : ""
                  }`}
                  onClick={() => {
                    handleSelectChat(chat)
                    setIsSidebarOpen(false)
                  }}
                >
                  <CardContent className="p-3 lg:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <User className="h-3 w-3 lg:h-4 lg:w-4 text-gray-500 flex-shrink-0" />
                        <span className="font-medium text-xs lg:text-sm truncate">{chat.userName}</span>
                        {chat.unreadCount > 0 && (
                          <Badge className="h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0 flex-shrink-0">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <Badge className={`text-xs ${getStatusColor(chat.status)} text-white flex-shrink-0 ml-2`}>
                        <span className="hidden sm:inline">{getStatusText(chat.status)}</span>
                        <span className="sm:hidden">
                          {chat.status === "waiting" ? "E" : chat.status === "active" ? "A" : "R"}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 truncate">{chat.userEmail}</p>
                    <p className="text-xs lg:text-sm text-gray-800 truncate mb-2">{chat.lastMessage}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {chat.startTime}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Área principal - Chat seleccionado */}
        <div className="flex-1 flex flex-col min-w-0">
          {selectedChat ? (
            <>
              {/* Header del chat */}
              <div className="bg-white border-b border-gray-200 p-3 lg:p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">
                      {selectedChat.userName}
                    </h3>
                    <p className="text-xs lg:text-sm text-gray-600 truncate">{selectedChat.userEmail}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <Badge className={`${getStatusColor(selectedChat.status)} text-white text-xs`}>
                      <span className="hidden sm:inline">{getStatusText(selectedChat.status)}</span>
                      <span className="sm:hidden">
                        {selectedChat.status === "waiting" ? "E" : selectedChat.status === "active" ? "A" : "R"}
                      </span>
                    </Badge>
                    {selectedChat.status !== "resolved" && (
                      <Button
                        onClick={handleResolveChat}
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                      >
                        <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                        <span className="hidden sm:inline">Resolver</span>
                        <span className="sm:hidden">OK</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              <ScrollArea className="flex-1 p-3 lg:p-4">
                <div className="space-y-3 lg:space-y-4">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 lg:px-4 py-2 rounded-lg ${
                          message.sender === "admin" ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        <p className="text-xs lg:text-sm break-words">{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "admin" ? "text-emerald-100" : "text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input para enviar mensajes */}
              {selectedChat.status !== "resolved" && (
                <div className="bg-white border-t border-gray-200 p-3 lg:p-4">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 text-sm"
                    />
                    <Button onClick={handleSendMessage} className="bg-emerald-500 hover:bg-emerald-600 px-3 lg:px-4">
                      <Send className="h-3 w-3 lg:h-4 lg:w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
              <div className="text-center max-w-sm">
                <MessageCircle className="h-8 w-8 lg:h-12 lg:w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-2">
                  <span className="hidden sm:inline">Selecciona una conversación</span>
                  <span className="sm:hidden">Selecciona un chat</span>
                </h3>
                <p className="text-sm lg:text-base text-gray-600">
                  <span className="hidden sm:inline">Elige una sesión de chat para comenzar a responder</span>
                  <span className="sm:hidden">Elige un chat para responder</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
