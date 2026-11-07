// Tipos del dominio. Son los mismos datos que guarda el backend (backend/prisma/schema.prisma).

// Dónde va cada prenda en el maniquí. El orden importa: es el orden de las capas
// (lo que está más abajo en la lista se dibuja arriba de lo anterior).
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
  // Foto sin fondo (PNG con transparencia): es la capa que se dibuja en el maniquí.
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
