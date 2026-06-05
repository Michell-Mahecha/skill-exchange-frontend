# Configuración de Google Gemini API Key

Este documento explica cómo obtener y configurar la API Key de Google Gemini para habilitar el asistente de inteligencia artificial en la plataforma **Skill Exchange**.

## Pasos para obtener la API Key

1. **Accede a Google AI Studio**:
   - Dirígete a [Google AI Studio](https://aistudio.google.com/).
   - Inicia sesión con una cuenta de Google (puede ser tu cuenta institucional o personal).

2. **Crear una Clave de API (API Key)**:
   - En el panel lateral izquierdo, haz clic en el botón **"Get API key"**.
   - Haz clic en **"Create API key"**.
   - Selecciona si deseas asociar la clave a un proyecto de Google Cloud existente o crear una clave en un proyecto nuevo de forma rápida.
   - Copia la API Key generada. **No la compartas ni la subas a repositorios públicos**.

---

## Configuración en el Proyecto

La clave de API debe configurarse como una variable de entorno en el servidor para evitar que sea expuesta al cliente (frontend).

1. Abre o crea el archivo `.env.local` en la raíz del proyecto `skill-exchange-frontend`.
2. Agrega la siguiente línea al final del archivo, reemplazando `TU_API_KEY_AQUI` con la clave que copiaste:

```env
GEMINI_API_KEY=TU_API_KEY_AQUI
```

3. Guarda el archivo y reinicia el servidor de desarrollo (`npm run dev`) si estaba activo.

> [!WARNING]
> Nunca uses el prefijo `NEXT_PUBLIC_` para esta variable (por ejemplo, `NEXT_PUBLIC_GEMINI_API_KEY`). Si lo haces, Next.js incluirá la clave en el bundle del frontend, permitiendo que cualquier usuario de la web la extraiga e inspeccione, comprometiendo tu cuenta y facturación.
