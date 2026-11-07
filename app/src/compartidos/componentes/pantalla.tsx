// Contenedor de cada pantalla: fondo, márgenes seguros (notch, barra de tabs) y el título
// grande que entra con una animación.

import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { espacio, useColores } from '@/tema/tema';

import { Texto } from './texto';

type Props = {
  titulo: string;
  subtitulo?: string;
  accion?: ReactNode;
  children: ReactNode;
  // Pantallas como el probador no scrollean: ocupan todo el alto.
  scroll?: boolean;
};

export function Pantalla({ titulo, subtitulo, accion, children, scroll = true }: Props) {
  const colores = useColores();
  const encabezado = (
    <Animated.View entering={FadeInDown.springify().damping(18)} style={estilos.encabezado}>
      <View style={estilos.textos}>
        <Texto variante="titulo">{titulo}</Texto>
        {subtitulo && <Texto suave>{subtitulo}</Texto>}
      </View>
      {accion}
    </Animated.View>
  );

  return (
    <SafeAreaView edges={['top']} style={[estilos.fondo, { backgroundColor: colores.fondo }]}>
      {scroll ? (
        <ScrollView style={estilos.fondo} contentContainerStyle={estilos.contenido}>
          {encabezado}
          {children}
        </ScrollView>
      ) : (
        <View style={[estilos.fondo, estilos.contenido]}>
          {encabezado}
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  fondo: { flex: 1 },
  contenido: { paddingHorizontal: espacio.m, paddingBottom: 120, gap: espacio.l },
  encabezado: { flexDirection: 'row', alignItems: 'flex-end', gap: espacio.m, paddingTop: espacio.m },
  textos: { flex: 1, gap: espacio.xs },
});
