import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Reusable pagination component for DRF-style paginated responses.
 *
 * Props:
 *   count     – total number of items (from API response)
 *   page      – current page number (1-indexed)
 *   pageSize  – items per page (default 10)
 *   onPageChange(newPage) – called when the user selects a different page
 */
export function Pagination({ count = 0, page = 1, pageSize = 10, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(count / pageSize))

  if (totalPages <= 1) return null

  const goTo = (p) => {
    if (p >= 1 && p <= totalPages && p !== page) onPageChange(p)
  }

  const pages = buildPageRange(page, totalPages)

  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">
        {rangeLabel(page, pageSize, count)}
      </span>

      <nav className="flex items-center gap-1" aria-label="Paginación">
        <PageButton
          onClick={() => goTo(page - 1)}
          disabled={page === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft className="size-4" />
        </PageButton>

        {pages.map((item, i) =>
          item === "…" ? (
            <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground select-none">
              …
            </span>
          ) : (
            <PageButton
              key={item}
              onClick={() => goTo(item)}
              active={item === page}
              aria-label={`Página ${item}`}
              aria-current={item === page ? "page" : undefined}
            >
              {item}
            </PageButton>
          )
        )}

        <PageButton
          onClick={() => goTo(page + 1)}
          disabled={page === totalPages}
          aria-label="Página siguiente"
        >
          <ChevronRight className="size-4" />
        </PageButton>
      </nav>
    </div>
  )
}

function PageButton({ children, onClick, disabled, active, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "min-w-[32px] h-8 px-2 rounded-md border text-sm transition-colors",
        active
          ? "border-foreground bg-foreground text-background font-medium"
          : "border-border bg-background text-foreground hover:bg-muted",
        disabled && "pointer-events-none opacity-40"
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function rangeLabel(page, pageSize, count) {
  const from = Math.min((page - 1) * pageSize + 1, count)
  const to = Math.min(page * pageSize, count)
  return `${from}–${to} de ${count}`
}

// Returns an array of page numbers and "…" placeholders.
function buildPageRange(current, total) {
  if (total <= 7) return range(1, total)

  if (current <= 4) return [...range(1, 5), "…", total]
  if (current >= total - 3) return [1, "…", ...range(total - 4, total)]

  return [1, "…", ...range(current - 1, current + 1), "…", total]
}

function range(from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i)
}
