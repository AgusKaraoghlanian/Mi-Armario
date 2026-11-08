// Reglas del probador: qué pasa cuando ponés o sacás una prenda del maniquí.
// Sin React a propósito: así se prueba con vitest y la pantalla solo dibuja el resultado.

import { ZONAS, type Prenda, type Zona } from './tipos';

// Zonas donde se puede tener más de una prenda a la vez (ej. reloj + collar).
const ZONAS_MULTIPLES: readonly Zona[] = ['accesorio'];

// Máximo de prendas en una zona múltiple, para que el maniquí no quede tapado.
export const MAXIMO_POR_ZONA_MULTIPLE = 3;

// Pone una prenda. Si la zona admite una sola, reemplaza a la que estaba.
// En una zona múltiple se suma; si ya está llena, sale la más vieja.
// Devuelve una lista nueva (no modifica la que recibe).
export const ponerPrenda = (puestas: Prenda[], prenda: Prenda): Prenda[] => {
  const sinEsta = puestas.filter((p) => p.id !== prenda.id);

  if (!ZONAS_MULTIPLES.includes(prenda.zona)) {
    return [...sinEsta.filter((p) => p.zona !== prenda.zona), prenda];
  }

  const enLaZona = sinEsta.filter((p) => p.zona === prenda.zona);
  if (enLaZona.length < MAXIMO_POR_ZONA_MULTIPLE) return [...sinEsta, prenda];

  const masVieja = enLaZona[0];
  return [...sinEsta.filter((p) => p.id !== masVieja.id), prenda];
};

export const sacarPrenda = (puestas: Prenda[], prendaId: string): Prenda[] =>
  puestas.filter((p) => p.id !== prendaId);

// Pone o saca: lo que hace un toque sobre una prenda en el probador.
export const alternarPrenda = (puestas: Prenda[], prenda: Prenda): Prenda[] =>
  puestas.some((p) => p.id === prenda.id) ? sacarPrenda(puestas, prenda.id) : ponerPrenda(puestas, prenda);

// Orden en que se dibujan las capas: primero las de abajo (piernas), al final las de arriba
// (abrigo, accesorios). Dentro de una misma zona se respeta el orden en que se pusieron.
export const ordenarCapas = (puestas: Prenda[]): Prenda[] =>
  puestas
    .map((prenda, orden) => ({ prenda, orden }))
    .sort((a, b) => ZONAS.indexOf(a.prenda.zona) - ZONAS.indexOf(b.prenda.zona) || a.orden - b.orden)
    .map(({ prenda }) => prenda);
