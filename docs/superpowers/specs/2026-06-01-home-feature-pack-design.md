# Paquete de features — Home, embeds y consistencia litúrgica

**Fecha:** 2026-06-01
**Proyecto:** dei-verbum-web (Next.js 16 + next-intl + Sanity)
**Estado:** Diseño aprobado

## Contexto

Paquete de 7 cambios sobre la web de la Parroquia Dei Verbum. Todo debe seguir
los lineamientos de Karpathy: cambios quirúrgicos, sin refactors fuera de
alcance, sin dependencias nuevas, siguiendo los patrones existentes.

### Datos resueltos
- **Channel ID de YouTube:** `UCxENqnnNPigauO91jVmEcXA`
- **Uploads playlist** (videos del canal, embebible): `UUxENqnnNPigauO91jVmEcXA`
- **Zona horaria de referencia:** `America/Bogota` (UTC-5)

## Features

### #1 — Embed de misa en vivo (home)
Ubicación: home, **arriba** de la sección "Horarios y Despacho".

- Nuevo componente cliente `LiveMassEmbed`.
- Calcula la hora actual en `America/Bogota` y muestra el embed **solo** dentro
  de la ventana de misa:
  - Lunes–Sábado: 18:00–19:30
  - Domingo: 12:00–13:30
  - Ventana = 90 minutos desde el inicio.
- Fuera de ventana: no renderiza nada (la página queda exactamente como antes).
- Embed: `https://www.youtube.com/embed/live_stream?channel=UCxENqnnNPigauO91jVmEcXA`.
- Re-evalúa la ventana con un timer (`setInterval`) para ocultarse solo al
  terminar, sin recarga.

### #2 — Lectio Divina (home)
- Cambiar la cita del evangelio de `font-headline` (serif itálica) a `font-body`
  (Plus Jakarta Sans), sin cursiva.
- Agregar CTA "Ver las lecturas de hoy" enlazando a `/lecturas` dentro de la
  sección Lectio Divina.

### #3 — Embed de YouTube roto (sección "Síguenos")
- Causa raíz: el `src` apunta a una página de canal
  (`youtube.com/@ParroquiaDeiVerbum/videos`), que YouTube bloquea en iframes.
- Reemplazar por:
  `https://www.youtube.com/embed/videoseries?list=UUxENqnnNPigauO91jVmEcXA`.

### #4 — Botón flotante global → contacto
- Extraer el FAB a un componente `PrayerRequestFab`.
- Montarlo en `[locale]/layout.tsx` para que aparezca en todas las páginas.
- Label: "Intención de Oración"; enlace directo a `/contacto`.
- Eliminar el botón local roto de `/lecturas` (apuntaba a `#pedidos-oracion`,
  ancla inexistente).

### #5 — Logos de comunidades (Vida parroquial)
- Problema: unos logos son PNG transparentes y otros JPG con fondo, se ven
  inconsistentes.
- Solución (solo CSS): dar a cada tile de logo un fondo uniforme blanco
  redondeado con `object-contain`, para que todos queden iguales.

### #6 — Textos de ministerios (Vida parroquial)
En `messages/es.json` y `messages/en.json`:
- `lectorsTitle`: "Lectores" → "Ministros lectores"
  (en: "Lectors" → "Lector Ministers")
- `eucharistMinistersTitle`: "Ministros de la Eucaristía" →
  "Ministros extraordinarios de la sagrada comunión"
  (en: "Eucharistic Ministers" → "Extraordinary Ministers of Holy Communion")

### #7 — Formato de cita bíblica católica (sitio)
Estándar: abreviatura del libro + espacio + capítulo + coma + versículo
(`Hb 4,12`).

- Citas estáticas: hero `heroDescription` "Hebreos 4:12" → "Hb 4,12"
  (en: "Hebrews 4:12" → "Heb 4,12").
- Refs dinámicas del Ordo (ej. `Jn 14, 6`): normalizar quitando el espacio tras
  la coma (`Jn 14,6`). No reescribir el nombre del libro (ya viene abreviado).

## Restricciones

- Cambios quirúrgicos; cada línea modificada traza directamente a un feature.
- Sin dependencias nuevas.
- Sin refactors ni "mejoras" de código adyacente.
- Seguir patrones y estilo existentes (Tailwind, next-intl, tokens de color del
  design system).
- Verificar al final: `pnpm lint` y `pnpm build` sin errores nuevos.
