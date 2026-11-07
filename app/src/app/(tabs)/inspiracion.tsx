import { EstadoVacio } from '@/compartidos/componentes/estado-vacio';
import { Pantalla } from '@/compartidos/componentes/pantalla';

export default function InspiracionPantalla() {
  return (
    <Pantalla titulo="Inspiración" subtitulo="Looks que te gustaron">
      <EstadoVacio
        emoji="📌"
        titulo="Guardá tus referencias"
        descripcion="Fotos de Pinterest o Instagram, para después armar algo parecido con tu ropa."
      />
    </Pantalla>
  );
}
