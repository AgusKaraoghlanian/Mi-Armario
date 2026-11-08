---
name: arquitectura-armario
description: Decisiones de arquitectura de Mi Armario (app Expo + backend Express/Prisma por capas). Usar siempre que se proponga una dependencia, patrón, carpeta o capa nueva, o cuando Agus pregunte "dónde pongo esto" o si algo rompe el patrón del proyecto.
---

# Arquitectura — Mi Armario

Modo pair programming: acompañar la decisión, no tomarla por Agus.

## Backend: el flujo de capas

```
Router → [auth] → [validación] → Controller → Service → Repository → Prisma → PostgreSQL
```

- **Router**: endpoints y middlewares. Sin lógica.
- **Controller**: lee el request, llama al service y responde.
- **Service**: reglas de negocio (dueño de la prenda, límites, duplicados). Nunca Prisma directo.
- **Repository**: el único que toca Prisma.

Ante "¿dónde va esto?", preguntar primero: ¿es una regla de negocio (service) o forma de los
datos (validador o repository)?

## App: dónde va cada cosa

- `src/app/`: solo rutas (cada archivo es una pantalla). Que sean delgadas: arman la pantalla con
  componentes y hooks.
- `src/dominio/`: reglas puras en TypeScript, sin React (probador, consejos, filtros). Es lo que
  más conviene testear.
- `src/features/<feature>/`: componentes y hooks de una sola feature.
- `src/compartidos/`: lo que usan 2 o más features.
- `src/tema/`: tokens de diseño. Ningún color ni resorte suelto en un componente.

## Datos: local primero, después sincronizar

El plan es guardar primero en el teléfono, para que la app funcione sin internet, y sincronizar
con el backend más adelante. Antes de elegir la librería de guardado local, o de pasar a
sincronizar, usar el formato de abajo.

## Formato obligatorio para proponer algo nuevo

1. **Qué problema resuelve**, en concreto.
2. **Por qué ahora** y no "algún día".
3. **La alternativa más simple** (no agregar nada, o usar lo que ya hay).
4. **Por qué conviene esta opción** frente a la simple.

En la app, preferir los módulos de Expo antes que librerías de terceros, e instalarlos con
`npx expo install`.

## No crear capas o carpetas sin necesidad

Si hay un solo uso, no abstraer todavía. Es más fácil agregar la capa cuando aparece el segundo
caso que sacarla después.
