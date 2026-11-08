// Tipos del dominio. Son los mismos datos que guarda el backend (backend/prisma/schema.prisma).

// En qué fila del probador va cada prenda (las filas y su orden están en dominio/probador.ts).
export const ZONAS = ['piernas', 'pies', 'torso', 'abrigo', 'cabeza', 'accesorio'] as const;
export type Zona = (typeof ZONAS)[number];

export const CATEGORIAS = [
  'remera',
  'camisa',
  'buzo',
  'campera',
  'pantalon',
  'short',
  'pollera',
  'vestido',
  'calzado',
  'gorro',
  'accesorio',
] as const;
export type Categoria = (typeof CATEGORIAS)[number];

export type Temporada = 'verano' | 'invierno' | 'media' | 'todas';

export type Prenda = {
  id: string;
  nombre: string;
  categoria: Categoria;
  zona: Zona;
  // Foto sin fondo (PNG con transparencia): es lo que se ve en el probador.
  fotoUri: string | null;
  colores: string[];
  temporada: Temporada;
  // 1 = muy informal, 5 = muy formal. Lo usan los consejos.
  formalidad: 1 | 2 | 3 | 4 | 5;
  creadaEn: string;
};

export type Outfit = {
  id: string;
  nombre: string;
  prendaIds: string[];
  favorito: boolean;
  creadoEn: string;
};
