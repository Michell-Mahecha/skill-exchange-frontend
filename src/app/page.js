import Link from "next/link"

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "sans-serif" }}>
      {/* Navbar */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>Skill Exchange</span>
        <Link href="/login" style={{
          padding: "8px 18px", background: "#1e293b", color: "#fff",
          borderRadius: "8px", textDecoration: "none", fontSize: "14px"
        }}>
          Iniciar sesión
        </Link>
      </header>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "80px 24px 60px", background: "#fff" }}>
        <span style={{ fontSize: "13px", color: "#3b82f6", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "4px 12px", marginBottom: "24px", display: "inline-block" }}>
          • Plataforma académica · Open API
        </span>
        <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#0f172a", marginBottom: "16px", lineHeight: 1.2 }}>
          Descubre y comparte<br />habilidades
        </h1>
        <p style={{ color: "#6b7280", maxWidth: "440px", margin: "0 auto 32px", lineHeight: 1.6 }}>
          Skills Exchange es la plataforma donde el conocimiento se convierte en conexión. Explora cientos de habilidades, filtra por categoría y encuentra lo que necesitas.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link href="/login" style={{
            padding: "12px 24px", background: "#1e293b", color: "#fff",
            borderRadius: "8px", textDecoration: "none", fontWeight: "bold"
          }}>
            Empezar ahora →
          </Link>
          <Link href="/dashboard/skills" style={{
            padding: "12px 24px", background: "#fff", color: "#1e293b",
            borderRadius: "8px", textDecoration: "none", border: "1px solid #e2e8f0", fontWeight: "bold"
          }}>
            Ver skills
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "60px 24px", background: "#f8fafc", textAlign: "center" }}>
        <p style={{ fontWeight: "600", fontSize: "18px", marginBottom: "32px", color: "#0f172a" }}>
          Todo lo que necesitas en un solo lugar
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          {[
            { icon: "🗃️", title: "Categorias organizadas", desc: "Técnicas, creativas, de comunicación..." },
            { icon: "📖", title: "Detalle de cada skill", desc: "Nivel, descripción, habilidades..." },
            { icon: "👥", title: "Comunidad activa", desc: "Explora los perfiles de otros usuarios" },
          ].map((f) => (
            <div key={f.title} style={{
              background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px",
              padding: "24px", width: "200px", textAlign: "left"
            }}>
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>{f.icon}</div>
              <p style={{ fontWeight: "600", marginBottom: "8px", fontSize: "14px" }}>{f.title}</p>
              <p style={{ color: "#6b7280", fontSize: "13px" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}