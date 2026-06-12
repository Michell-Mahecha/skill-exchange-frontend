/**
 * # Page: chat/page.jsx
 *
 * Esta es la página principal de la Sala de la Comunidad en la ruta `/chat`.
 * Implementa el control de acceso para que solo usuarios con sesión de Firebase activa entren,
 * y establece una conexión en tiempo real con la colección `community_chat` de Firestore.
 *
 * ## Seguridad de Firestore (Security Rules)
 * Coloca la siguiente regla en la consola de Firebase Firestore:
 * ```javascript
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /community_chat/{messageId} {
 *       allow read, write: if request.auth != null;
 *     }
 *   }
 * }
 * ```
 */

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection, query, orderBy, limitToLast, onSnapshot } from "firebase/firestore"
import { auth } from "@/lib/firebase"
import { LoadingState } from "@/components/ui/LoadingState"
import MessageList from "@/components/chat/MessageList"
import MessageInput from "@/components/chat/MessageInput"

export default function ChatPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [loadingAuth, setLoadingAuth] = useState(true)

  // Instanciamos la base de datos de Firestore para su uso
  const db = getFirestore()

  // 1. Auth Gate: Validar el estado de autenticación en Firebase
  useEffect(() => {
    // onAuthStateChanged escucha cambios en la sesión de Firebase asíncronamente
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        setLoadingAuth(false)
      } else {
        // Si no hay sesión válida de Firebase, redirigir al login
        router.push("/login")
      }
    })
    return () => unsubscribe()
  }, [router])

  // 2. Escuchar la base de datos de Firestore en tiempo real
  useEffect(() => {
    if (!currentUser) return

    // Limitamos la consulta a los últimos 60 mensajes en orden ascendente (cronológico)
    const chatQuery = query(
      collection(db, "community_chat"),
      orderBy("createdAt", "asc"),
      limitToLast(60)
    )

    // onSnapshot establece un stream abierto con Firestore. Cada inserción gatilla este callback.
    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setMessages(fetchedMessages)
    })

    return () => unsubscribe()
  }, [currentUser, db])

  if (loadingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <LoadingState message="Verificando sesión..." />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Cabecera del chat (Estilo consistente con el Dashboard) */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-base font-semibold hover:text-primary transition-colors">
            Skill Exchange
          </Link>
          <span className="text-muted-foreground">/</span>
          <h1 className="text-sm font-semibold text-foreground">
            Sala de la Comunidad — Skill Exchange
          </h1>
        </div>

        {/* Enlace rápido al Dashboard */}
        <Link
          href="/dashboard"
          className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
        >
          Volver al Dashboard
        </Link>
      </header>

      {/* Lista de mensajes en tiempo real */}
      <MessageList messages={messages} currentUser={currentUser} />

      {/* Input para el envío de mensajes y lógica de bot */}
      <MessageInput db={db} currentUser={currentUser} />
    </div>
  )
}
