/**
 * EmptyState — mensaje amigable cuando la lista de resultados está vacía.
 * Uso: <EmptyState /> o <EmptyState title="..." message="..." />
 */
export function EmptyState({
  icon = "🔍",
  title = "Sin resultados",
  message = "No se encontraron elementos con los filtros actuales.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
      <span className="text-4xl">{icon}</span>
      <p className="font-medium text-sm mt-1">{title}</p>
      <p className="text-sm text-muted-foreground max-w-xs">{message}</p>
    </div>
  )
}
