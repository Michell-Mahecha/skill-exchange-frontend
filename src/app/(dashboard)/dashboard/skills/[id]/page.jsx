"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import api from "@/lib/api"

export default function SkillDetailPage() {
  const { id } = useParams()
  const [skill, setSkill] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    api.get("/skills/" + id + "/")
      .then(({ data }) => setSkill(data))
      .catch(() => setError("No se pudo cargar la skill."))
      .finally(() => setLoading(false))
  }, [id])

  const levelColor = (level) => {
    const colors = {
      beginner: "#22c55e",
      intermediate: "#3b82f6",
      advanced: "#f97316",
      expert: "#a855f7",
    }
    return colors[level] || "#6b7280"
  }

  if (loading) return <p style={{ padding: "24px", color: "#6b7280" }}>Cargando...</p>
  if (error) return <p style={{ padding: "24px", color: "#ef4444" }}>{error}</p>
  if (!skill) return null

  return (
    <div style={{ padding: "24px" }}>
      <button
        onClick={() => window.history.back()}
        style={{ marginBottom: "16px", background: "none", border: "none", cursor: "pointer", color: "#3b82f6" }}
      >
        ← Volver a Skills
      </button>

      <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "24px", maxWidth: "500px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>{skill.name}</h1>
          <span style={{
            fontSize: "12px", padding: "2px 10px", borderRadius: "12px",
            border: "1px solid " + levelColor(skill.level),
            color: levelColor(skill.level), fontWeight: "bold"
          }}>
            {skill.level}
          </span>
        </div>

        <p style={{ color: "#3b82f6", marginBottom: "12px" }}>{skill.category}</p>
        {skill.description && (
          <p style={{ color: "#6b7280", marginBottom: "16px" }}>{skill.description}</p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "14px" }}>
          <div>
            <p style={{ color: "#9ca3af" }}>ID</p>
            <p style={{ fontWeight: "bold" }}>#{skill.id}</p>
          </div>
          <div>
            <p style={{ color: "#9ca3af" }}>Categoría</p>
            <p style={{ fontWeight: "bold" }}>{skill.category}</p>
          </div>
          <div>
            <p style={{ color: "#9ca3af" }}>Nivel</p>
            <p style={{ fontWeight: "bold" }}>{skill.level}</p>
          </div>
          <div>
            <p style={{ color: "#9ca3af" }}>Creada</p>
            <p style={{ fontWeight: "bold" }}>{new Date(skill.created_at).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>
      </div>
    </div>
  )
}