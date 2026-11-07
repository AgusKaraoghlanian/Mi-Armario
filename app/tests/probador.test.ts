import { describe, expect, it } from 'vitest';

import {
  alternarPrenda,
  MAXIMO_POR_ZONA_MULTIPLE,
  ordenarCapas,
  ponerPrenda,
  sacarPrenda,
} from '../src/dominio/probador';
import type { Prenda, Zona } from '../src/dominio/tipos';

const prenda = (id: string, zona: Zona): Prenda => ({
  id,
  nombre: id,
  categoria: 'remera',
  zona,
  fotoUri: null,
  colores: [],
  temporada: 'todas',
  formalidad: 2,
  creadaEn: '2026-11-07T00:00:00.000Z',
});

const ids = (lista: Prenda[]) => lista.map((p) => p.id);

describe('ponerPrenda', () => {
  it('en una zona simple reemplaza a la que estaba', () => {
    const puestas = [prenda('remera', 'torso'), prenda('jean', 'piernas')];
    expect(ids(ponerPrenda(puestas, prenda('camisa', 'torso')))).toEqual(['jean', 'camisa']);
  });

  it('no duplica una prenda que ya estaba puesta', () => {
    const remera = prenda('remera', 'torso');
    expect(ids(ponerPrenda([remera], remera))).toEqual(['remera']);
  });

  it('en accesorios suma hasta el máximo y después saca el más viejo', () => {
    let puestas: Prenda[] = [];
    for (let i = 1; i <= MAXIMO_POR_ZONA_MULTIPLE; i++) {
      puestas = ponerPrenda(puestas, prenda(`acc${i}`, 'accesorio'));
    }
    expect(puestas).toHaveLength(MAXIMO_POR_ZONA_MULTIPLE);

    const conUnoMas = ponerPrenda(puestas, prenda('reloj', 'accesorio'));
    expect(ids(conUnoMas)).toEqual(['acc2', 'acc3', 'reloj']);
  });

  it('no modifica la lista que recibe', () => {
    const puestas = [prenda('remera', 'torso')];
    ponerPrenda(puestas, prenda('camisa', 'torso'));
    expect(ids(puestas)).toEqual(['remera']);
  });
});

describe('sacarPrenda y alternarPrenda', () => {
  it('saca solo la prenda pedida', () => {
    const puestas = [prenda('remera', 'torso'), prenda('jean', 'piernas')];
    expect(ids(sacarPrenda(puestas, 'remera'))).toEqual(['jean']);
  });

  it('alternar pone si no estaba y saca si estaba', () => {
    const remera = prenda('remera', 'torso');
    const puesta = alternarPrenda([], remera);
    expect(ids(puesta)).toEqual(['remera']);
    expect(alternarPrenda(puesta, remera)).toEqual([]);
  });
});

describe('ordenarCapas', () => {
  it('dibuja de abajo hacia arriba: piernas, pies, torso, abrigo, cabeza, accesorios', () => {
    const puestas = [
      prenda('gorro', 'cabeza'),
      prenda('campera', 'abrigo'),
      prenda('collar', 'accesorio'),
      prenda('remera', 'torso'),
      prenda('zapatillas', 'pies'),
      prenda('jean', 'piernas'),
    ];
    expect(ids(ordenarCapas(puestas))).toEqual(['jean', 'zapatillas', 'remera', 'campera', 'gorro', 'collar']);
  });

  it('dentro de la misma zona respeta el orden en que se pusieron', () => {
    const puestas = [prenda('reloj', 'accesorio'), prenda('remera', 'torso'), prenda('collar', 'accesorio')];
    expect(ids(ordenarCapas(puestas))).toEqual(['remera', 'reloj', 'collar']);
  });
});
