// Botón base de la app: se achica un poco al tocarlo y vuelve con un resorte.
// Todas las cosas tocables lo usan, así la sensación es la misma en toda la app.

import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { resorte } from '@/tema/tema';

const PressableAnimado = Animated.createAnimatedComponent(Pressable);

type Props = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
  escala?: number;
};

export function Presionable({ style, escala = 0.96, onPressIn, onPressOut, ...resto }: Props) {
  const tamanio = useSharedValue(1);
  const estilo = useAnimatedStyle(() => ({ transform: [{ scale: tamanio.value }] }));

  return (
    <PressableAnimado
      accessibilityRole="button"
      onPressIn={(e) => {
        tamanio.set(withSpring(escala, resorte.rapido));
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        tamanio.set(withSpring(1, resorte.rapido));
        onPressOut?.(e);
      }}
      style={[style, estilo]}
      {...resto}
    />
  );
}
