import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { esProduccion, origenesPermitidos } from './config/entorno.js';
import { NoEncontradoError } from './errors/NoEncontradoError.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { limiteGeneral } from './middlewares/limite.middleware.js';

const app = express();

// Detrás del proxy del hosting, así req.ip es la IP real (la usa el límite de pedidos).
if (esProduccion()) app.set('trust proxy', 1);

app.use(helmet());

// La app nativa no manda origen y pasa. En la versión web, solo los sitios de CORS_ORIGENES.
app.use(cors({ origin: (origen, listo) => listo(null, !origen || origenesPermitidos().includes(origen)) }));
app.use(express.json());

// Para el hosting (sabe si el servidor anda). Va antes del límite: no cuenta.
app.get('/salud', (req, res) => {
  res.json({ estado: 'ok' });
});

app.use('/v1', limiteGeneral);

// Rutas de la API v1. Cada router declara su propia protección (sesión) en sus rutas,
// así no depende del orden en que se registran acá.
// app.use('/v1/prendas', prendaRouterV1);

app.use((req, res, next) => next(new NoEncontradoError('Esa ruta no existe.')));
app.use(errorMiddleware);

export default app;
