"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const faqs = [
  {
    question: "¿Cuál es el horario de atención?",
    answer: "Nuestro equipo atiende de lunes a viernes de 8:00 AM a 6:00 PM y sábados de 9:00 AM a 2:00 PM.",
  },
  {
    question: "¿Dónde están ubicados?",
    answer:
      "Nuestra oficina principal está en Calle 123 #45-67, Bogotá, Colombia, pero ofrecemos soporte en todo el país.",
  },
  {
    question: "¿Ofrecen soporte remoto?",
    answer: "Sí, contamos con asistencia por videollamada, chat en línea y soporte vía correo electrónico.",
  },
  {
    question: "¿Cómo puedo realizar una compra?",
    answer:
      "Selecciona el producto que desees, pulsa en 'Agregar al carrito' y sigue el proceso de pago desde la sección 'Mi Carrito'.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos tarjetas de crédito, débito, PSE, PayPal y pagos en efectivo en puntos autorizados.",
  },
  {
    question: "¿Puedo pedir un reembolso?",
    answer:
      "Sí, puedes solicitar un reembolso dentro de los primeros 7 días tras la compra, siempre que el producto no haya sido utilizado.",
  },
  {
    question: "¿Cómo puedo rastrear mi pedido?",
    answer:
      "En la sección 'Mis Compras', selecciona tu pedido y pulsa en 'Rastrear envío' para ver el estado en tiempo real.",
  },
  {
    question: "¿Tienen promociones o descuentos?",
    answer: "Sí, publicamos promociones especiales cada mes y descuentos exclusivos para usuarios Premium.",
  },
  {
    question: "¿Cómo me hago usuario Premium?",
    answer: "En el menú principal, selecciona 'Suscripciones' y elige el plan que más te convenga.",
  },
  {
    question: "¿Cómo puedo cambiar mi método de pago?",
    answer: "Ve a 'Configuración de cuenta' → 'Métodos de pago' y añade o elimina tus tarjetas y cuentas asociadas.",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{ type: "bot" | "user"; content: string; timestamp: string }>>([
    { type: "bot", content: "Hola 👋, ¿en qué puedo ayudarte hoy?", timestamp: "Ahora" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [advisorChatEnabled, setAdvisorChatEnabled] = useState(false)
  const [ticketGenerated, setTicketGenerated] = useState(false)

  const handleFaqClick = (faq: (typeof faqs)[0]) => {
    const userMessage = { type: "user" as const, content: faq.question, timestamp: "Ahora" }
    const botResponse = { type: "bot" as const, content: faq.answer, timestamp: "Ahora" }

    setMessages((prev) => [...prev, userMessage, botResponse])
  }

  const handleAdvisorChat = () => {
    setAdvisorChatEnabled(true)
    const botMessage = {
      type: "bot" as const,
      content:
        "Te he conectado con un asesor humano. Por favor, describe tu consulta y te ayudaremos lo antes posible.",
      timestamp: "Ahora",
    }
    setMessages((prev) => [...prev, botMessage])
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = { type: "user" as const, content: inputMessage, timestamp: "Ahora" }
    setMessages((prev) => [...prev, userMessage])

    if (advisorChatEnabled && !ticketGenerated) {
      const ticketNumber = `TK-${Date.now().toString().slice(-6)}`
      const botResponse = {
        type: "bot" as const,
        content: `Ticket generado: ${ticketNumber}. Un asesor te contactará en breve. Espera en línea.`,
        timestamp: "Ahora",
      }
      setMessages((prev) => [...prev, botResponse])
      setTicketGenerated(true)
    }

    setInputMessage("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <img src="/4code-solutions-logo.png" alt="4Code Solutions" className="h-8 w-auto" />
              <h1 className="text-2xl font-bold text-primary">SportFlex</h1>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="default" size="sm">
              CLIENTE
            </Button>
            <Link href="/admin">
              <Button variant="outline" size="sm">
                ADMIN
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-lg h-[700px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-primary text-primary-foreground p-6 rounded-t-lg">
              <h3 className="text-2xl font-semibold">Asistente Virtual</h3>
              <p className="text-primary-foreground/80 text-base">Estamos aquí para ayudarte</p>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-8 bg-white overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 mb-8 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg ${
                      message.type === "bot" ? "bg-primary" : "bg-gray-500"
                    }`}
                  >
                    {message.type === "bot" ? "A" : <User className="h-6 w-6" />}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`rounded-lg p-5 max-w-lg text-base ${
                        message.type === "bot" ? "bg-gray-100" : "bg-primary text-primary-foreground ml-auto"
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    <p className={`text-sm text-muted-foreground mt-2 ${message.type === "user" ? "text-right" : ""}`}>
                      {message.type === "bot" ? "Asistente Virtual" : "Tú"} • {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}

              {/* FAQ Section - only show if no advisor chat enabled */}
              {!advisorChatEnabled && (
                <div className="mb-8">
                  <h4 className="text-base font-semibold text-muted-foreground mb-4">Preguntas Frecuentes:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {faqs.map((faq, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start text-left h-auto p-4 text-base text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                        onClick={() => handleFaqClick(faq)}
                      >
                        {faq.question}
                      </Button>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={handleAdvisorChat}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-base"
                    >
                      <User className="h-5 w-5 mr-2" />
                      Hablar con un Asesor
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input - only enabled when advisor chat is active */}
            <div className="p-6 border-t bg-gray-50 rounded-b-lg">
              <div className="flex gap-3">
                <Input
                  placeholder={
                    advisorChatEnabled
                      ? "Escribe tu consulta aquí..."
                      : "Selecciona hablar con un asesor"
                  }
                  className="flex-1 h-12 text-base"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={!advisorChatEnabled}
                />
                <Button
                  size="icon"
                  className="bg-primary hover:bg-primary/90 h-12 w-12"
                  onClick={handleSendMessage}
                  disabled={!advisorChatEnabled || !inputMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {advisorChatEnabled
                  ? "Presiona Enter para enviar • Conectado con asesor"
                  : ""}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
