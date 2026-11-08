import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Chip } from '@/compartidos/componentes/chip';
import { EstadoVacio } from '@/compartidos/componentes/estado-vacio';
import { Pantalla } from '@/compartidos/componentes/pantalla';
import { Presionable } from '@/compartidos/componentes/presionable';
import { Texto } from '@/compartidos/componentes/texto';
import { espacio, radio, useColores } from '@/tema/tema';

const FILTROS = ['Todo', 'Arriba', 'Abajo', 'Calzado', 'Abrigos', 'Accesorios'] as const;

export default function ArmarioPantalla() {
  const colores = useColores();
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>('Todo');
  const irAAgregar = () => router.push('/agregar-prenda');

  return (
    <Pantalla
      titulo="Mi armario"
      subtitulo="Todo lo que tenés, en un solo lugar"
      accion={
        <Presionable
          onPress={irAAgregar}
          accessibilityLabel="Agregar prenda"
          style={[estilos.botonMas, { backgroundColor: colores.acento }]}>
          <Texto variante="subtitulo" style={{ color: colores.sobreAcento }}>
            +
          </Texto>
        </Presionable>
      }>
      <Animated.View entering={FadeInDown.delay(80).springify().damping(18)}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilos.filtros}>
          {FILTROS.map((f) => (
            <Chip key={f} texto={f} activo={filtro === f} onPress={() => setFiltro(f)} />
          ))}
        </ScrollView>
      </Animated.View>

      <EstadoVacio
        emoji="👕"
        titulo="Tu armario está vacío"
        descripcion="Sacale una foto a una prenda y la sumamos. El fondo se quita solo."
        textoAccion="Agregar mi primera prenda"
        onAccion={irAAgregar}
      />
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  filtros: { gap: espacio.s },
  botonMas: { width: 48, height: 48, borderRadius: radio.total, alignItems: 'center', justifyContent: 'center' },
});
