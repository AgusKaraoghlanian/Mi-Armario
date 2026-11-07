# Mi Armario

App para tener el armario en el celu: cargar prendas y accesorios, armar outfits en un maniquí
con capas, guardar inspiración, comparar looks y recibir consejos. Mobile-first (iOS y Android
con Expo), con versión web de regalo.

Mapa del repo, cómo levantarlo y decisiones tomadas: **`ESTRUCTURA.md`** (leerlo antes de tocar
algo y actualizarlo en cada cambio grande).

## Forma de trabajo: pair programming

Igual que en VPUG, por defecto la IA acompaña, no programa sola:

- Guiar de a un paso, explicando antes qué se hace y por qué.
- No implementar funcionalidades completas ni tocar archivos salvo que Agus lo pida explícito.
  Si lo pide ("armalo", "hacelo vos", "abrí un PR"), ahí sí.
- Si hay un error, primero explicar cuál es y ayudar a encontrarlo.
- Al proponer una tecnología, dependencia o patrón nuevo, explicar en este orden: qué problema
  resuelve, por qué hace falta ahora, qué alternativa más simple hay y por qué conviene igual.
- Prioridad: entender → decidir → implementar → probar → revisar.

Skills del repo (`.claude/skills/`): `arquitectura-armario`, `qa-armario`, `seguridad-armario`
y `ui-ux-armario`. Usarlas cuando apliquen (las descripciones dicen cuándo).

## Stack

- **App (`app/`)**: Expo + React Native + TypeScript, Expo Router (rutas en `src/app/`),
  Reanimated para animaciones. Ver `app/AGENTS.md`: Expo cambia mucho entre versiones, leer la
  documentación de la versión instalada antes de usar una API y agregar paquetes con
  `npx expo install`.
- **Backend (`backend/`)**: Node ESM + Express 5 + Prisma 7 + PostgreSQL (Supabase). Mismo
  diseño por capas que VPUG.

## Convenciones

- **Todo en español**: archivos, funciones, variables, mensajes y commits.
- **Backend**: `router → [auth] → [validación] → controller → service → repository → Prisma`.
  Controller delgado, reglas en el service, el repository es el único que toca Prisma.
  Archivos `entidad.capa.js` (`prenda.service.js`), funciones verbo + entidad (`crearPrenda`).
  Errores propios con `.code` (status HTTP) y nombre de clase igual al del archivo; un solo
  manejador de errores al final de `app.js`. Variables de entorno solo en `src/config/entorno.js`.
- **App**: lógica sin React en `src/dominio/` (se prueba con vitest); pantallas en `src/app/`;
  cosas de una sola feature en `src/features/<feature>/`; lo que usan 2+ features en
  `src/compartidos/`. Colores, espacios y resortes de animación solo desde `src/tema/tema.ts`.
- **No crear carpetas o capas "por las dudas"**: recién cuando haya un caso real.

## Antes de dar algo por terminado

```bash
cd app && npm run lint && npm run typecheck && npm test
cd backend && npm test && npm audit
```

## PRs

- Rama `feat/<tema>` (o `fix/<tema>`), un tema por PR.
- Título en español llano. Cuerpo con `## Qué cambia`, `## Probado` y, si hace falta,
  `## Pasos manuales`.
- Si cambia la estructura, el levantado o una decisión, actualizar `ESTRUCTURA.md` en el mismo PR.
