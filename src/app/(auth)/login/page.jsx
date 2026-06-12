"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField, FormLabel, FormMessage } from "@/components/ui/form"
import api from "@/lib/api"
import { auth, googleProvider, signInWithPopup } from "@/lib/firebase"

export default function LoginPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState("")
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async ({ email, password }) => {
    setServerError("")
    try {
      const { data } = await api.post("/token/", { email, password })
      localStorage.setItem("access_token", data.access)
      localStorage.setItem("refresh_token", data.refresh)
      router.push("/dashboard")
    } catch (err) {
      const detail = err.response?.data?.detail
      setServerError(detail || "Credenciales incorrectas. Inténtalo de nuevo.")
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    setServerError("")
    try {
      // 1. Autenticar con Google en Firebase (Pop-up)
      const result = await signInWithPopup(auth, googleProvider)
      const firebaseUser = result.user

      // 2. Obtener el ID Token (JWT) firmado por Firebase
      const idToken = await firebaseUser.getIdToken()

      // 3. Intercambiar el ID Token por tokens de Django (SimpleJWT)
      const { data } = await api.post("/token/google/", { token: idToken })

      console.log("Esto recibo de google", data)
      // 4. Guardar los tokens en localStorage
      localStorage.setItem("access_token", data.access)
      localStorage.setItem("refresh_token", data.refresh)

      // 5. Redirigir al dashboard
      router.push("/dashboard")
    } catch (err) {
      console.error("Error en Google Login:", err)
      const detail = err.response?.data?.detail || err.message
      setServerError(detail || "Error al iniciar sesión con Google.")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
          <p className="text-sm text-muted-foreground">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* Botón de Google Autenticación */}
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 cursor-pointer"
            onClick={handleGoogleLogin}
            disabled={isSubmitting || isGoogleLoading}
          >
            {isGoogleLoading ? (
              "Conectando..."
            ) : (
              <>
                <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.44 0-6.228-2.77-6.228-6.2 0-3.428 2.788-6.2 6.228-6.2 1.54 0 2.94.557 4.037 1.493l3.254-3.238C19.23 2.175 15.958 1 12.24 1 5.92 1 1 5.9 1 12.2S5.92 23.4 12.24 23.4c5.96 0 10.99-4.22 10.99-11.2 0-.69-.07-1.354-.2-1.915H12.24z"
                  />
                </svg>
                Continuar con Google
              </>
            )}
          </Button>

          {/* Separador visual */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-muted"></div>
            <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase">O continuar con</span>
            <div className="flex-grow border-t border-muted"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Ingresa un email válido",
                },
              })}
            />
            <FormMessage>{errors.email?.message}</FormMessage>
          </FormField>

          <FormField>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
            />
            <FormMessage>{errors.password?.message}</FormMessage>
          </FormField>

          {serverError && (
            <p className="text-sm font-medium text-destructive">{serverError}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting || isGoogleLoading}>
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          ⚠️ Nota: Los tokens se guardan en localStorage solo para fines educativos.
          En producción usar httpOnly cookies.
        </p>
      </div>
    </div>
  )
}
