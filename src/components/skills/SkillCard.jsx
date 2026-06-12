import { cn } from "@/lib/utils"

// Mapeo de categorías a etiquetas legibles
const CATEGORY_LABELS = {
  technical:            "Technical",
  creative:             "Creative",
  communication:        "Communication",
  leadership:           "Leadership",
  business:             "Business",
  personal_development: "Personal development",
  other:                "Other",
}

// Color de badge por nivel
const LEVEL_STYLES = {
  beginner:     "bg-green-50 text-green-700 border-green-200",
  intermediate: "bg-blue-50 text-blue-700 border-blue-200",
  advanced:     "bg-orange-50 text-orange-700 border-orange-200",
  expert:       "bg-purple-50 text-purple-700 border-purple-200",
}

const LEVEL_LABELS = {
  beginner:     "Beginner",
  intermediate: "Intermediate",
  advanced:     "Advanced",
  expert:       "Expert",
}

/**
 * SkillCard — tarjeta que representa una habilidad.
 * Props:
 *   skill    — objeto con { id, name, category, level }
 *   onClick  — callback cuando el usuario hace clic (para navegar al detalle)
 */
export function SkillCard({ skill, onClick }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={cn(
        "rounded-lg border border-border p-4 bg-background space-y-2 transition-all",
        onClick && "cursor-pointer hover:shadow-md hover:border-foreground/20 active:scale-[0.99]"
      )}
    >
      {/* Nombre de la skill */}
      <p className="font-medium text-sm leading-tight">{skill.name}</p>

      <div className="flex items-center justify-between gap-2">
        {/* Categoría */}
        <span className="text-xs text-muted-foreground">
          {CATEGORY_LABELS[skill.category] ?? skill.category}
        </span>

        {/* Badge de nivel */}
        {skill.level && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full border",
              LEVEL_STYLES[skill.level] ?? "bg-muted text-muted-foreground border-border"
            )}
          >
            {LEVEL_LABELS[skill.level] ?? skill.level}
          </span>
        )}
      </div>
    </div>
  )
}
