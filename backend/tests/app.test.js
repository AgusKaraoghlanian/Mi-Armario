import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import app from '../src/app.js';

describe('app', () => {
  it('GET /salud responde ok', async () => {
    const res = await request(app).get('/salud');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ estado: 'ok' });
  });

  it('una ruta que no existe da 404 con mensaje en español', async () => {
    const res = await request(app).get('/v1/no-existe');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Esa ruta no existe.' });
  });

  it('un JSON mal armado da 400 sin detalles internos', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await request(app).post('/v1/algo').set('Content-Type', 'application/json').send('{mal');
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/JSON válido/);
  });

  it('no deja llamar desde un sitio que no está en CORS_ORIGENES', async () => {
    const res = await request(app).get('/salud').set('Origin', 'https://sitio-malo.com');
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('no muestra que es Express', async () => {
    const res = await request(app).get('/salud');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});
