"use client"
import { useState, useEffect } from "react"
import api from "@/lib/api"

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError("")
      try {
        const params = { page }
        if (search) params.search = search
        const { data } = await api.get("/users/", { params })
        setUsers(data.results)
        setCount(data.count)
      } catch (err) {
        setError("Error al cargar los usuarios.")
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [page, search])

  const totalPages = Math.ceil(count / 10)

  const getInitials = (user) => {
    const first = user.first_name?.[0] || ""
    const last = user.last_name?.[0] || ""
    return (first + last).toUpperCase() || user.email?.[0].toUpperCase()
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Usuarios</h1>

      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1) }}
        style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "6px", marginBottom: "20px", width: "300px" }}
      />

      {loading && <p style={{ color: "#6b7280" }}>Cargando usuarios...</p>}
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      {!loading && !error && users.length === 0 && (
        <p style={{ color: "#6b7280" }}>No se encontraron usuarios.</p>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
            <th style={{ padding: "8px 12px", color: "#6b7280" }}>Usuario</th>
            <th style={{ padding: "8px 12px", color: "#6b7280" }}>Email</th>
            <th style={{ padding: "8px 12px", color: "#6b7280" }}>Fecha de ingreso</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "#3b82f6", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: "bold", flexShrink: 0
                }}>
                  {getInitials(user)}
                </div>
                {[user.first_name, user.last_name].filter(Boolean).join(" ") || "Sin nombre"}
              </td>
              <td style={{ padding: "10px 12px", color: "#6b7280" }}>{user.email}</td>
              <td style={{ padding: "10px 12px", color: "#6b7280" }}>
                {new Date(user.date_joined).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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