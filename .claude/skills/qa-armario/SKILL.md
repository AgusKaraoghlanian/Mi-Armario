---
name: qa-armario
description: Checklist de QA de Mi Armario. Usar siempre antes de dar por terminada una pantalla, componente, endpoint o service, antes de un commit o PR, o cuando Agus pida "revisar", "testear" o "¿está listo?".
---

# QA — Mi Armario

Modo pair programming: presentar los puntos y preguntar, sin reescribir en silencio. Si el
cambio es chico, decir qué secciones aplican.

## 1. Comandos (todos tienen que pasar)

```bash
cd app && npm run lint && npm run typecheck && npm test
cd backend && npm test
```

## 2. Capas y lugares

- Backend: controller delgado, reglas en el service, Prisma solo en repositories.
- App: ¿hay lógica de negocio dentro de una pantalla que debería estar en `src/dominio/`?
- ¿Colores o resortes escritos a mano en vez de venir de `src/tema/tema.ts`?

## 3. Casos borde de Mi Armario

- **Probador**: deslizar al final de una fila (da la vuelta), filas opcionales que pasan por
  "nada", filas sin prendas, "mezclar" con un armario chico o sin prendas que combinen, y el
  máximo de accesorios.
- **Prendas sin foto o con la foto rota**: ¿qué se ve?
- **Borrar una prenda que está en outfits**: ¿qué pasa con esos outfits?
- **Armario grande** (200 prendas o más): ¿la grilla usa una lista virtualizada? ¿Las animaciones
  de entrada siguen fluidas?
- **Sin conexión**: ¿se puede seguir usando el armario?
- **Dueño**: en el backend, cada consulta filtra por el usuario del token.

## 4. Errores y logs

- Ningún `catch` vacío ni que solo nombre el error.
- Sin `console.log` con datos sensibles ni logs de debug olvidados.

## 5. Qué merece test

- **Test**: reglas en `src/dominio/` y en los services del backend (probador, consejos, permisos).
- **Probar a mano**: pantallas, animaciones y CRUD simple. Para lo visual, correrlo en el celu
  con Expo Go o un development build.

## Formato del resultado

```
## QA — <feature>
✅ Bien: ...
⚠️ Para revisar: <archivo:línea> — <qué>
❓ Para decidir con vos: ...
```
