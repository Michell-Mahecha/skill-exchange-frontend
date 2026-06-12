"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  BookOpen,
  Users,
  Layers,
  ArrowRight,
  Code2,
  Palette,
  MessageSquare,
} from "lucide-react"

// Si el usuario ya tiene sesión, lo llevamos directo al dashboard
export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("access_token")) {
      router.replace("/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Navbar pública ── */}
      <header className="border-b px-6 py-3 flex items-center justify-between">
        <span className="font-semibold text-base">Skill Exchange</span>
        <Link
          href="/login"
          className="text-sm font-medium px-4 py-1.5 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors"
        >
          Iniciar sesión
        </Link>
      </header>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-border bg-muted text-muted-foreground mb-6">
          <span className="size-1.5 rounded-full bg-[#2563eb]" />
          Plataforma académica · Open API
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl leading-tight mb-4">
          Descubre y comparte{" "}
          <span className="relative">
            habilidades
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#2563eb] rounded-full" />
          </span>
        </h1>

        <p className="text-muted-foreground text-lg max-w-lg mb-8">
          Skills Exchange es la plataforma donde el conocimiento se convierte en conexión.
          Explora cientos de habilidades, filtra por categoría y encuentra lo que necesitas.
        </p>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Empezar ahora
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            Ver skills
          </Link>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="border-t px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-10">
            Todo lo que necesitas en un solo lugar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Layers className="size-5" />}
              title="Categorías organizadas"
              desc="Técnicas, creativas, de comunicación, liderazgo y más. Filtra por lo que te interesa."
            />
            <FeatureCard
              icon={<BookOpen className="size-5" />}
              title="Detalle de cada skill"
              desc="Nivel, descripción, habilidades relacionadas. Toda la información que necesitas."
            />
            <FeatureCard
              icon={<Users className="size-5" />}
              title="Comunidad activa"
              desc="Explora los perfiles de otros usuarios y descubre qué habilidades comparten."
            />
          </div>
        </div>
      </section>

      {/* ── Categories preview ── */}
      <section className="border-t bg-muted/30 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-8">Explora por categoría</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { icon: <Code2 className="size-4" />, label: "Technical" },
              { icon: <Palette className="size-4" />, label: "Creative" },
              { icon: <MessageSquare className="size-4" />, label: "Communication" },
              { icon: <Users className="size-4" />, label: "Leadership" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm text-muted-foreground"
              >
                {icon}
                {label}
              </div>
            ))}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground">
              + más categorías
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            <Link href="/login" className="underline underline-offset-4 hover:text-foreground transition-colors">
              Inicia sesión
            </Link>{" "}
            para explorar el catálogo completo.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t px-6 py-5 flex items-center justify-between text-xs text-muted-foreground">
        <span>© 2025 Skill Exchange</span>
        <a
          href="https://apiskills.danidev.co/api/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          API Docs →
        </a>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-lg border border-border p-5 bg-background space-y-2">
      <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-foreground">
        {icon}
      </div>
      <h3 className="font-medium text-sm">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}
