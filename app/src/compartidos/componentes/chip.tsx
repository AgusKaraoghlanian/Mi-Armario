// Chip seleccionable (filtros, prendas en el probador). Cambia de color con una transición.

import { StyleSheet, View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import { espacio, radio, useColores } from '@/tema/tema';

import { Presionable } from './presionable';
import { Texto } from './texto';

type Props = {
  texto: string;
  activo: boolean;
  onPress: () => void;
  colorMuestra?: string;
};

export function Chip({ texto, activo, onPress, colorMuestra }: Props) {
  const colores = useColores();
  const progreso = useDerivedValue(() => withTiming(activo ? 1 : 0, { duration: 220 }));

  const estiloFondo = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progreso.value, [0, 1], [colores.superficie, colores.acento]),
    borderColor: interpolateColor(progreso.value, [0, 1], [colores.borde, colores.acento]),
  }));

  return (
    <Presionable onPress={onPress} accessibilityState={{ selected: activo }}>
      <Animated.View style={[estilos.chip, estiloFondo]}>
        {colorMuestra && <View style={[estilos.muestra, { backgroundColor: colorMuestra }]} />}
        <Texto variante="chico" style={{ color: activo ? colores.sobreAcento : colores.texto }}>
          {texto}
        </Texto>
      </Animated.View>
    </Presionable>
  );
}

const estilos = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.s,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radio.total,
    borderWidth: StyleSheet.hairlineWidth,
  },
  muestra: { width: 12, height: 12, borderRadius: 6 },
});
