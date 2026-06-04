"use client"
import { useState, useEffect } from "react"
import api from "@/lib/api"

export default function SkillsPage() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [ordering, setOrdering] = useState("name")

  const categories = [
  { value: "technical", label: "Technical", icon: "</>" },
  { value: "creative", label: "Creative", icon: "🎨" },
  { value: "communication", label: "Communication", icon: "💬" },
  { value: "leadership", label: "Leadership", icon: "👥" },
  { value: "business", label: "Business", icon: "🏢" },
  { value: "personal_development", label: "Personal development", icon: "🌱" },
  { value: "other", label: "Other", icon: "..." },
]

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true)
      setError("")
      try {
        const params = { page, ordering }
        if (search) params.search = search
        if (category) params.category = category
        const { data } = await api.get("/skills/", { params })
        setSkills(data.results)
        setCount(data.count)
      } catch (err) {
        setError("Error al cargar las skills.")
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [page, search, category, ordering])

  const totalPages = Math.ceil(count / 10)

  const levelColor = (level) => {
    const colors = {
      beginner: "#22c55e",
      intermediate: "#3b82f6",
      advanced: "#f97316",
      expert: "#a855f7",
    }
    return colors[level] || "#6b7280"
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Skills</h1>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
        {categories.map((cat) => (
          <button
  key={cat.value}
  onClick={() => { setCategory(cat.value); setPage(1) }}
  style={{
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    background: category === cat.value ? "#eff6ff" : "#fff",
    color: category === cat.value ? "#3b82f6" : "#374151",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    minWidth: "80px",
  }}
>
  <span style={{ fontSize: "18px" }}>{cat.icon}</span>
  {cat.label}
</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar skills..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          style={{ flex: 1, padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
        />
        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
        >
          <option value="name">Nombre A-Z</option>
          <option value="-name">Nombre Z-A</option>
          <option value="created_at">Mas antiguas</option>
          <option value="-created_at">Mas recientes</option>
        </select>
      </div>

      {loading && <p style={{ color: "#6b7280" }}>Cargando skills...</p>}
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      {!loading && !error && skills.length === 0 && (
        <p style={{ color: "#6b7280" }}>No se encontraron skills.</p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
        {skills.map((skill) => (
          <div
            key={skill.id}
            onClick={() => window.location.href = "/dashboard/skills/" + skill.id}
            style={{
              border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px",
              background: "#fff", cursor: "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}
          >
            <p style={{ fontWeight: "bold", marginBottom: "4px" }}>{skill.name}</p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>{skill.category}</p>
            <span style={{
              fontSize: "12px", padding: "2px 10px", borderRadius: "12px",
              border: "1px solid " + levelColor(skill.level),
              color: levelColor(skill.level), fontWeight: "bold"
            }}>
              {skill.level}
            </span>
          </div>
        ))}
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
