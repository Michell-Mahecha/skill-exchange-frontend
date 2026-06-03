"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * HamburgerMenu — navegación colapsable para pantallas pequeñas.
 * Props:
 *   links    — array de { href, label }
 *   onLogout — función para cerrar sesión
 */
export function HamburgerMenu({ links, onLogout }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const ref = useRef(null)

  // Cierra el menú al hacer clic fuera
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  // Cierra al cambiar de ruta
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <div className="relative md:hidden" ref={ref}>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Panel desplegable */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-lg border border-border bg-background shadow-lg overflow-hidden z-50">
          <nav className="flex flex-col p-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm transition-colors",
                  pathname === link.href
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-border p-1">
            <button
              onClick={() => { onLogout(); setOpen(false) }}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
