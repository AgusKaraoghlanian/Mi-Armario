// TEMPORAL: prendas de mentira para probar el probador mientras no se pueden cargar prendas
// reales. Se borra cuando el probador lea el armario guardado.

import type { Prenda } from '@/dominio/tipos';

type Ejemplo = Pick<Prenda, 'id' | 'nombre' | 'categoria' | 'zona' | 'colores'> &
  Partial<Pick<Prenda, 'formalidad' | 'temporada'>>;

const crear = (e: Ejemplo): Prenda => ({
  fotoUri: null,
  temporada: 'todas',
  formalidad: 2,
  creadaEn: '2026-11-08T00:00:00.000Z',
  ...e,
});

export const PRENDAS_DE_EJEMPLO: Prenda[] = [
  // Cabeza
  crear({ id: 'ej-gorra', nombre: 'Gorra roja', categoria: 'gorro', zona: 'cabeza', colores: ['#DC2626'], formalidad: 1 }),
  crear({ id: 'ej-gorro', nombre: 'Gorro de lana', categoria: 'gorro', zona: 'cabeza', colores: ['#A3A3A3'], temporada: 'invierno' }),
  // Arriba
  crear({ id: 'ej-remera', nombre: 'Remera blanca', categoria: 'remera', zona: 'torso', colores: ['#ECECF4'] }),
  crear({ id: 'ej-camisa', nombre: 'Camisa celeste', categoria: 'camisa', zona: 'torso', colores: ['#7DB4F5'], formalidad: 4 }),
  crear({ id: 'ej-buzo', nombre: 'Buzo gris', categoria: 'buzo', zona: 'torso', colores: ['#6B7280'], temporada: 'invierno' }),
  crear({ id: 'ej-musculosa', nombre: 'Musculosa negra', categoria: 'remera', zona: 'torso', colores: ['#262626'], formalidad: 1, temporada: 'verano' }),
  // Abrigo
  crear({ id: 'ej-campera', nombre: 'Campera negra', categoria: 'campera', zona: 'abrigo', colores: ['#1F1F1F'], formalidad: 3 }),
  crear({ id: 'ej-jean-campera', nombre: 'Campera de jean', categoria: 'campera', zona: 'abrigo', colores: ['#3B5B8C'] }),
  // Abajo
  crear({ id: 'ej-jean', nombre: 'Jean', categoria: 'pantalon', zona: 'piernas', colores: ['#1E3A8A'] }),
  crear({ id: 'ej-cargo', nombre: 'Cargo verde', categoria: 'pantalon', zona: 'piernas', colores: ['#4D7C0F'], formalidad: 1 }),
  crear({ id: 'ej-short', nombre: 'Short beige', categoria: 'short', zona: 'piernas', colores: ['#D6C29A'], formalidad: 1, temporada: 'verano' }),
  crear({ id: 'ej-vestir', nombre: 'Pantalón de vestir', categoria: 'pantalon', zona: 'piernas', colores: ['#374151'], formalidad: 5 }),
  // Calzado
  crear({ id: 'ej-zapas', nombre: 'Zapatillas blancas', categoria: 'calzado', zona: 'pies', colores: ['#F5F5F5'] }),
  crear({ id: 'ej-botas', nombre: 'Botas marrones', categoria: 'calzado', zona: 'pies', colores: ['#7C4A23'], formalidad: 3, temporada: 'invierno' }),
  crear({ id: 'ej-mocasines', nombre: 'Mocasines', categoria: 'calzado', zona: 'pies', colores: ['#3F2A1D'], formalidad: 4 }),
  // Accesorios
  crear({ id: 'ej-collar', nombre: 'Collar', categoria: 'accesorio', zona: 'accesorio', colores: ['#FACC15'] }),
  crear({ id: 'ej-reloj', nombre: 'Reloj', categoria: 'accesorio', zona: 'accesorio', colores: ['#A1A1AA'] }),
  crear({ id: 'ej-lentes', nombre: 'Lentes de sol', categoria: 'accesorio', zona: 'accesorio', colores: ['#18181B'] }),
];
