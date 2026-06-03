"use client"

import { useEffect, useState, useCallback } from "react"
import api from "@/lib/api"
import { Pagination } from "@/components/ui/pagination"
import { Search } from "lucide-react"

const PAGE_SIZE = 3

function getInitials(firstName, lastName) {
  return [firstName, lastName]
    .filter(Boolean)
    .map((n) => n[0].toUpperCase())
    .join("")
    || "?"
}

export default function UsersPage() {
  const [data, setData] = useState({ count: 0, results: [] })
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1) }, 350)
    return () => clearTimeout(t)
  }, [searchInput])

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page, page_size: PAGE_SIZE }
      if (search) params.search = search
      const { data: resp } = await api.get("/users/", { params })
      setData({
        count: resp.count ?? 0,
        results: resp.results ?? (Array.isArray(resp) ? resp : []),
      })
    } catch {
      setData({ count: 0, results: [] })
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <main className="flex-1 p-6 space-y-4">
      <h1 className="text-xl font-semibold">Usuarios</h1>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <input
          className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50 placeholder:text-muted-foreground"
          placeholder="Buscar por nombre o email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Usuario</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                Fecha de ingreso
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                  Cargando...
                </td>
              </tr>
            ) : data.results.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                  No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              data.results.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">
                        {getInitials(user.first_name, user.last_name)}
                      </div>
                      <span className="font-medium">
                        {[user.first_name, user.last_name].filter(Boolean).join(" ") || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                    {user.date_joined
                      ? new Date(user.date_joined).toLocaleDateString("es-CO", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        count={data.count}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </main>
  )
}
