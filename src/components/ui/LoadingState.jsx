/**
 * LoadingState — indicador visual mientras se esperan datos del API.
 * Uso: <LoadingState /> o <LoadingState message="Cargando usuarios..." />
 */
export function LoadingState({ message = "Cargando..." }) {
  return (
    <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
      {/* Spinner animado con CSS de Tailwind */}
      <div className="size-4 rounded-full border-2 border-border border-t-foreground animate-spin" />
      <span className="text-sm">{message}</span>
    </div>
  )
}
