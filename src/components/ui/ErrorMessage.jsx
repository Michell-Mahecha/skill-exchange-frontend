/**
 * ErrorMessage — muestra un error cuando la petición al API falla.
 * Uso: <ErrorMessage /> o <ErrorMessage message="..." onRetry={fn} />
 */
export function ErrorMessage({
  message = "Ocurrió un error al cargar los datos.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <span className="text-3xl">⚠️</span>
      <p className="text-sm text-muted-foreground max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-medium underline underline-offset-4 text-foreground hover:text-muted-foreground transition-colors"
        >
          Intentar de nuevo
        </button>
      )}
    </div>
  )
}
