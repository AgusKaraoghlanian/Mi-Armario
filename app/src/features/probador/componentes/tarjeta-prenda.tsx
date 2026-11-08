// Cómo se ve una prenda en el probador. Con foto (sin fondo) se muestra la foto; mientras no
// haya fotos, una tarjeta del color de la prenda con un ícono.

import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Texto } from '@/compartidos/componentes/texto';
import type { Fila } from '@/dominio/probador';
import type { Categoria, Prenda } from '@/dominio/tipos';
import { radio, useColores } from '@/tema/tema';

// Tamaño de cada fila, para que las prendas se vean en proporción (una gorra es más chica
// que un pantalón).
export const TAMANIO_FILA: Record<Fila, { ancho: number; alto: number }> = {
  cabeza: { ancho: 96, alto: 64 },
  abrigo: { ancho: 120, alto: 150 },
  torso: { ancho: 150, alto: 150 },
  piernas: { ancho: 130, alto: 180 },
  pies: { ancho: 150, alto: 64 },
};

const ICONO: Record<Categoria, string> = {
  remera: '👕',
  camisa: '👔',
  buzo: '🧶',
  campera: '🧥',
  pantalon: '👖',
  short: '🩳',
  pollera: '👗',
  vestido: '👗',
  calzado: '👟',
  gorro: '🧢',
  accesorio: '💍',
};

const NOMBRE_FILA: Record<Fila, string> = {
  cabeza: 'gorra',
  abrigo: 'abrigo',
  torso: 'parte de arriba',
  piernas: 'parte de abajo',
  pies: 'calzado',
};

type Props = { prenda: Prenda | null; fila: Fila };

export function TarjetaPrenda({ prenda, fila }: Props) {
  const colores = useColores();
  const { ancho, alto } = TAMANIO_FILA[fila];

  if (!prenda) {
    return (
      <View style={[estilos.vacia, { width: ancho, height: Math.min(alto, 64), borderColor: colores.borde }]}>
        <Texto variante="chico" suave style={estilos.centrado}>
          Sin {NOMBRE_FILA[fila]}
        </Texto>
      </View>
    );
  }

  if (prenda.fotoUri) {
    return (
      <Image
        source={{ uri: prenda.fotoUri }}
        style={{ width: ancho, height: alto }}
        contentFit="contain"
        accessibilityLabel={prenda.nombre}
      />
    );
  }

  return (
    <View
      accessibilityLabel={prenda.nombre}
      style={[estilos.tarjeta, { width: ancho, height: alto, backgroundColor: prenda.colores[0] ?? colores.acento }]}>
      <Text style={{ fontSize: Math.min(alto, ancho) * 0.42 }}>{ICONO[prenda.categoria]}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    borderRadius: radio.m,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  vacia: {
    borderRadius: radio.m,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  centrado: { textAlign: 'center' },
});
