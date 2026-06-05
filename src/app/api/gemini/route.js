/**
 * # API Route: /api/gemini/route.js
 *
 * Este archivo implementa el manejador de la ruta API (Route Handler) en Next.js para
 * interactuar con el modelo de IA Gemini de Google.
 *
 * ## Seguridad
 * La API Key se obtiene únicamente en el entorno del servidor usando `process.env.GEMINI_API_KEY`.
 * Es de vital importancia no exponer esta clave en el código del frontend (evitando prefijos
 * como `NEXT_PUBLIC_`), ya que permitiría a terceros robar las credenciales y hacer uso indebido
 * del servicio bajo nuestra facturación.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializamos el cliente de Google Generative AI con la clave de API del servidor.
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
  try {
    // Verificar que la clave API esté configurada en el servidor.
    if (!genAI) {
      return new Response(
        JSON.stringify({
          error:
            "La variable de entorno GEMINI_API_KEY no está configurada en el servidor.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // Extraer el prompt del cuerpo de la solicitud HTTP.
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({
          error: "El campo 'prompt' es requerido en el cuerpo de la solicitud.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Configurar el modelo gemini-2.5-flash con las instrucciones del sistema solicitadas.
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction:
        "Eres el asistente de Skill Exchange, una plataforma universitaria de intercambio de habilidades. " +
        "Responde en español, de forma clara y concisa. Ayuda a los usuarios con preguntas sobre aprendizaje, " +
        "enseñanza, habilidades técnicas y uso de la plataforma.",
    });

    // Ejecutar la consulta con una temperatura baja para mayor coherencia y precisión en las respuestas.
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
      },
    });

    const responseText = result.response.text();

    // Retornar la respuesta en formato JSON.
    return new Response(JSON.stringify({ text: responseText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error en el API de Gemini:", error);
    return new Response(
      JSON.stringify({
        error: "Error al procesar la solicitud con el asistente Gemini.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
