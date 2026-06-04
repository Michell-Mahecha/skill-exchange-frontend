"use client"
import { useState, useEffect } from "react"
import api from "@/lib/api"

export default function GoalsPage() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const fetchGoals = async () => {
    setLoading(true)
    setError("")
    try {
      const { data } = await api.get("/goals/", { params: { page } })
      setGoals(data.results)
      setCount(data.count)
    } catch (err) {
      setError("Error al cargar las metas.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGoals()
  }, [page])

  const handleAchieve = async (id) => {
    try {
      await api.post("/goals/" + id + "/achieve/")
      fetchGoals()
    } catch (err) {
      alert("Error al marcar la meta como alcanzada.")
    }
  }

  const totalPages = Math.ceil(count / 10)

  const progressColor = (progress) => {
    if (progress >= 100) return "#22c55e"
    if (progress >= 50) return "#3b82f6"
    return "#f97316"
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Metas de Aprendizaje</h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>Establece objetivos de estudio, mide tu progreso y alcanza tus metas.</p>

      {loading && <p style={{ color: "#6b7280" }}>Cargando metas...</p>}
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      {!loading && !error && goals.length === 0 && (
        <p style={{ color: "#6b7280" }}>No tienes metas de aprendizaje.</p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {goals.map((goal) => {
          const current = parseFloat(goal.current_value) || 0
          const target = parseFloat(goal.target_value) || 1
          const percent = Math.min(100, Math.round((current / target) * 100))
          const achieved = percent >= 100

          return (
            <div key={goal.id} style={{
              border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px",
              background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <p style={{ fontWeight: "bold", fontSize: "15px" }}>{goal.title}</p>
                {achieved && (
                  <span style={{ fontSize: "11px", color: "#22c55e", border: "1px solid #22c55e", borderRadius: "12px", padding: "2px 8px" }}>
                    Alcanzada
                  </span>
                )}
              </div>

              {goal.skill_name && (
                <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                  Skill vinculada: {goal.skill_name}
                </p>
              )}

              <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>Progreso</p>
              <div style={{ background: "#f1f5f9", borderRadius: "4px", height: "6px", marginBottom: "4px" }}>
                <div style={{
                  width: percent + "%", height: "100%",
                  background: progressColor(percent), borderRadius: "4px",
                  transition: "width 0.3s"
                }} />
              </div>
              <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "12px" }}>
                {current} / {target} ({percent}%)
              </p>

              {goal.deadline && (
                <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "12px" }}>
                  Limite: {new Date(goal.deadline).toLocaleDateString("es-CO", { day: "numeric", month: "short" })}
                </p>
              )}

              {!achieved && (
                <button
                  onClick={() => handleAchieve(goal.id)}
                  style={{
                    width: "100%", padding: "8px", borderRadius: "6px",
                    background: "#3b82f6", color: "#fff", border: "none",
                    cursor: "pointer", fontSize: "13px", fontWeight: "bold"
                  }}
                >
                  Alcanzar meta
                </button>
              )}
            </div>
          )
        })}
      </div>

      {totalPages > 1 && (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px" }}>
    <span style={{ fontSize: "13px", color: "#6b7280" }}>
      {(page - 1) * 10 + 1}–{Math.min(page * 10, count)} de {count}
    </span>
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
        style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #e2e8f0", cursor: "pointer", background: "#fff" }}
      >
        ‹
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => setPage(p)}
          style={{
            padding: "6px 12px", borderRadius: "6px", border: "1px solid #e2e8f0",
            background: page === p ? "#1e293b" : "#fff",
            color: page === p ? "#fff" : "#374151", cursor: "pointer"
          }}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #e2e8f0", cursor: "pointer", background: "#fff" }}
      >
        ›
      </button>
    </div>
  </div>
)}
    </div>
  )
}