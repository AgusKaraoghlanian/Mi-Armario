import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { Chip } from '@/compartidos/componentes/chip';
import { Pantalla } from '@/compartidos/componentes/pantalla';
import { alternarPrenda } from '@/dominio/probador';
import type { Prenda } from '@/dominio/tipos';
import { Maniqui } from '@/features/probador/componentes/maniqui';
import { PRENDAS_DE_EJEMPLO } from '@/features/probador/prendas-de-ejemplo';
import { espacio } from '@/tema/tema';

export default function ProbadorPantalla() {
  const [puestas, setPuestas] = useState<Prenda[]>([]);

  return (
    <Pantalla titulo="Probador" subtitulo="Tocá una prenda para ponértela o sacártela" scroll={false}>
      <View style={estilos.centro}>
        <Maniqui puestas={puestas} />
      </View>

      <Animated.View entering={FadeInUp.delay(120).springify().damping(18)}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilos.prendas}>
          {PRENDAS_DE_EJEMPLO.map((prenda) => (
            <Chip
              key={prenda.id}
              texto={prenda.nombre}
              colorMuestra={prenda.colores[0]}
              activo={puestas.some((p) => p.id === prenda.id)}
              onPress={() => setPuestas((actuales) => alternarPrenda(actuales, prenda))}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  centro: { flex: 1, justifyContent: 'center' },
  prendas: { gap: espacio.s, paddingBottom: 90 },
});
