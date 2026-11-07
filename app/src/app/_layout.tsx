import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColores } from '@/tema/tema';

export default function RaizLayout() {
  const esquema = useColorScheme();
  const colores = useColores();
  const base = esquema === 'light' ? DefaultTheme : DarkTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider
        value={{
          ...base,
          colors: { ...base.colors, background: colores.fondo, card: colores.superficie, primary: colores.acento },
        }}>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="agregar-prenda"
            options={{ presentation: 'formSheet', sheetAllowedDetents: [0.6, 1], sheetGrabberVisible: true }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
