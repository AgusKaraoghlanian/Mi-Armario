// En web no hay tabs nativas: una barra flotante abajo, con las mismas cuatro secciones.

import { Tabs, TabList, TabSlot, TabTrigger, type TabListProps, type TabTriggerSlotProps } from 'expo-router/ui';
import { StyleSheet, View } from 'react-native';

import { Presionable } from '@/compartidos/componentes/presionable';
import { Texto } from '@/compartidos/componentes/texto';
import { espacio, radio, useColores } from '@/tema/tema';

function BotonTab({ children, isFocused, ...resto }: TabTriggerSlotProps) {
  const colores = useColores();
  return (
    <Presionable
      {...resto}
      style={[estilos.boton, isFocused && { backgroundColor: colores.acento }]}>
      <Texto variante="chico" style={{ color: isFocused ? colores.sobreAcento : colores.textoSuave }}>
        {children}
      </Texto>
    </Presionable>
  );
}

function BarraTabs({ children, ...resto }: TabListProps) {
  const colores = useColores();
  return (
    <View {...resto} style={estilos.contenedor}>
      <View style={[estilos.barra, { backgroundColor: colores.superficie, borderColor: colores.borde }]}>
        {children}
      </View>
    </View>
  );
}

export default function TabsLayoutWeb() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />
      <TabList asChild>
        <BarraTabs>
          {/* Escritos uno por uno (sin .map): expo-router los lee del JSX para armar las rutas. */}
          <TabTrigger name="armario" href="/" asChild>
            <BotonTab>Armario</BotonTab>
          </TabTrigger>
          <TabTrigger name="probador" href="/probador" asChild>
            <BotonTab>Probador</BotonTab>
          </TabTrigger>
          <TabTrigger name="outfits" href="/outfits" asChild>
            <BotonTab>Outfits</BotonTab>
          </TabTrigger>
          <TabTrigger name="inspiracion" href="/inspiracion" asChild>
            <BotonTab>Inspiración</BotonTab>
          </TabTrigger>
        </BarraTabs>
      </TabList>
    </Tabs>
  );
}

const estilos = StyleSheet.create({
  contenedor: { position: 'absolute', bottom: espacio.m, left: 0, right: 0, alignItems: 'center' },
  barra: {
    flexDirection: 'row',
    gap: espacio.xs,
    padding: espacio.xs,
    borderRadius: radio.total,
    borderWidth: StyleSheet.hairlineWidth,
  },
  boton: { paddingVertical: 10, paddingHorizontal: espacio.m, borderRadius: radio.total },
});
