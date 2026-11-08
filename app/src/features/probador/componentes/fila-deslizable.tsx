// Una fila del probador. La prenda sigue al dedo con un poco de inclinación; si la soltás pasado
// cierto punto (o con un movimiento rápido), cambia a la siguiente y la nueva entra desde ese
// costado con un resorte. Si no, vuelve a su lugar. Las flechas hacen lo mismo con un toque.

import { StyleSheet, View } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, {
  FadeOut,
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  ZoomIn,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { Presionable } from '@/compartidos/componentes/presionable';
import { Texto } from '@/compartidos/componentes/texto';
import type { Fila } from '@/dominio/probador';
import type { Prenda } from '@/dominio/tipos';
import { resorte, useColores } from '@/tema/tema';

import { TAMANIO_FILA, TarjetaPrenda } from './tarjeta-prenda';

// Cómo entró la prenda actual: deslizando hacia un lado, o todas juntas con "mezclar".
export type Entrada = 'desde-derecha' | 'desde-izquierda' | 'mezcla';

const UMBRAL = 60; // puntos que hay que arrastrar para cambiar de prenda
const VELOCIDAD = 600; // o un movimiento rápido, aunque sea corto

type Props = {
  fila: Fila;
  prenda: Prenda | null;
  cantidad: number; // cuántas opciones tiene la fila (para saber si se puede deslizar)
  entrada: Entrada;
  orden: number; // posición de la fila, para escalonar la animación de "mezclar"
  onCambiar: (fila: Fila, paso: 1 | -1) => void;
};

export function FilaDeslizable({ fila, prenda, cantidad, entrada, orden, onCambiar }: Props) {
  const colores = useColores();
  const desplazamiento = useSharedValue(0);
  const sePuedeCambiar = cantidad > 1;
  const { alto } = TAMANIO_FILA[fila];

  const gesto = usePanGesture({
    enabled: sePuedeCambiar,
    // Solo se activa con movimiento horizontal: así no pelea con el scroll vertical.
    activeOffsetX: [-12, 12],
    failOffsetY: [-14, 14],
    onUpdate: (e) => {
      desplazamiento.set(e.translationX);
    },
    onDeactivate: (e) => {
      const pasaElUmbral = Math.abs(e.translationX) > UMBRAL || Math.abs(e.velocityX) > VELOCIDAD;
      if (pasaElUmbral) {
        // Deslizar hacia la izquierda trae la siguiente (como pasar páginas).
        scheduleOnRN(onCambiar, fila, e.translationX < 0 ? 1 : -1);
        desplazamiento.set(0);
      } else {
        desplazamiento.set(withSpring(0, resorte.suave));
      }
    },
  });

  const estiloArrastre = useAnimatedStyle(() => ({
    transform: [
      { translateX: desplazamiento.value },
      { rotate: `${desplazamiento.value / 25}deg` },
      { scale: 1 - Math.min(Math.abs(desplazamiento.value) / 1500, 0.06) },
    ],
  }));

  const animacionEntrada =
    entrada === 'mezcla'
      ? ZoomIn.delay(orden * 70).springify().damping(13)
      : entrada === 'desde-derecha'
        ? SlideInRight.springify().damping(17).stiffness(170)
        : SlideInLeft.springify().damping(17).stiffness(170);

  return (
    <View style={[estilos.fila, { minHeight: prenda ? alto : 64 }]}>
      {sePuedeCambiar && (
        <Flecha texto="‹" etiqueta={`Anterior (${fila})`} onPress={() => onCambiar(fila, -1)} color={colores.textoSuave} />
      )}
      <GestureDetector gesture={gesto}>
        <Animated.View style={estiloArrastre}>
          {/* La key hace que, al cambiar de prenda, la vieja salga y la nueva entre animada. */}
          <Animated.View
            key={prenda?.id ?? `sin-${fila}`}
            entering={animacionEntrada}
            exiting={FadeOut.duration(120)}>
            <TarjetaPrenda prenda={prenda} fila={fila} />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
      {sePuedeCambiar && (
        <Flecha texto="›" etiqueta={`Siguiente (${fila})`} onPress={() => onCambiar(fila, 1)} color={colores.textoSuave} />
      )}
    </View>
  );
}

function Flecha({ texto, etiqueta, onPress, color }: { texto: string; etiqueta: string; onPress: () => void; color: string }) {
  return (
    <Presionable onPress={onPress} accessibilityLabel={etiqueta} escala={0.85} style={estilos.flecha}>
      <Texto variante="subtitulo" style={{ color }}>
        {texto}
      </Texto>
    </Presionable>
  );
}

const estilos = StyleSheet.create({
  fila: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 },
  flecha: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});
