/**
 * # Component: MessageBubble.jsx
 * 
 * Este componente se encarga de renderizar una sola burbuja de mensaje dentro del chat.
 * Adapta el diseño visual basándose en si el mensaje fue enviado por el usuario actual,
 * por otro miembro de la comunidad, o por el asistente automático Gemini.
 * 
 * ## Diseño
 * - Usuario Actual: Alineado a la derecha, con fondo del color primario.
 * - Otro Usuario: Alineado a la izquierda, muestra foto y nombre, fondo gris claro/oscuro (según el tema).
 * - Asistente Gemini: Alineado a la izquierda con fondo distintivo y nombre de "Asistente Skill Exchange".
 */

import React from "react"
import { cn } from "@/lib/utils"

export default function MessageBubble({ message, currentUser }) {
  const { uid, displayName, photoURL, text, isBot, createdAt } = message

  // Determinar si el mensaje fue enviado por el usuario que tiene sesión iniciada.
  const isMe = uid === currentUser?.uid

  // Formatear la marca de tiempo de Firestore.
  // Cuando se usa serverTimestamp(), Firestore la guarda en el servidor. Localmente puede
  // venir como null por unos milisegundos hasta recibir la confirmación; manejamos ese fallback.
  const formatTime = (timestamp) => {
    if (!timestamp) return ""
    // Si viene de Firestore tiene el método toDate()
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Si el mensaje es de un bot
  if (isBot) {
    return (
      <div className="flex items-start gap-3 max-w-[85%] sm:max-w-[70%] animate-fade-in">
        <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs">
          🤖
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-primary">Asistente Skill Exchange</span>
          <div className="rounded-2xl rounded-tl-none bg-primary/10 border border-primary/20 px-4 py-2.5 text-sm text-foreground shadow-sm">
            <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
            <span className="block text-[10px] text-right text-muted-foreground mt-1">
              {formatTime(createdAt)}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 max-w-[85%] sm:max-w-[70%] animate-fade-in",
        isMe ? "self-end flex-row-reverse" : "self-start"
      )}
    >
      {/* Avatar del usuario (sólo si no soy yo, para limpiar la interfaz del emisor) */}
      {!isMe && (
        <div className="size-8 shrink-0 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          {photoURL ? (
            <img src={photoURL} alt={displayName} className="size-full object-cover" />
          ) : (
            <span className="text-xs font-medium text-muted-foreground">
              {displayName?.charAt(0).toUpperCase() || "?"}
            </span>
          )}
        </div>
      )}

      <div className={cn("flex flex-col gap-1", isMe ? "items-end" : "items-start")}>
        {!isMe && (
          <span className="text-xs font-medium text-muted-foreground px-1">
            {displayName || "Usuario"}
          </span>
        )}
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm shadow-xs",
            isMe
              ? "rounded-tr-none bg-primary text-primary-foreground"
              : "rounded-tl-none bg-muted text-foreground border border-border"
          )}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
          <span
            className={cn(
              "block text-[10px] text-right mt-1",
              isMe ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {formatTime(createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}
