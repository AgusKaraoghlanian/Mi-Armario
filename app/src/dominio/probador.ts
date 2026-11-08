// Reglas del probador: las prendas se muestran apiladas en filas (como un outfit armado sobre la
// cama) y cada fila se cambia deslizando. Sin React a propósito: así se prueba con vitest y la
// pantalla solo dibuja el resultado.

import type { Prenda, Temporada, Zona } from './tipos';

// Filas del probador, de arriba hacia abajo. Los accesorios van aparte (ver alternarAccesorio).
export const FILAS = ['cabeza', 'abrigo', 'torso', 'piernas', 'pies'] as const;
export type Fila = (typeof FILAS)[number];

// Filas que se pueden dejar vacías (no siempre usás gorra o campera).
export const FILAS_OPCIONALES: readonly Fila[] = ['cabeza', 'abrigo'];

// Qué prenda está elegida en cada fila (su id), o null si la fila está vacía.
export type Seleccion = Record<Fila, string | null>;

export const SELECCION_VACIA: Seleccion = { cabeza: null, abrigo: null, torso: null, piernas: null, pies: null };

// Máximo de accesorios a la vez, para que el outfit no quede recargado.
export const MAXIMO_ACCESORIOS = 3;

const esFila = (zona: Zona): zona is Fila => (FILAS as readonly string[]).includes(zona);

// Lo que se puede elegir en una fila. En las opcionales, la primera opción es "nada" (null).
export const opcionesDeFila = (prendas: Prenda[], fila: Fila): (Prenda | null)[] => {
  const deLaFila = prendas.filter((p) => p.zona === fila);
  return FILAS_OPCIONALES.includes(fila) ? [null, ...deLaFila] : deLaFila;
};

// Pasa a la prenda siguiente (paso 1) o anterior (paso -1) de una fila. Da la vuelta al llegar
// al final, como un carrusel.
export const moverEnFila = (prendas: Prenda[], seleccion: Seleccion, fila: Fila, paso: 1 | -1): Seleccion => {
  const opciones = opcionesDeFila(prendas, fila);
  if (opciones.length === 0) return seleccion;

  const actual = opciones.findIndex((p) => (p?.id ?? null) === seleccion[fila]);
  const desde = actual === -1 ? 0 : actual;
  const siguiente = (desde + paso + opciones.length) % opciones.length;
  return { ...seleccion, [fila]: opciones[siguiente]?.id ?? null };
};

// Dos temporadas combinan salvo verano con invierno.
const temporadasCombinan = (a: Temporada, b: Temporada) =>
  !((a === 'verano' && b === 'invierno') || (a === 'invierno' && b === 'verano'));

// Dos prendas combinan si su formalidad es parecida (diferencia de 1 como mucho) y sus
// temporadas no chocan. Es la primera regla de los consejos; se va a ir afinando (colores, clima).
export const combinan = (a: Prenda, b: Prenda): boolean =>
  Math.abs(a.formalidad - b.formalidad) <= 1 && temporadasCombinan(a.temporada, b.temporada);

// Arma un outfit al azar que combine. Elige primero el torso (es lo que más se ve) y después
// cada fila entre las prendas que combinan con lo ya elegido. Si ninguna combina, usa cualquiera
// de la fila antes que dejarla vacía. Las filas opcionales quedan vacías la mitad de las veces.
// `azar` devuelve un número entre 0 y 1 (Math.random); se recibe para poder probarlo.
export const mezclar = (prendas: Prenda[], azar: () => number = Math.random): Seleccion => {
  const elegir = <T>(lista: T[]): T | undefined => lista[Math.floor(azar() * lista.length)];
  const orden: Fila[] = ['torso', 'piernas', 'pies', 'abrigo', 'cabeza'];
  const elegidas: Prenda[] = [];
  const seleccion: Seleccion = { ...SELECCION_VACIA };

  for (const fila of orden) {
    if (FILAS_OPCIONALES.includes(fila) && azar() < 0.5) continue;
    const deLaFila = prendas.filter((p) => p.zona === fila);
    const queCombinan = deLaFila.filter((p) => elegidas.every((e) => combinan(e, p)));
    const prenda = elegir(queCombinan.length > 0 ? queCombinan : deLaFila);
    if (prenda) {
      seleccion[fila] = prenda.id;
      elegidas.push(prenda);
    }
  }
  return seleccion;
};

// Pone o saca un accesorio. Si ya hay el máximo, sale el más viejo.
export const alternarAccesorio = (ids: string[], id: string): string[] => {
  if (ids.includes(id)) return ids.filter((x) => x !== id);
  const conEste = [...ids, id];
  return conEste.length > MAXIMO_ACCESORIOS ? conEste.slice(1) : conEste;
};

// Las prendas del outfit, en el orden en que se ven (de arriba hacia abajo).
export const prendasDelOutfit = (prendas: Prenda[], seleccion: Seleccion): Prenda[] =>
  FILAS.map((fila) => prendas.find((p) => p.id === seleccion[fila])).filter(
    (p): p is Prenda => p !== undefined && esFila(p.zona),
  );
