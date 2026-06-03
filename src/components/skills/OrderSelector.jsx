"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Opciones de ordenamiento disponibles en el API
export const ORDER_OPTIONS = [
  { value: "name",        label: "Nombre A–Z" },
  { value: "-name",       label: "Nombre Z–A" },
  { value: "created_at",  label: "Más antiguos" },
  { value: "-created_at", label: "Más recientes" },
]

/**
 * OrderSelector — dropdown para elegir el campo de ordenamiento.
 * Props:
 *   value       — valor actual del ordering (ej. "name")
 *   onChange(v) — llamado con el nuevo valor
 */
export function OrderSelector({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Cierra el dropdown al hacer clic fuera
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  const current = ORDER_OPTIONS.find((o) => o.value === value) ?? ORDER_OPTIONS[0]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground hover:bg-muted whitespace-nowrap transition-colors"
      >
        {current.label}
        <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Ordenar por"
          className="absolute right-0 top-full mt-1 z-10 w-40 rounded-lg border border-border bg-background shadow-md overflow-hidden"
        >
          {ORDER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={cn(
                "w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors",
                opt.value === value && "font-medium"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
