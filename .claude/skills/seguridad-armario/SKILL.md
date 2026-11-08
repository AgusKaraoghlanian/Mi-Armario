---
name: seguridad-armario
description: Checklist de seguridad de Mi Armario (auth, fotos de usuarios, Supabase, variables de entorno, datos guardados en el celu). Usar siempre ante cambios de login, tokens, subida de fotos, permisos, variables de entorno o antes de un PR que toque esas áreas. Complementa a security-review.
---

# Seguridad — Mi Armario

Modo pair programming: marcar y explicar, sin arreglar en silencio. Son las mismas reglas que se
aplicaron en VPUG, adaptadas a una app con fotos personales.

## 🔴 Crítico (no se mergea sin resolver)

1. **Cada usuario ve solo lo suyo.** Toda consulta de prendas, outfits o inspiración filtra por
   el `usuarioId` del token verificado, nunca por uno que mande el cliente.
2. **Nada sensible en logs**: ni passwords, ni tokens, ni el body de login o registro.
3. **Claves secretas solo en el backend.** `SUPABASE_SERVICE_KEY` y `JWT_SECRET` nunca en `app/`.
   En Expo, cualquier `EXPO_PUBLIC_*` termina dentro de la app y lo puede leer cualquiera:
   ahí solo puede ir información pública, como la URL de la API.
4. **Token**: `Authorization: Bearer <token>`, firmado y verificado solo con HS256 y con
   vencimiento. En el celu se guarda con `expo-secure-store`, no en AsyncStorage.

## 🟡 Fotos (son de la casa o del cuerpo de la persona)

- Validar el tipo real por sus bytes, no por la extensión, y poner un tamaño máximo.
- Volver a generar la imagen en el servidor: sin EXIF ni GPS, derecha y achicada.
- El bucket de fotos es **privado**, con URLs firmadas que vencen.
- Fase 2 (probador con IA): antes de mandar una foto del usuario a un servicio externo, pedir
  consentimiento explícito y no guardarla allá más de lo necesario.

## 🟡 Backend

- Variables de entorno solo en `src/config/entorno.js`, validadas al arrancar.
- Validación de forma en un middleware (Joi) y reglas de negocio en el service.
- Rutas protegidas de forma explícita en cada router, no por el orden en `app.js`.
- `helmet`, límite de pedidos por IP (más estricto en login) y `npm audit` en 0.

## Formato del resultado

```
## Seguridad — <feature>
🔴 Crítico: ...
🟡 A revisar: ...
✅ Ya cumple: ...
```
