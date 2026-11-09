# Demo HUMS – Human Solutions Group

Video y página de demostración del servicio de selección de personal de HUMS.

## Qué hay aquí

- `entrega/` – lo que se le entrega al cliente:
  - `index.html` – página de demo (abrir con doble clic).
  - `hums-demo.mp4` – video de 1:07 con voz en off.
  - `portada.png` – imagen de portada del video.
- `src/` – el video hecho con Remotion (escenas, logo redibujado en vector).
- `public/narracion.mp3` – voz final (ElevenLabs, voz "AD-berto").
- `audio/` – tomas originales de la voz (toma 1, toma 2 y la frase de idiomas).

## Volver a generar el video

```bash
npm install
npx remotion studio            # ver y editar en el navegador
npx remotion render src/index.ts HumsDemo out/hums-demo.mp4 --browser-executable="C:/Program Files/Google/Chrome/Application/chrome.exe"
```

Las cifras y nombres del video son ilustrativos.
