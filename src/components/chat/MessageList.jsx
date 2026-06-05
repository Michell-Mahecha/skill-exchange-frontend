/**
 * # Component: MessageList.jsx
 * 
 * Este componente es el contenedor que renderiza la lista completa de mensajes de la sala.
 * Se encarga de hacer scroll automático hacia el fondo cada vez que un nuevo mensaje
 * es enviado o recibido, mejorando la usabilidad general del chat en tiempo real.
 * 
 * ## Funcionalidades
 * - Auto-scroll al final del contenedor de mensajes.
 * - Renderizado condicional para estado vacío.
 */

import React, { useEffect, useRef } from "react"
import MessageBubble from "./MessageBubble"

export default function MessageList({ messages, currentUser }) {
  const bottomRef = useRef(null)

  // Ejecutamos el scroll al final del contenedor cada vez que cambia el número de mensajes.
  // Esto asegura que los usuarios siempre visualicen la última interacción sin scroll manual.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mostrar un estado de carga o vacío si aún no hay mensajes en la colección de Firestore.
  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-background">
        <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4 text-3xl">
          💬
        </div>
        <h3 className="font-semibold text-base mb-1">¡Comienza la conversación!</h3>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          Sé el primero en enviar un mensaje en el canal. 
          Prueba escribiendo <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs text-primary">@gemini Hola</code> para hablar con la IA.
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 flex flex-col bg-background min-h-0">
      {/* Mapeamos cada mensaje al componente MessageBubble */}
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          currentUser={currentUser}
        />
      ))}
      
      {/* Elemento de referencia invisible al que hacemos scroll */}
      <div ref={bottomRef} />
    </div>
  )
}
