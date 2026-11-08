// TEMPORAL: prendas de mentira para probar el maniquí mientras no se pueden cargar prendas
// reales. Se borra cuando el probador lea el armario guardado.

import type { Prenda } from '@/dominio/tipos';

const base = { fotoUri: null, temporada: 'todas', formalidad: 2, creadaEn: '2026-11-07T00:00:00.000Z' } as const;

export const PRENDAS_DE_EJEMPLO: Prenda[] = [
  { ...base, id: 'ej-remera', nombre: 'Remera blanca', categoria: 'remera', zona: 'torso', colores: ['#E8E8F0'] },
  { ...base, id: 'ej-camisa', nombre: 'Camisa azul', categoria: 'camisa', zona: 'torso', colores: ['#3B82F6'] },
  { ...base, id: 'ej-campera', nombre: 'Campera negra', categoria: 'campera', zona: 'abrigo', colores: ['#27272A'] },
  { ...base, id: 'ej-jean', nombre: 'Jean', categoria: 'pantalon', zona: 'piernas', colores: ['#1E3A8A'] },
  { ...base, id: 'ej-cargo', nombre: 'Cargo verde', categoria: 'pantalon', zona: 'piernas', colores: ['#4D7C0F'] },
  { ...base, id: 'ej-zapas', nombre: 'Zapatillas', categoria: 'calzado', zona: 'pies', colores: ['#F5F5F5'] },
  { ...base, id: 'ej-gorra', nombre: 'Gorra', categoria: 'gorro', zona: 'cabeza', colores: ['#DC2626'] },
  { ...base, id: 'ej-collar', nombre: 'Collar', categoria: 'accesorio', zona: 'accesorio', colores: ['#FACC15'] },
];
