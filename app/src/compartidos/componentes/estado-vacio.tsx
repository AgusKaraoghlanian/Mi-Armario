// Lo que se ve cuando una lista no tiene nada todavía. Siempre con una acción para salir
// del vacío (ej. "Agregar prenda"), no solo un texto.

import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

import { espacio, radio, useColores } from '@/tema/tema';

import { Presionable } from './presionable';
import { Texto } from './texto';

type Props = {
  emoji: string;
  titulo: string;
  descripcion: string;
  textoAccion?: string;
  onAccion?: () => void;
};

export function EstadoVacio({ emoji, titulo, descripcion, textoAccion, onAccion }: Props) {
  const colores = useColores();
  const flotar = useSharedValue(0);

  useEffect(() => {
    flotar.set(withRepeat(
      withSequence(withTiming(-8, { duration: 1400 }), withTiming(0, { duration: 1400 })),
      -1,
    ));
  }, [flotar]);

  const estiloEmoji = useAnimatedStyle(() => ({ transform: [{ translateY: flotar.value }] }));

  return (
    <Animated.View
      entering={FadeIn.delay(150).duration(500)}
      style={[estilos.caja, { backgroundColor: colores.superficie, borderColor: colores.borde }]}>
      <Animated.Text style={[estilos.emoji, estiloEmoji]}>{emoji}</Animated.Text>
      <View style={estilos.textos}>
        <Texto variante="subtitulo" style={estilos.centrado}>
          {titulo}
        </Texto>
        <Texto suave style={estilos.centrado}>
          {descripcion}
        </Texto>
      </View>
      {textoAccion && onAccion && (
        <Presionable onPress={onAccion} style={[estilos.boton, { backgroundColor: colores.acento }]}>
          <Texto style={{ color: colores.sobreAcento }}>{textoAccion}</Texto>
        </Presionable>
      )}
    </Animated.View>
  );
}

const estilos = StyleSheet.create({
  caja: {
    alignItems: 'center',
    gap: espacio.m,
    padding: espacio.xl,
    borderRadius: radio.l,
    borderWidth: StyleSheet.hairlineWidth,
  },
  emoji: { fontSize: 56 },
  textos: { gap: espacio.s },
  centrado: { textAlign: 'center' },
  boton: { paddingVertical: 14, paddingHorizontal: espacio.l, borderRadius: radio.total },
});
