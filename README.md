# Skill Exchange Frontend

Aplicación web construida con Next.js que consume la API REST de Skills Exchange.

## Tecnologías

- Next.js 16
- React
- Tailwind CSS
- Axios

## Requisitos

- Node.js 18+
- npm

## Instalación y ejecución

git clone https://github.com/Michell-Mahecha/skill-exchange-frontend.git
cd skill-exchange-frontend
npm install
echo "NEXT_PUBLIC_API_BASE_URL=https://apiskills.danidev.co/api" > .env.local
npm run dev

Abre http://localhost:3000 en el navegador.

## Páginas implementadas

- `/` — Landing page de presentación
- `/login` — Autenticación JWT
- `/dashboard` — Bienvenida con datos del usuario
- `/dashboard/skills` — Listado de skills con filtros, búsqueda, ordenamiento y paginación
- `/dashboard/skills/[id]` — Detalle de una skill
- `/dashboard/users` — Listado de usuarios con paginación
- `/dashboard/goals` — Metas de aprendizaje con barra de progreso y botón para alcanzar meta

## Organización de componentes

Las páginas están organizadas en grupos de rutas: `(auth)` para login y `(dashboard)` para las páginas protegidas.

La autenticación se maneja con tokens JWT en localStorage. El archivo `src/lib/api.js` centraliza todas las peticiones al API usando Axios con un interceptor que agrega el token automáticamente.

## Decisiones de arquitectura

- **API centralizada:** todas las llamadas al backend pasan por `lib/api.js` para evitar duplicación.
- **Protección de rutas:** el layout del dashboard verifica el token JWT y redirige al login si no existe.
- **Paginación:** implementada en cada página con conteo total y navegación por páginas.
- **Estados de UI:** cada página maneja estados de carga, error y lista vacía.