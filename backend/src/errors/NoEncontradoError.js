// Error base para "eso no existe". Cada entidad puede tener el suyo (ej. PrendaNoEncontradaError)
// extendiendo este. El nombre de la clase coincide con el del archivo.
export class NoEncontradoError extends Error {
  constructor(mensaje = 'No se encontró lo que buscabas.') {
    super(mensaje);
    this.name = 'NoEncontradoError';
    this.code = 404;
  }
}
