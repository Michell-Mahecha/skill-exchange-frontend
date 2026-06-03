"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import api from "@/lib/api"
import { LoadingState } from "@/components/ui/LoadingState"
import { ErrorMessage } from "@/components/ui/ErrorMessage"
import { SkillCard } from "@/components/skills/SkillCard"
import { ArrowLeft } from "lucide-react"

// Mapeo de niveles y categorías a etiquetas legibles
const LEVEL_LABELS = {
  beginner:     "Beginner",
  intermediate: "Intermediate",
  advanced:     "Advanced",
  expert:       "Expert",
}

const CATEGORY_LABELS = {
  technical:            "Technical",
  creative:             "Creative",
  communication:        "Communication",
  leadership:           "Leadership",
  business:             "Business",
  personal_development: "Personal development",
  other:                "Other",
}

// Colores del badge de nivel (mismos que en SkillCard)
const LEVEL_STYLES = {
  beginner:     "bg-green-50 text-green-700 border-green-200",
  intermediate: "bg-blue-50 text-blue-700 border-blue-200",
  advanced:     "bg-orange-50 text-orange-700 border-orange-200",
  expert:       "bg-purple-50 text-purple-700 border-purple-200",
}

export default function SkillDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [skill, setSkill] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(false)
    api
      .get(`/skills/${id}/`)
      .then(({ data }) => setSkill(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <main className="flex-1 p-6"><LoadingState /></main>
  if (error)   return (
    <main className="flex-1 p-6">
      <ErrorMessage
        message="No se pudo cargar la skill. Puede que no exista o no tengas permiso."
        onRetry={() => router.back()}
      />
    </main>
  )

  return (
    <main className="flex-1 p-6 max-w-3xl space-y-6">
      {/* Volver */}
      <Link
        href="/dashboard/skills"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Volver a Skills
      </Link>

      {/* Cabecera de la skill */}
      <div className="rounded-lg border border-border p-6 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{skill.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {CATEGORY_LABELS[skill.category] ?? skill.category}
            </p>
          </div>

          {/* Badge de nivel */}
          {skill.level && (
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full border ${
                LEVEL_STYLES[skill.level] ?? "bg-muted text-muted-foreground border-border"
              }`}
            >
              {LEVEL_LABELS[skill.level] ?? skill.level}
            </span>
          )}
        </div>

        {/* Descripción */}
        {skill.description ? (
          <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">Sin descripción disponible.</p>
        )}

        {/* Metadatos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-border">
          <MetaItem label="ID" value={`#${skill.id}`} />
          <MetaItem label="Categoría" value={CATEGORY_LABELS[skill.category] ?? skill.category} />
          <MetaItem label="Nivel" value={LEVEL_LABELS[skill.level] ?? skill.level ?? "—"} />
          {skill.created_at && (
            <MetaItem
              label="Creada"
              value={new Date(skill.created_at).toLocaleDateString("es-CO", {
                year: "numeric", month: "long", day: "numeric",
              })}
            />
          )}
          {skill.updated_at && (
            <MetaItem
              label="Actualizada"
              value={new Date(skill.updated_at).toLocaleDateString("es-CO", {
                year: "numeric", month: "long", day: "numeric",
              })}
            />
          )}
        </div>
      </div>

      {/* Skill padre */}
      {skill.parent && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Skill padre
          </h2>
          <SkillCard
            skill={skill.parent}
            onClick={() => router.push(`/dashboard/skills/${skill.parent.id}`)}
          />
        </section>
      )}

      {/* Sub-skills */}
      {skill.subskills?.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Sub-skills ({skill.subskills.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skill.subskills.map((sub) => (
              <SkillCard
                key={sub.id}
                skill={sub}
                onClick={() => router.push(`/dashboard/skills/${sub.id}`)}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

// Componente auxiliar para filas de metadatos
function MetaItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium mt-0.5">{value}</p>
    </div>
  )
}
