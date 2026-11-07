// Último middleware de app.js: toda excepción termina acá.
// - Errores propios (errors/): traen el status en .code y un mensaje pensado para el usuario.
// - JSON mal armado en el body: 400.
// - Choques con reglas de la base que se escaparon del service: 409 con un mensaje genérico.
// - Cualquier otra cosa: 500 sin detalles y se loguea en el servidor. Nunca se loguea el body.
const errorMiddleware = (err, req, res, next) => {
  if (Number.isInteger(err.code)) {
    return res.status(err.code).json({ message: err.message });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: 'El archivo es demasiado pesado.' });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'El cuerpo de la request no es un JSON válido.' });
  }
  if (err.code === 'P2002') {
    return res.status(409).json({ message: 'Ya existe un registro con esos datos.' });
  }

  console.error(`Error no controlado en ${req.method} ${req.originalUrl}:`, err);
  res.status(500).json({ message: 'Error interno del servidor' });
};

export { errorMiddleware };
