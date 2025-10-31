# Conexión Frontend - Backend

## Configuración Rápida

### 1. Variables de Entorno del Frontend

Crea un archivo `.env.local` en la raíz del proyecto (al lado de `package.json`) con:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 2. Iniciar los Servidores

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 3. Probar la Conexión

1. **Backend funcionando:**
   - Abre: `http://localhost:4000/health`
   - Deberías ver: `{"status":"ok",...}`

2. **Frontend funcionando:**
   - Abre: `http://localhost:3000`
   - Deberías ver la página principal

3. **Probar Login:**
   - Ve a: `http://localhost:3000/login`
   - Registra un usuario nuevo
   - O inicia sesión con uno existente

## Endpoints Conectados

El frontend ahora se conecta automáticamente al backend para:

- ✅ **Autenticación:** Login y Registro
- ✅ **Productos:** Ver catálogo (próximamente)
- ✅ **Citas:** Crear y gestionar citas (próximamente)

## Solución de Problemas

### Error CORS

Si ves errores de CORS, verifica que en `server/.env` tengas:
```
CORS_ORIGIN=http://localhost:3000
```

O en `server/src/config/env.ts` el valor por defecto ya es `http://localhost:3000`

### Error de Conexión

- Verifica que el backend esté corriendo en el puerto 4000
- Verifica que `.env.local` tenga la URL correcta
- Revisa la consola del navegador para errores específicos

### Error de Autenticación

- Verifica que las credenciales sean correctas
- Asegúrate de haber creado usuarios en la base de datos
- Revisa que el token se guarde en localStorage

