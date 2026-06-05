"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/dashboard/skills", label: "Skills" },
  { href: "/dashboard/users", label: "Usuarios" },
  { href: "/dashboard/goals", label: "Metas" },
];

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.replace("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-base font-semibold">Skill Exchange</span>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm transition-colors",
                  pathname === link.href
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="hidden md:inline-flex"
          >
            Cerrar sesión
          </Button>

          {/* Botón hamburguesa */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ marginLeft: "8px" }}
          >
            {menuOpen ? (
              <span style={{ fontSize: "20px", color: "#374151" }}>✕</span>
            ) : (
              <>
                <span
                  style={{
                    display: "block",
                    width: "22px",
                    height: "2px",
                    background: "#374151",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: "22px",
                    height: "2px",
                    background: "#374151",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: "22px",
                    height: "2px",
                    background: "#374151",
                  }}
                />
              </>
            )}
          </button>
        </div>
      </header>

      {/* Menú mobile */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "260px",
            height: "100vh",
            background: "#fff",
            borderLeft: "1px solid #e2e8f0",
            boxShadow: "-4px 0 16px rgba(0,0,0,0.08)",
            zIndex: 100,
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Skill Exchange</span>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "10px 12px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                background: pathname === link.href ? "#eff6ff" : "transparent",
                color: pathname === link.href ? "#3b82f6" : "#374151",
                fontWeight: pathname === link.href ? "bold" : "normal",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div
            style={{
              marginTop: "8px",
              borderTop: "1px solid #e2e8f0",
              paddingTop: "12px",
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                background: "none",
                border: "none",
                textAlign: "left",
                fontSize: "14px",
                color: "#ef4444",
                cursor: "pointer",
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
