import { cn } from "@/lib/utils"
import {
  Code2,
  Palette,
  MessageSquare,
  Users,
  Briefcase,
  Sprout,
  MoreHorizontal,
} from "lucide-react"

// Definición central de categorías: valor API → ícono + etiqueta
export const CATEGORIES = [
  { value: "technical",            label: "Technical",           icon: Code2 },
  { value: "creative",             label: "Creative",            icon: Palette },
  { value: "communication",        label: "Communication",       icon: MessageSquare },
  { value: "leadership",           label: "Leadership",          icon: Users },
  { value: "business",             label: "Business",            icon: Briefcase },
  { value: "personal_development", label: "Personal development", icon: Sprout },
  { value: "other",                label: "Other",               icon: MoreHorizontal },
]

/**
 * CategoryFilter — botones para filtrar skills por categoría.
 * Props:
 *   selected     — valor de la categoría activa (null = todas)
 *   onChange(v)  — llamado con el nuevo valor, o null para limpiar
 */
export function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex gap-3 flex-wrap" role="group" aria-label="Filtrar por categoría">
      {CATEGORIES.map(({ value, label, icon: Icon }) => {
        const active = selected === value
        return (
          <button
            key={value}
            onClick={() => onChange(active ? null : value)}
            aria-pressed={active}
            className={cn(
              "flex flex-col items-center gap-1.5 px-5 py-3 rounded-lg border text-sm font-medium transition-colors min-w-[88px]",
              active
                ? "bg-[#2563eb] border-[#2563eb] text-white"
                : "bg-background border-border text-muted-foreground hover:bg-muted"
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
