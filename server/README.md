# Backend - Óptica Virtual

Requisitos: Node >= 18, pnpm o npm, MongoDB.

Variables de entorno (.env):

```
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/optica_virtual
JWT_SECRET=cambia_este_valor_en_produccion
CORS_ORIGIN=*
```

Comandos:
- Desarrollo: `pnpm dev`
- Compilar: `pnpm build`
- Producción: `pnpm start`

Endpoints de prueba:
- GET http://localhost:4000/health
- GET http://localhost:4000/api/users
- GET http://localhost:4000/api/products
- GET http://localhost:4000/api/appointments
