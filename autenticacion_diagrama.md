# Diagrama de Secuencia: Autenticación con Google (Firebase)

Este diagrama ilustra el flujo de autenticación implementado en la aplicación, utilizando Firebase en el frontend y validación segura mediante la API de Google Identity en el backend (Enfoque Seguro sin Firebase Admin SDK).

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend (Next.js)
    participant FB as Firebase Auth
    participant B as Backend (Django)
    participant GI as Google Identity API

    U->>F: Clic en "Login con Google"
    F->>FB: Iniciar flujo de autenticación (Popup/Redirect)
    FB-->>U: Solicitar credenciales de Google
    U->>FB: Ingresar credenciales y autorizar
    FB-->>F: Retorna objeto User y el 'idToken'
    
    F->>B: POST /api/auth/google/ { token: idToken }
    
    B->>GI: POST /v1/accounts:lookup { idToken }
    Note over B,GI: El backend valida que el token sea genuino
    GI-->>B: Retorna datos verificados (UID, email, etc.)
    
    Note over B: El backend busca o crea<br/>el usuario en la base de datos
    Note over B: Genera tokens JWT (Access, Refresh)
    
    B-->>F: Retorna Access y Refresh tokens
    F->>F: Guarda tokens en el cliente (ej. cookies/localStorage)
    F-->>U: Redirecciona al Dashboard (o vista autenticada)
```
