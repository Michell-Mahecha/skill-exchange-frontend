import { initializeApp, getApps } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

// Configuración de Firebase obtenida de variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Inicializar Firebase solo si no ha sido inicializado previamente
// Esto evita errores de reinicialización en Next.js (Fast Refresh / SSR)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)

// Configuración del proveedor de Google
const googleProvider = new GoogleAuthProvider()

// Forzar la selección de cuenta (muy útil en el aula para probar con diferentes correos)
googleProvider.setCustomParameters({
  prompt: "select_account",
})

export { auth, googleProvider, signInWithPopup }
