import { router } from 'expo-router';

import { EstadoVacio } from '@/compartidos/componentes/estado-vacio';
import { Pantalla } from '@/compartidos/componentes/pantalla';

export default function OutfitsPantalla() {
  return (
    <Pantalla titulo="Outfits" subtitulo="Tus combinaciones guardadas">
      <EstadoVacio
        emoji="✨"
        titulo="Todavía no armaste outfits"
        descripcion="Combiná prendas en el probador y guardá las que te gusten."
        textoAccion="Ir al probador"
        onAccion={() => router.navigate('/probador')}
      />
    </Pantalla>
  );
}
