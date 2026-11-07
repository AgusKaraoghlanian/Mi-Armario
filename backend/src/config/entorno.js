// Variables de entorno del backend, validadas al arrancar (server.js). Si falta algo
// obligatorio el servidor no levanta y dice qué falta, en vez de fallar recién en el
// primer request que la use.

const esProduccion = () => process.env.NODE_ENV === 'production';

// La app (Expo) no manda origen: CORS solo importa para la versión web.
// En desarrollo, sin configurar, se acepta el servidor web de Expo.
const ORIGENES_DE_DESARROLLO = ['http://localhost:8081'];

// CORS_ORIGENES: lista separada por comas, ej. "https://miarmario.app,https://www.miarmario.app".
const origenesPermitidos = () => {
  const lista = (process.env.CORS_ORIGENES ?? '')
    .split(',')
    .map((origen) => origen.trim().replace(/\/+$/, ''))
    .filter(Boolean);
  if (lista.length > 0) return lista;
  return esProduccion() ? [] : ORIGENES_DE_DESARROLLO;
};

const validarEntorno = () => {
  const problemas = [];
  const avisos = [];

  if (!process.env.DATABASE_URL) problemas.push('DATABASE_URL falta');

  const secreto = process.env.JWT_SECRET ?? '';
  if (!secreto) {
    problemas.push('JWT_SECRET falta');
  } else if (secreto.length < 32) {
    // Un secreto corto se puede adivinar, y con él cualquiera arma sesiones.
    (esProduccion() ? problemas : avisos).push('JWT_SECRET tiene menos de 32 caracteres: usá uno largo y al azar');
  }

  if (esProduccion() && !process.env.CORS_ORIGENES) {
    problemas.push('CORS_ORIGENES falta: la URL de la versión web');
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    avisos.push('SUPABASE_URL o SUPABASE_SERVICE_KEY faltan: no se van a poder subir fotos de prendas');
  }

  avisos.forEach((aviso) => console.warn(`Aviso: ${aviso}`));
  if (problemas.length > 0) {
    throw new Error(`Revisá las variables de entorno del backend:\n  - ${problemas.join('\n  - ')}`);
  }
};

export { esProduccion, origenesPermitidos, validarEntorno };
