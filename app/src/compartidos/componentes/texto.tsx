import { Text, type TextProps } from 'react-native';

import { tipografia, useColores } from '@/tema/tema';

type Props = TextProps & {
  variante?: keyof typeof tipografia;
  suave?: boolean;
};

export function Texto({ variante = 'cuerpo', suave = false, style, ...resto }: Props) {
  const colores = useColores();
  return (
    <Text style={[tipografia[variante], { color: suave ? colores.textoSuave : colores.texto }, style]} {...resto} />
  );
}
