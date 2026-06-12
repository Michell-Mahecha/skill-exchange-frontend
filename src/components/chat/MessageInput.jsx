/**
 * # Component: MessageInput.jsx
 * 
 * Este componente proporciona el formulario de entrada de texto y el botón de enviar.
 * Además, implementa la lógica crítica para interactuar con la colección de Firestore
 * y activar al asistente Gemini cuando se detecta el prefijo `@gemini `.
 * 
 * ## Flujo de Trabajo
 * 1. El usuario escribe y envía un mensaje.
 * 2. Se almacena en la colección `community_chat` con `serverTimestamp()`.
 * 3. Si el texto inicia con `@gemini `, se llama al endpoint `/api/gemini` por HTTP POST.
 * 4. La respuesta devuelta por el backend se inserta en la misma colección con `isBot: true`.
 */

import React, { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MessageInput({ db, currentUser }) {
  const [text, setText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault()
    const trimmedText = text.trim()
    if (!trimmedText || !currentUser) return

    // Limpiamos el input inmediatamente para una interfaz reactiva.
    setText("")

    try {
      // 1. Guardar el mensaje del usuario en la colección community_chat de Firestore.
      const chatCollection = collection(db, "community_chat")
      await addDoc(chatCollection, {
        uid: currentUser.uid,
        displayName: currentUser.displayName || "Estudiante",
        photoURL: currentUser.photoURL || null,
        text: trimmedText,
        isBot: false,
        createdAt: serverTimestamp(),
      })

      // 2. Comprobar si el mensaje está dirigido a Gemini.
      if (trimmedText.startsWith("@gemini ")) {
        const promptForGemini = trimmedText.replace("@gemini ", "").trim()
        if (!promptForGemini) return

        setIsGenerating(true)

        // Llamar a nuestro endpoint API server-side.
        const response = await fetch("/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: promptForGemini }),
        })

        if (!response.ok) {
          throw new Error("Error en la respuesta del API de Gemini.")
        }

        const data = await response.json()

        // 3. Almacenar la respuesta del bot en la colección.
        await addDoc(chatCollection, {
          uid: "gemini-bot",
          displayName: "Asistente Skill Exchange",
          photoURL: null,
          text: data.text,
          isBot: true,
          createdAt: serverTimestamp(),
        })
      }
    } catch (error) {
      console.error("Error al enviar el mensaje o procesar Gemini:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <form onSubmit={handleSend} className="p-4 border-t border-border bg-card flex gap-2 items-center">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          isGenerating
            ? "Gemini está respondiendo..."
            : "Escribe un mensaje aquí... (menciona a @gemini para consultar a la IA)"
        }
        disabled={isGenerating}
        className="flex-1 min-w-0 h-10 px-3.5 py-2 rounded-lg border border-input bg-background text-sm transition-colors placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
      />
      <Button
        type="submit"
        size="icon"
        disabled={!text.trim() || isGenerating}
        className="h-10 w-10 shrink-0 cursor-pointer"
      >
        <Send className="size-4" />
      </Button>
    </form>
  )
}
