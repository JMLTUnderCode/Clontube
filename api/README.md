# API Documentación

## Registro de Usuario

- Método: **POST /api/users/**
- Crea un nuevo usuario con rol "user".
- Campos requeridos:
  - `full_name`: Nombre completo (solo letras y espacios)
  - `username`: Usuario único (6-12 caracteres)
  - `email`: Correo electrónico único y válido
  - `password`: Contraseña (8-16 caracteres)
- Respuesta exitosa:
  ```json
  {
    "success": true,
    "user": { ... },
    "message": "Usuario creado exitosamente."
  }
  ```
- Respuesta de error:
  ```json
  {
    "success": false,
    "errors": { ... },
    "message": "Error en los datos enviados. Verifica los campos e intenta nuevamente."
  }
  ```

---

## Login de Usuario

- Método: **POST /api/login/**
- Permite iniciar sesión usando **username o email** y contraseña.
- Campos requeridos:
  - `identifier`: Username o email
  - `password`: Contraseña
- Respuesta exitosa:
  ```json
  {
    "success": true,
    "access": "<token_jwt>",
    "refresh": "<refresh_token>",
    "user": {
      "id": ...,
      "username": "...",
      "email": "...",
      "full_name": "...",
      "role": "user"
    },
    "message": "Inicio de sesión exitoso."
  }
  ```
- Respuesta de error:
  ```json
  {
    "success": false,
    "message": "Credenciales inválidas o cuenta inactiva."
  }
  ```

---

## Notas

- El registro no inicia sesión automáticamente.
- El login retorna tokens JWT para autenticación en endpoints protegidos.
- El campo `role` siempre será `"user"` salvo que el usuario sea creado como admin desde el panel de administración.