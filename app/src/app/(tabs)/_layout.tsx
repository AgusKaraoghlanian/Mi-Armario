// Barra de tabs nativa (la de iOS y la de Android, con sus animaciones propias).
// En web se usa _layout.web.tsx.

import { NativeTabs } from 'expo-router/native-tabs';

import { useColores } from '@/tema/tema';

export default function TabsLayout() {
  const colores = useColores();

  return (
    <NativeTabs
      backgroundColor={colores.superficie}
      indicatorColor={colores.superficieAlta}
      tintColor={colores.acento}
      labelStyle={{ selected: { color: colores.acento } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Armario</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'cabinet', selected: 'cabinet.fill' }} md="checkroom" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="probador">
        <NativeTabs.Trigger.Label>Probador</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'figure.stand', selected: 'figure.stand' }} md="accessibility_new" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="outfits">
        <NativeTabs.Trigger.Label>Outfits</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'square.grid.2x2', selected: 'square.grid.2x2.fill' }} md="grid_view" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="inspiracion">
        <NativeTabs.Trigger.Label>Inspiración</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'sparkles', selected: 'sparkles' }} md="auto_awesome" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
