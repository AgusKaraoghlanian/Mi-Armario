import rateLimit from 'express-rate-limit';

// Límite general por IP para toda la API. Los de login y registro (más estrictos) se suman
// cuando exista la autenticación.
const limiteGeneral = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Demasiados pedidos. Probá de nuevo en unos minutos.' },
});

export { limiteGeneral };
