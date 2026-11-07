# Estructura de Mi Armario

Mapa rápido de dónde está cada cosa. Se actualiza con cada cambio grande.

## Cómo levantarlo

- **App**: `npm install --prefix app` y después `npm start --prefix app`. Escaneá el QR con
  **Expo Go** (Android o iOS) y la app se abre en el celu; se recarga sola al guardar. Con `w`
  se abre la versión web en http://localhost:8081.
- **Backend**: `npm install --prefix backend`, copiar `backend/.env.example` a `backend/.env`
  y completarlo, y después `npm run dev --prefix backend` → http://localhost:3001
  (`GET /salud` responde `{ estado: "ok" }`). Todavía no tiene endpoints de la app.
- **Base de datos**: PostgreSQL en Supabase. El schema está en `backend/prisma/schema.prisma`
  y todavía no tiene migraciones. La primera se crea con
  `npx prisma migrate dev --config prisma7.config.ts --name inicial` desde `backend/`. Después
  de cada migración hay que correr `npx prisma generate --config prisma7.config.ts` (en
  Prisma 7 el cliente no se regenera solo).
- **Tests y chequeos**: en `app/`, `npm run lint`, `npm run typecheck` y `npm test`; en
  `backend/`, `npm test`. GitHub Actions corre todo en cada PR (`.github/workflows/chequeos.yml`).

## Decisiones

- **Expo (nativo) y no PWA**: cámara, galería y gestos nativos, y animaciones a 60 fps con
  Reanimated. La versión web sale del mismo código.
- **TypeScript en la app**: es lo que trae Expo por defecto y ayuda con las props de los
  componentes y las rutas tipadas. El backend sigue en JavaScript, como VPUG.
- **Maniquí con capas 2D** en la v1: poner o sacar una prenda es instantáneo y no cuesta nada.
  El probador con la foto del usuario (IA) queda para la fase 2.
- **Datos locales primero** (próximo paso): el armario se guarda en el celu y anda sin internet.
  El backend entra cuando haga falta cuenta, backup o sincronizar entre dispositivos.
- **Diseño propio**: oscuro por defecto con acento violeta y todo animado. No se parece a VPUG.

## App (`app/`)

Expo SDK 58, Expo Router, React Native 0.88, Reanimated 4.

```
src/app/                      rutas: cada archivo es una pantalla
  _layout.tsx                 raíz: tema, gestos y Stack (tabs + hoja de agregar prenda)
  (tabs)/_layout.tsx          tabs nativas de iOS y Android (Armario, Probador, Outfits, Inspiración)
  (tabs)/_layout.web.tsx      las mismas tabs en web, como barra flotante
  (tabs)/index.tsx            Armario: filtros y estado vacío (todavía no guarda prendas)
  (tabs)/probador.tsx         Probador: maniquí + prendas de ejemplo para tocar
  (tabs)/outfits.tsx          Outfits (vacío)
  (tabs)/inspiracion.tsx      Inspiración (vacío)
  agregar-prenda.tsx          hoja que sube desde abajo: cámara o galería (todavía sin conectar)
src/dominio/                  reglas sin React, con tests
  tipos.ts                    Prenda, Outfit, zonas del maniquí y categorías
  probador.ts                 poner, sacar y alternar prendas, y el orden de las capas
src/features/probador/
  componentes/maniqui.tsx     silueta + capas animadas por zona
  prendas-de-ejemplo.ts       TEMPORAL: se borra cuando el probador lea el armario real
src/compartidos/componentes/  Pantalla, Texto, Presionable (rebote al tocar), Chip, EstadoVacio
src/tema/tema.ts              colores (oscuro/claro), espacios, radios, tipografía y resortes
tests/                        vitest sobre src/dominio
AGENTS.md                     reglas de Expo para la IA (leer la doc de la versión instalada)
```

## Backend (`backend/`)

Igual que VPUG: `router → middlewares → controller → service → repository → Prisma`.

```
prisma/schema.prisma          Usuario, Prenda, Outfit, OutfitPrenda (orden de capas), Inspiracion, RegistroUso
prisma7.config.ts             config de Prisma 7 (migraciones por DIRECT_URL)
src/app.js                    Express: helmet, CORS, JSON, /salud, límite por IP, 404 y errores
src/server.js                 valida el entorno y arranca
src/config/entorno.js         variables de entorno validadas al arrancar y orígenes de CORS
src/config/prisma.js          conexión a la base (solo la usan los repositories)
src/middlewares/              error.middleware (manejo central), limite.middleware
src/errors/                   errores propios con .code (NoEncontradoError)
tests/                        vitest + supertest, sin base
```

## Seguridad

- El servidor no arranca sin `DATABASE_URL` y `JWT_SECRET`. En producción exige un secreto de
  32 caracteres o más y `CORS_ORIGENES`.
- `helmet`, un límite de 1000 pedidos cada 15 minutos por IP en `/v1` y errores sin detalles
  internos.
- `npm audit` en `backend/` da 0 vulnerabilidades (noviembre de 2026).
- Reglas para lo que viene (auth, fotos, Supabase): `.claude/skills/seguridad-armario`.

## Próximos pasos

1. Agregar prenda: cámara o galería, quitar el fondo y cargar los datos.
2. Guardar el armario en el celu y mostrarlo en la grilla con filtros.
3. Que el probador use las prendas reales (fotos como capas) y guardar outfits.
4. Inspiración, comparar y consejos por reglas.
