// Tokens de diseño. Todo color, espacio y radio de la app sale de acá: si se cambia el look,
// se cambia en un solo lugar. Primera versión: se va a ir ajustando mientras armamos las pantallas.

import { useColorScheme } from 'react-native';

const paleta = {
  oscuro: {
    fondo: '#0A0A0F',
    superficie: '#15151D',
    superficieAlta: '#1F1F2A',
    borde: '#2A2A38',
    texto: '#F5F5FA',
    textoSuave: '#9A9AB0',
    acento: '#8B5CF6',
    acentoFuerte: '#7C3AED',
    acentoCalido: '#F472B6',
    sobreAcento: '#FFFFFF',
  },
  claro: {
    fondo: '#F7F7FB',
    superficie: '#FFFFFF',
    superficieAlta: '#EFEFF6',
    borde: '#E2E2EC',
    texto: '#14141C',
    textoSuave: '#6B6B80',
    acento: '#7C3AED',
    acentoFuerte: '#6D28D9',
    acentoCalido: '#DB2777',
    sobreAcento: '#FFFFFF',
  },
} as const;

export type Colores = { [K in keyof typeof paleta.oscuro]: string };

export const espacio = { xs: 4, s: 8, m: 16, l: 24, xl: 32, xxl: 48 } as const;
export const radio = { s: 10, m: 16, l: 24, total: 999 } as const;

export const tipografia = {
  titulo: { fontSize: 34, lineHeight: 40, fontWeight: '800' as const, letterSpacing: -0.8 },
  subtitulo: { fontSize: 20, lineHeight: 26, fontWeight: '700' as const, letterSpacing: -0.3 },
  cuerpo: { fontSize: 16, lineHeight: 22, fontWeight: '500' as const },
  chico: { fontSize: 13, lineHeight: 18, fontWeight: '600' as const },
};

// Resortes de las animaciones: mismos valores en toda la app para que se sientan parejas.
export const resorte = {
  suave: { damping: 18, stiffness: 180 },
  rapido: { damping: 14, stiffness: 320 },
};

export const useColores = (): Colores => {
  const esquema = useColorScheme();
  return esquema === 'light' ? paleta.claro : paleta.oscuro;
};
