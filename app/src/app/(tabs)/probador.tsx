import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  FadeInUp,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Chip } from '@/compartidos/componentes/chip';
import { Pantalla } from '@/compartidos/componentes/pantalla';
import { Presionable } from '@/compartidos/componentes/presionable';
import { Texto } from '@/compartidos/componentes/texto';
import {
  alternarAccesorio,
  FILAS,
  mezclar,
  moverEnFila,
  opcionesDeFila,
  type Fila,
  type Seleccion,
} from '@/dominio/probador';
import { FilaDeslizable, type Entrada } from '@/features/probador/componentes/fila-deslizable';
import { PRENDAS_DE_EJEMPLO } from '@/features/probador/prendas-de-ejemplo';
import { espacio, radio, resorte, useColores } from '@/tema/tema';

const PRENDAS = PRENDAS_DE_EJEMPLO;
const ACCESORIOS = PRENDAS.filter((p) => p.zona === 'accesorio');

// Arranca con un outfit básico: lo primero de cada fila obligatoria.
const SELECCION_INICIAL: Seleccion = {
  cabeza: null,
  abrigo: null,
  torso: opcionesDeFila(PRENDAS, 'torso')[0]?.id ?? null,
  piernas: opcionesDeFila(PRENDAS, 'piernas')[0]?.id ?? null,
  pies: opcionesDeFila(PRENDAS, 'pies')[0]?.id ?? null,
};

type Entradas = Record<Fila, Entrada>;
const ENTRADAS_INICIALES = Object.fromEntries(FILAS.map((f) => [f, 'mezcla'])) as Entradas;

export default function ProbadorPantalla() {
  const colores = useColores();
  const [seleccion, setSeleccion] = useState<Seleccion>(SELECCION_INICIAL);
  const [entradas, setEntradas] = useState<Entradas>(ENTRADAS_INICIALES);
  const [accesorios, setAccesorios] = useState<string[]>([]);
  const giro = useSharedValue(0);

  const cambiarFila = (fila: Fila, paso: 1 | -1) => {
    setEntradas((actuales) => ({ ...actuales, [fila]: paso === 1 ? 'desde-derecha' : 'desde-izquierda' }));
    setSeleccion((actual) => moverEnFila(PRENDAS, actual, fila, paso));
  };

  const mezclarTodo = () => {
    giro.set(withSpring(giro.get() + 360, resorte.suave));
    setEntradas(ENTRADAS_INICIALES);
    setSeleccion(mezclar(PRENDAS));
  };

  const estiloGiro = useAnimatedStyle(() => ({ transform: [{ rotate: `${giro.value}deg` }] }));

  return (
    <Pantalla
      titulo="Probador"
      subtitulo="Deslizá cada prenda para cambiarla"
      scroll={false}
      accion={
        <Presionable
          onPress={mezclarTodo}
          accessibilityLabel="Mezclar outfit"
          style={[estilos.botonMezclar, { backgroundColor: colores.acento }]}>
          <Animated.Text style={[estilos.iconoMezclar, estiloGiro]}>🔀</Animated.Text>
          <Texto variante="chico" style={{ color: colores.sobreAcento }}>
            Mezclar
          </Texto>
        </Presionable>
      }>
      <ScrollView contentContainerStyle={estilos.columna} showsVerticalScrollIndicator={false}>
        {FILAS.map((fila, orden) => {
          const opciones = opcionesDeFila(PRENDAS, fila);
          const prenda = PRENDAS.find((p) => p.id === seleccion[fila]) ?? null;
          return (
            <Animated.View key={fila} layout={LinearTransition.springify().damping(18)}>
              <FilaDeslizable
                fila={fila}
                prenda={prenda}
                cantidad={opciones.length}
                entrada={entradas[fila]}
                orden={orden}
                onCambiar={cambiarFila}
              />
            </Animated.View>
          );
        })}

        <Animated.View entering={FadeInUp.delay(200).springify().damping(18)} style={estilos.accesorios}>
          <Texto variante="chico" suave>
            Accesorios
          </Texto>
          <View style={estilos.chips}>
            {ACCESORIOS.map((a) => (
              <Chip
                key={a.id}
                texto={a.nombre}
                colorMuestra={a.colores[0]}
                activo={accesorios.includes(a.id)}
                onPress={() => setAccesorios((actuales) => alternarAccesorio(actuales, a.id))}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  columna: { alignItems: 'center', gap: espacio.s, paddingBottom: 120 },
  accesorios: { alignItems: 'center', gap: espacio.s, marginTop: espacio.m },
  chips: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: espacio.s },
  botonMezclar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.xs,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radio.total,
  },
  iconoMezclar: { fontSize: 16 },
});
