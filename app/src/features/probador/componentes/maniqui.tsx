// Maniquí 2D. Por ahora es una silueta hecha con formas y cada prenda se dibuja como una capa
// de color en su zona. Cuando haya fotos sin fondo, cada capa pasa a ser la imagen PNG de la
// prenda en la misma posición: la lógica de capas (dominio/probador.ts) no cambia.

import { useEffect } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';

import { ordenarCapas } from '@/dominio/probador';
import type { Prenda, Zona } from '@/dominio/tipos';
import { useColores } from '@/tema/tema';

const ANCHO = 220;
const ALTO = 420;

// Dónde cae cada zona sobre la silueta (en puntos, dentro de un lienzo de ANCHO × ALTO).
const POSICION_ZONA: Record<Zona, ViewStyle> = {
  cabeza: { top: 0, left: 75, width: 70, height: 40, borderRadius: 30 },
  torso: { top: 78, left: 50, width: 120, height: 140, borderRadius: 28 },
  abrigo: { top: 72, left: 38, width: 144, height: 160, borderRadius: 32 },
  piernas: { top: 205, left: 60, width: 100, height: 170, borderRadius: 18 },
  pies: { top: 372, left: 52, width: 116, height: 32, borderRadius: 14 },
  accesorio: { top: 66, left: 92, width: 36, height: 16, borderRadius: 8 },
};

type Props = { puestas: Prenda[] };

export function Maniqui({ puestas }: Props) {
  const colores = useColores();
  const respirar = useSharedValue(1);

  // Una "respiración" muy sutil para que el maniquí no se sienta estático.
  useEffect(() => {
    respirar.set(withRepeat(
      withSequence(withTiming(1.015, { duration: 2200 }), withTiming(1, { duration: 2200 })),
      -1,
    ));
  }, [respirar]);

  const estiloRespirar = useAnimatedStyle(() => ({ transform: [{ scale: respirar.value }] }));
  const silueta = { backgroundColor: colores.superficieAlta };
  const capas = ordenarCapas(puestas);
  // Los accesorios se apilan uno debajo del otro para que se vean todos.
  const accesoriosAntes = (indice: number) => capas.slice(0, indice).filter((p) => p.zona === 'accesorio').length;

  return (
    <Animated.View style={[estilos.lienzo, estiloRespirar]}>
      {/* Silueta */}
      <View style={[estilos.parte, silueta, { top: 4, left: 82, width: 56, height: 64, borderRadius: 28 }]} />
      <View style={[estilos.parte, silueta, { top: 64, left: 100, width: 20, height: 18 }]} />
      <View style={[estilos.parte, silueta, { top: 80, left: 54, width: 112, height: 136, borderRadius: 26 }]} />
      <View style={[estilos.parte, silueta, { top: 88, left: 28, width: 24, height: 130, borderRadius: 12 }]} />
      <View style={[estilos.parte, silueta, { top: 88, left: 168, width: 24, height: 130, borderRadius: 12 }]} />
      <View style={[estilos.parte, silueta, { top: 210, left: 64, width: 42, height: 165, borderRadius: 16 }]} />
      <View style={[estilos.parte, silueta, { top: 210, left: 114, width: 42, height: 165, borderRadius: 16 }]} />

      {/* Prendas puestas, de abajo hacia arriba */}
      {capas.map((prenda, indice) => (
        <Animated.View
          key={prenda.id}
          entering={ZoomIn.springify().damping(14)}
          exiting={FadeOut.duration(180)}
          style={[
            estilos.parte,
            POSICION_ZONA[prenda.zona],
            prenda.zona === 'accesorio' && { top: 66 + accesoriosAntes(indice) * 20 },
            { backgroundColor: prenda.colores[0] ?? colores.acento },
          ]}
        />
      ))}
    </Animated.View>
  );
}

const estilos = StyleSheet.create({
  lienzo: { width: ANCHO, height: ALTO, alignSelf: 'center' },
  parte: { position: 'absolute' },
});
