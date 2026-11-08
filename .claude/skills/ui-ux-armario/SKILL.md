---
name: ui-ux-armario
description: Guía de diseño y animaciones de Mi Armario (moderno, oscuro por defecto, todo con resortes). Usar siempre al diseñar, implementar o revisar una pantalla, componente o animación de la app, o cuando Agus pregunte cómo debería verse algo.
---

# UI/UX — Mi Armario

El diseño **no tiene nada que ver con VPUG**: tiene que sentirse como una app de moda actual.
Se va definiendo mientras se arma. Proponer opciones y mostrarlas antes de cerrar decisiones
grandes de look.

## Principios

1. **La ropa es la protagonista.** La interfaz es oscura y neutra, con un solo acento violeta,
   para que resalten las fotos y los colores de las prendas.
2. **Todo lo tocable responde.** Usar `Presionable` (se achica con un resorte), no `Pressable`
   pelado.
3. **Movimiento con sentido.** Entradas escalonadas en listas, transiciones de color en lo que
   cambia de estado, y capas del maniquí que entran con resorte. Nada que dure más de ~400 ms
   ni que trabe un toque.
4. **Nativo donde se note.** Tabs nativas, hojas (`formSheet`) para crear cosas, gestos del
   sistema. En web, una versión equivalente.

## Tokens (`src/tema/tema.ts`)

- Colores: `fondo`, `superficie`, `superficieAlta`, `borde`, `texto`, `textoSuave`, `acento`.
  Modo oscuro y claro.
- Espacios `espacio.xs` a `espacio.xxl`, radios `radio.s` a `radio.total`, tipografía `titulo`,
  `subtitulo`, `cuerpo` y `chico`.
- Resortes `resorte.suave` y `resorte.rapido`: siempre estos, para que todo se sienta parejo.

## Animaciones (Reanimated)

- Cambiar valores animados con `.set()`, no con `.value =`, por el React Compiler.
- No mezclar `opacity` en el estilo de una vista que tiene `entering`/`exiting`: envolverla.
- Lo que se repite (respirar, flotar) va en un `useEffect` y tiene que ser sutil.
- Respetar "reducir movimiento" del sistema cuando se sume una animación grande.

## Estados de toda pantalla con datos

Cargando, error (visible, no solo en la consola), vacío y con datos. El vacío siempre trae una
acción para salir de ahí (ej. "Agregar mi primera prenda").

## Accesibilidad mínima

- Botones con texto o `accessibilityLabel` (ej. el "+").
- Contraste suficiente sobre el acento.
- Tocables de al menos 44 × 44.

## Formato del resultado

```
## UI/UX — <pantalla>
✅ Bien resuelto: ...
⚠️ Para revisar: ...
❓ Para decidir con vos: ...
```
