import { describe, expect, it } from 'vitest';

import {
  alternarAccesorio,
  combinan,
  MAXIMO_ACCESORIOS,
  mezclar,
  moverEnFila,
  opcionesDeFila,
  prendasDelOutfit,
  SELECCION_VACIA,
  type Seleccion,
} from '../src/dominio/probador';
import type { Prenda, Temporada, Zona } from '../src/dominio/tipos';

const prenda = (
  id: string,
  zona: Zona,
  extra: { formalidad?: Prenda['formalidad']; temporada?: Temporada } = {},
): Prenda => ({
  id,
  nombre: id,
  categoria: 'remera',
  zona,
  fotoUri: null,
  colores: [],
  temporada: extra.temporada ?? 'todas',
  formalidad: extra.formalidad ?? 2,
  creadaEn: '2026-11-08T00:00:00.000Z',
});

// Un "azar" fijo: devuelve los valores en orden y después repite el último.
const azarFijo = (...valores: number[]) => {
  let i = 0;
  return () => valores[Math.min(i++, valores.length - 1)];
};

const armario = [
  prenda('remera', 'torso'),
  prenda('camisa', 'torso', { formalidad: 4 }),
  prenda('jean', 'piernas'),
  prenda('zapas', 'pies'),
  prenda('gorra', 'cabeza'),
];

describe('opcionesDeFila', () => {
  it('en una fila obligatoria solo están sus prendas', () => {
    expect(opcionesDeFila(armario, 'torso').map((p) => p?.id)).toEqual(['remera', 'camisa']);
  });

  it('en una fila opcional la primera opción es "nada"', () => {
    expect(opcionesDeFila(armario, 'cabeza').map((p) => p?.id ?? null)).toEqual([null, 'gorra']);
  });
});

describe('moverEnFila', () => {
  const conRemera: Seleccion = { ...SELECCION_VACIA, torso: 'remera' };

  it('pasa a la siguiente y da la vuelta al final', () => {
    const conCamisa = moverEnFila(armario, conRemera, 'torso', 1);
    expect(conCamisa.torso).toBe('camisa');
    expect(moverEnFila(armario, conCamisa, 'torso', 1).torso).toBe('remera');
  });

  it('hacia atrás desde la primera va a la última', () => {
    expect(moverEnFila(armario, conRemera, 'torso', -1).torso).toBe('camisa');
  });

  it('en una fila opcional pasa por "nada"', () => {
    const conGorra = moverEnFila(armario, SELECCION_VACIA, 'cabeza', 1);
    expect(conGorra.cabeza).toBe('gorra');
    expect(moverEnFila(armario, conGorra, 'cabeza', 1).cabeza).toBeNull();
  });

  it('una fila sin prendas no cambia nada y no toca las otras filas', () => {
    expect(moverEnFila(armario, conRemera, 'abrigo', 1)).toEqual({ ...conRemera, abrigo: null });
    expect(moverEnFila([], conRemera, 'piernas', 1)).toBe(conRemera);
  });
});

describe('combinan', () => {
  it('formalidad parecida y temporadas compatibles combinan', () => {
    expect(combinan(prenda('a', 'torso', { formalidad: 2 }), prenda('b', 'piernas', { formalidad: 3 }))).toBe(true);
  });

  it('muy distinta formalidad no combina', () => {
    expect(combinan(prenda('a', 'torso', { formalidad: 1 }), prenda('b', 'piernas', { formalidad: 4 }))).toBe(false);
  });

  it('verano con invierno no combina, pero "todas" combina con cualquiera', () => {
    const verano = prenda('a', 'torso', { temporada: 'verano' });
    expect(combinan(verano, prenda('b', 'piernas', { temporada: 'invierno' }))).toBe(false);
    expect(combinan(verano, prenda('c', 'piernas', { temporada: 'todas' }))).toBe(true);
  });
});

describe('mezclar', () => {
  it('llena las filas obligatorias con prendas que combinan', () => {
    const conTraje = [...armario, prenda('pantalon-vestir', 'piernas', { formalidad: 5 })];
    // Elige la camisa (formal) y después debería ir con el pantalón de vestir, no con el jean.
    const seleccion = mezclar(conTraje, azarFijo(0.9, 0, 0, 0.9, 0.9));
    expect(seleccion.torso).toBe('camisa');
    expect(seleccion.piernas).toBe('pantalon-vestir');
    expect(seleccion.pies).toBe('zapas');
  });

  it('si nada combina, usa cualquiera de la fila antes que dejarla vacía', () => {
    const chocan = [prenda('remera', 'torso', { formalidad: 1 }), prenda('frac', 'piernas', { formalidad: 5 })];
    expect(mezclar(chocan, azarFijo(0)).piernas).toBe('frac');
  });

  it('las filas opcionales a veces quedan vacías', () => {
    const vacias = mezclar(armario, azarFijo(0.1));
    expect(vacias.cabeza).toBeNull();
    const conGorra = mezclar(armario, azarFijo(0.9));
    expect(conGorra.cabeza).toBe('gorra');
  });
});

describe('alternarAccesorio', () => {
  it('pone, saca y respeta el máximo sacando el más viejo', () => {
    let ids: string[] = [];
    for (let i = 1; i <= MAXIMO_ACCESORIOS; i++) ids = alternarAccesorio(ids, `acc${i}`);
    expect(alternarAccesorio(ids, 'reloj')).toEqual(['acc2', 'acc3', 'reloj']);
    expect(alternarAccesorio(ids, 'acc2')).toEqual(['acc1', 'acc3']);
  });
});

describe('prendasDelOutfit', () => {
  it('devuelve las prendas elegidas de arriba hacia abajo', () => {
    const seleccion: Seleccion = { ...SELECCION_VACIA, pies: 'zapas', torso: 'remera', cabeza: 'gorra' };
    expect(prendasDelOutfit(armario, seleccion).map((p) => p.id)).toEqual(['gorra', 'remera', 'zapas']);
  });
});
