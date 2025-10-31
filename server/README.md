# Backend - Óptica Virtual

Backend completo con Express, TypeScript, PostgreSQL y autenticación JWT.

## Requisitos
- Node.js >= 18
- npm
- PostgreSQL (usa pgAdmin para gestionarlo)

## Variables de entorno (.env)

```
PORT=4000

DB_HOST=localhost
DB_PORT=4200
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_contraseña_postgres
DB_NAME=optica_virtual
DB_SCHEMA=core
```

## Comandos
- **Desarrollo:** `npm run dev`
- **Compilar:** `npm run build`
- **Producción:** `npm start`

## Estructura del Proyecto

```
server/
├── src/
│   ├── config/          # Configuración (env, database)
│   ├── middlewares/      # Auth, validación, errores
│   ├── modules/          # Módulos de negocio
│   │   ├── users/
│   │   ├── products/
│   │   └── appointments/
│   ├── routes/           # Rutas principales
│   ├── schemas/          # Validaciones Zod
│   ├── types/            # Tipos TypeScript
│   └── utils/            # Utilidades (JWT)
```

## API Endpoints

### Autenticación

#### POST `/api/users/register`
Registrar nuevo usuario
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "Juan Pérez",
  "phone": "+1234567890" // opcional
}
```

#### POST `/api/users/login`
Iniciar sesión
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
Respuesta:
```json
{
  "token": "jwt_token_aqui",
  "user": { "id", "email", "full_name", "role", "phone" }
}
```

### Usuarios

#### GET `/api/users/profile` 🔒
Obtener perfil del usuario autenticado

#### GET `/api/users` 🔒👑
Listar todos los usuarios (solo admin)

#### GET `/api/users/:id` 🔒👑
Obtener usuario por ID (solo admin)

#### PUT `/api/users/:id` 🔒
Actualizar usuario (propio o admin)

#### DELETE `/api/users/:id` 🔒👑
Eliminar usuario (solo admin)

### Productos

#### GET `/api/products`
Listar productos (público)

#### GET `/api/products?category_id=uuid`
Listar productos por categoría (público)

#### GET `/api/products/:id`
Obtener producto por ID (público)

#### POST `/api/products` 🔒👑
Crear producto (solo admin)
```json
{
  "name": "Gafas Ray-Ban",
  "description": "Gafas de sol premium",
  "sku": "RB-001",
  "price_cents": 15000,
  "currency": "USD",
  "stock": 10,
  "category_id": "uuid", // opcional
  "image_url": "https://..." // opcional
}
```

#### PUT `/api/products/:id` 🔒👑
Actualizar producto (solo admin)

#### DELETE `/api/products/:id` 🔒👑
Eliminar producto (solo admin)

### Citas

#### GET `/api/appointments` 🔒
Listar citas (propias si user, todas si admin)

#### GET `/api/appointments/:id` 🔒
Obtener cita por ID (propia o admin)

#### POST `/api/appointments` 🔒
Crear cita
```json
{
  "product_id": "uuid", // opcional
  "scheduled_at": "2025-11-15T10:00:00Z",
  "notes": "Necesito graduación" // opcional
}
```

#### PUT `/api/appointments/:id` 🔒
Actualizar cita (propia o admin)

#### DELETE `/api/appointments/:id` 🔒
Eliminar cita (propia o admin)

### Health Check

#### GET `/health`
Verificar estado del servidor

## Autenticación

Las rutas marcadas con 🔒 requieren autenticación. Incluye el token en el header:

```
Authorization: Bearer <token>
```

Las rutas marcadas con 👑 requieren rol de administrador.

## Arquitectura

- **Repositories:** Capa de acceso a datos (queries SQL)
- **Services:** Lógica de negocio
- **Controllers:** Manejo de HTTP requests/responses
- **Routes:** Definición de endpoints Express
- **Middlewares:** Autenticación, validación, errores
- **Schemas:** Validación de datos con Zod

## Buenas Prácticas Implementadas

✅ Separación de responsabilidades (arquitectura limpia)
✅ Validación de datos con Zod
✅ Autenticación JWT segura
✅ Hash de contraseñas con bcrypt
✅ Manejo de errores centralizado
✅ Tipos TypeScript estrictos
✅ Queries SQL parametrizadas (seguridad)
✅ Permisos y roles (user/admin)
✅ Respuestas HTTP consistentes
