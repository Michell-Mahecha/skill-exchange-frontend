# 🚀 Configuración de Autenticación con Google (Frontend Next.js)

Esta guía explica paso a paso cómo habilitar el inicio de sesión con Google utilizando **Firebase Auth** en el proyecto frontend.

---

## 📋 Pasos en Firebase Console

Para que la aplicación pueda conectarse con Google, primero debes registrar un proyecto en la plataforma de Firebase:

### 1. Crear el Proyecto
1. Ve a [Firebase Console](https://console.firebase.google.com/).
2. Haz clic en **Crear un proyecto** (o *Agregar proyecto*).
3. Escribe un nombre descriptivo para tu proyecto (por ejemplo: `skills-exchange-clase`).
4. Haz clic en **Continuar**. Para fines educativos, puedes desactivar *Google Analytics* si lo deseas para acelerar la creación.
5. Haz clic en **Crear proyecto** y espera a que esté listo.

### 2. Habilitar Google Sign-In
1. En el panel lateral izquierdo, navega a **Build > Authentication** (o *Compilación > Authentication*).
2. Haz clic en **Comenzar** (*Get Started*).
3. Selecciona la pestaña **Sign-in method** (Método de inicio de sesión).
4. Elige **Google** de la lista de proveedores adicionales.
5. Activa el interruptor para habilitarlo.
6. Escribe un **Nombre público del proyecto** (aparecerá en la pantalla de Google al loguearse) y selecciona tu correo en el campo **Correo de soporte del proyecto**.
7. Haz clic en **Guardar**.

### 3. Registrar la Aplicación Web
1. Regresa al panel principal haciendo clic en **Project Overview** (o el icono de casa).
2. En el centro de la pantalla verás varios iconos. Haz clic en el icono web (`</>`) para registrar una app.
3. Escribe un apodo para la aplicación (por ejemplo: `skills-frontend-dev`).
4. Haz clic en **Registrar app**.
5. Firebase te mostrará un código con un objeto llamado `firebaseConfig`. Se ve similar a esto:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "tu-proyecto.firebaseapp.com",
     projectId: "tu-proyecto",
     storageBucket: "tu-proyecto.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234:web:abcd"
   };
   ```
   *Guarda estos datos, ya que los utilizaremos en el siguiente paso.*

---

## ⚙️ Configuración del Proyecto Next.js

### 1. Variables de Entorno
Crea un archivo llamado `.env.local` en la raíz del proyecto frontend (puedes duplicar el archivo `.env.example`) y rellena las variables de Firebase con los datos del objeto `firebaseConfig` obtenido en el paso anterior:

```env
NEXT_PUBLIC_API_BASE_URL=https://apiskills.danidev.co/api
# O si usas backend local:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Configuración de Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_obtenida
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

### 2. Estructura de Archivos Creados/Modificados

*   **`src/lib/firebase.js`**: Contiene la inicialización del SDK de Firebase y la exportación del proveedor de Google (`GoogleAuthProvider`).
*   **`src/app/(auth)/login/page.jsx`**: Formulario de login que ahora incluye el botón "Continuar con Google". Llama a `signInWithPopup(auth, googleProvider)` y envía el ID Token obtenido al backend mediante una petición `POST` a `/api/token/google/`.

---

## 🏃‍♂️ Cómo Probar la Aplicación

1. Asegúrate de tener las dependencias instaladas corriendo `npm install`.
2. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
3. Entra a `http://localhost:3000/login`.
4. Haz clic en **Continuar con Google**. Debería desplegarse una ventana emergente de Google pidiéndote iniciar sesión.
5. Tras autorizar, el frontend enviará tu token al backend para validar y recibir los tokens SimpleJWT, y finalmente te redirigirá automáticamente al **Dashboard**.
