// Hoja que se abre desde el "+" del armario. Por ahora solo muestra las dos opciones:
// sacar la foto y elegirla de la galería se conectan en el próximo PR.

import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Presionable } from '@/compartidos/componentes/presionable';
import { Texto } from '@/compartidos/componentes/texto';
import { espacio, radio, useColores } from '@/tema/tema';

const OPCIONES = [
  { emoji: '📸', titulo: 'Sacar una foto', descripcion: 'Con la prenda sobre la cama o colgada' },
  { emoji: '🖼️', titulo: 'Elegir de la galería', descripcion: 'Una foto que ya tengas' },
];

export default function AgregarPrendaPantalla() {
  const colores = useColores();

  return (
    <View style={[estilos.fondo, { backgroundColor: colores.fondo }]}>
      <Texto variante="subtitulo">Agregar prenda</Texto>
      {OPCIONES.map((opcion, i) => (
        <Animated.View key={opcion.titulo} entering={FadeInDown.delay(100 + i * 80).springify().damping(16)}>
          <Presionable
            disabled
            style={[estilos.opcion, { backgroundColor: colores.superficie, borderColor: colores.borde }]}>
            <Texto style={estilos.emoji}>{opcion.emoji}</Texto>
            <View style={estilos.textos}>
              <Texto>{opcion.titulo}</Texto>
              <Texto variante="chico" suave>
                {opcion.descripcion}
              </Texto>
            </View>
          </Presionable>
        </Animated.View>
      ))}
      <Texto variante="chico" suave>
        Muy pronto: la foto se recorta sola y le cargás categoría, color y temporada.
      </Texto>
    </View>
  );
}

const estilos = StyleSheet.create({
  fondo: { flex: 1, padding: espacio.l, gap: espacio.m },
  opcion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.m,
    padding: espacio.m,
    borderRadius: radio.m,
    borderWidth: StyleSheet.hairlineWidth,
  },
  emoji: { fontSize: 32, lineHeight: 40 },
  textos: { flex: 1, gap: 2 },
});
