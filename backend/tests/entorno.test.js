import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { origenesPermitidos, validarEntorno } from '../src/config/entorno.js';

const SECRETO_LARGO = 'x'.repeat(48);
const original = { ...process.env };

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  process.env.DATABASE_URL = 'postgresql://prueba';
  process.env.JWT_SECRET = SECRETO_LARGO;
  process.env.SUPABASE_URL = 'https://prueba.supabase.co';
  process.env.SUPABASE_SERVICE_KEY = 'clave';
  delete process.env.NODE_ENV;
  delete process.env.CORS_ORIGENES;
});

afterEach(() => {
  process.env = { ...original };
  vi.restoreAllMocks();
});

describe('validarEntorno', () => {
  it('sin DATABASE_URL o JWT_SECRET no arranca', () => {
    delete process.env.DATABASE_URL;
    delete process.env.JWT_SECRET;
    expect(() => validarEntorno()).toThrow(/DATABASE_URL falta[\s\S]*JWT_SECRET falta/);
  });

  it('en desarrollo, un secreto corto solo avisa', () => {
    process.env.JWT_SECRET = 'corto';
    expect(() => validarEntorno()).not.toThrow();
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('JWT_SECRET tiene menos de 32'));
  });

  it('en producción, un secreto corto o sin CORS_ORIGENES no deja arrancar', () => {
    process.env.NODE_ENV = 'production';
    process.env.JWT_SECRET = 'corto';
    expect(() => validarEntorno()).toThrow(/JWT_SECRET tiene menos de 32[\s\S]*CORS_ORIGENES falta/);
  });

  it('sin Supabase solo avisa', () => {
    delete process.env.SUPABASE_URL;
    expect(() => validarEntorno()).not.toThrow();
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('SUPABASE_URL'));
  });
});

describe('origenesPermitidos', () => {
  it('limpia espacios y barras finales', () => {
    process.env.CORS_ORIGENES = ' https://miarmario.app/ , https://www.miarmario.app';
    expect(origenesPermitidos()).toEqual(['https://miarmario.app', 'https://www.miarmario.app']);
  });

  it('en desarrollo sin configurar acepta el servidor web de Expo; en producción, nada', () => {
    expect(origenesPermitidos()).toEqual(['http://localhost:8081']);
    process.env.NODE_ENV = 'production';
    expect(origenesPermitidos()).toEqual([]);
  });
});
