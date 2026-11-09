import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { BLUE, HumsIcon, HumsLogo } from "./Logo";

const { fontFamily } = loadFont();

export const FPS = 30;
// Cortes de escena según las pausas de la voz (segundos)
const CUTS = [0, 13.4, 23.0, 34.1, 46.1, 56.7, 67];
export const TOTAL_FRAMES = Math.round(CUTS[CUTS.length - 1] * FPS);

const NAVY = "#14234B";
const SOFT = "#EEF2FC";
const GREEN = "#22A06B";
const GREY = "#9AA3B5";
const WA = "#25D366";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const useIn = (delay = 0, damping = 14) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - delay, fps, config: { damping } });
};

const FadeScene: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 10, dur - 10, dur], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

const Title: React.FC<{ children: React.ReactNode; delay?: number; size?: number; color?: string }> = ({
  children,
  delay = 0,
  size = 64,
  color = NAVY,
}) => {
  const s = useIn(delay);
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 800,
        color,
        lineHeight: 1.15,
        opacity: s,
        transform: `translateY(${(1 - s) * 40}px)`,
      }}
    >
      {children}
    </div>
  );
};

const Card: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 20,
      boxShadow: "0 18px 50px rgba(20,35,75,0.12)",
      padding: 28,
      ...style,
    }}
  >
    {children}
  </div>
);

const Corner = () => (
  <div style={{ position: "absolute", top: 48, left: 64, opacity: 0.9 }}>
    <HumsLogo scale={0.32} />
  </div>
);

const fmt = (n: number) => Math.round(n).toLocaleString("es-CO");

/* 1. El dolor del volumen */
const Escena1 = () => {
  const f = useCurrentFrame();
  const count = interpolate(f, [20, 300], [0, 3200], { ...clamp, easing: Easing.out(Easing.cubic) });
  const cvs = Array.from({ length: 26 });
  return (
    <AbsoluteFill style={{ background: SOFT }}>
      <Corner />
      <AbsoluteFill style={{ padding: "200px 120px", flexDirection: "row", alignItems: "center", gap: 80 }}>
        <div style={{ flex: 1 }}>
          <Title>300 contrataciones</Title>
          <Title delay={8}>al mes.</Title>
          <div style={{ marginTop: 40, fontSize: 34, color: NAVY, opacity: interpolate(f, [60, 80], [0, 1], clamp) }}>
            Postulaciones por revisar
          </div>
          <div style={{ fontSize: 150, fontWeight: 800, color: BLUE, lineHeight: 1 }}>{fmt(count)}</div>
          <div
            style={{
              marginTop: 30,
              fontSize: 36,
              fontWeight: 700,
              color: "#C0392B",
              opacity: interpolate(f, [250, 275], [0, 1], clamp),
            }}
          >
            …y los puestos siguen vacíos.
          </div>
        </div>
        <div style={{ position: "relative", width: 720, height: 640 }}>
          {cvs.map((_, i) => {
            const d = 15 + i * 9;
            const s = spring({ frame: f - d, fps: FPS, config: { damping: 12 } });
            const x = ((i * 137) % 480) - 20;
            const y = 520 - Math.floor(i / 5) * 95 - ((i * 53) % 40);
            const r = ((i * 47) % 30) - 15;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: interpolate(s, [0, 1], [-300, y]),
                  opacity: s,
                  transform: `rotate(${r}deg)`,
                }}
              >
                <Card style={{ width: 220, padding: 18 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 22, background: "#D6DEF5" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 10, background: "#C9D2EA", borderRadius: 5, marginBottom: 8 }} />
                      <div style={{ height: 8, width: "60%", background: "#E1E6F4", borderRadius: 4 }} />
                    </div>
                  </div>
                  <div style={{ height: 8, background: "#EEF1F8", borderRadius: 4, marginTop: 14 }} />
                  <div style={{ height: 8, width: "80%", background: "#EEF1F8", borderRadius: 4, marginTop: 8 }} />
                </Card>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* 2. Atraer en volumen: todas las fuentes a un solo lugar */
const Fuente: React.FC<{ label: string; color: string; i: number; letter: string }> = ({ label, color, i, letter }) => {
  const f = useCurrentFrame();
  const s = useIn(10 + i * 10);
  const y = 230 + i * 150;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 180,
          top: y,
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: s,
          transform: `translateX(${(1 - s) * -80}px)`,
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 24,
            background: color,
            color: "#fff",
            fontSize: 44,
            fontWeight: 800,
            display: "grid",
            placeItems: "center",
          }}
        >
          {letter}
        </div>
        <div style={{ fontSize: 36, fontWeight: 700, color: NAVY }}>{label}</div>
      </div>
      {[0, 1, 2].map((k) => {
        const t = ((f - 40 - i * 7 - k * 22) % 66) / 66;
        if (f < 40 + i * 7 + k * 22) return null;
        const px = interpolate(t, [0, 1], [560, 1180]);
        const py = interpolate(t, [0, 1], [y + 45, 540]);
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: px,
              top: py - 16,
              width: 32,
              height: 32,
              borderRadius: 16,
              background: color,
              opacity: interpolate(t, [0, 0.1, 0.85, 1], [0, 1, 1, 0]),
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        );
      })}
    </>
  );
};

const Escena2 = () => {
  const f = useCurrentFrame();
  const s = useIn(20);
  const total = interpolate(f, [50, 270], [0, 1240], clamp);
  return (
    <AbsoluteFill style={{ background: SOFT }}>
      <Corner />
      <Fuente label="Facebook" color="#1877F2" letter="f" i={0} />
      <Fuente label="Instagram" color="#D6249F" letter="IG" i={1} />
      <Fuente label="WhatsApp" color={WA} letter="W" i={2} />
      <Fuente label="Anuncios y enlaces" color="#F39C12" letter="↗" i={3} />
      <div style={{ position: "absolute", left: 1180, top: 300, transform: `scale(${s})`, opacity: s }}>
        <Card style={{ width: 560, padding: 40 }}>
          <div style={{ fontSize: 24, color: GREY, fontWeight: 600 }}>VACANTE</div>
          <div style={{ fontSize: 44, fontWeight: 800, color: NAVY, marginTop: 6 }}>Operario de producción</div>
          <div
            style={{
              marginTop: 24,
              padding: "14px 20px",
              background: SOFT,
              borderRadius: 12,
              fontSize: 26,
              color: BLUE,
              fontWeight: 600,
            }}
          >
            🔗 Enlace único de la vacante
          </div>
          <div style={{ marginTop: 30, fontSize: 26, color: GREY }}>Candidatos recibidos</div>
          <div style={{ fontSize: 96, fontWeight: 800, color: BLUE, lineHeight: 1 }}>{fmt(total)}</div>
        </Card>
      </div>
      <div style={{ position: "absolute", bottom: 70, width: "100%", textAlign: "center" }}>
        <Title delay={150} size={48}>
          Todos en un mismo lugar.
        </Title>
      </div>
    </AbsoluteFill>
  );
};

/* 3. Filtro automático */
const Escena3 = () => {
  const f = useCurrentFrame();
  const preguntas = ["Disponibilidad", "Experiencia", "Ubicación"];
  const aptos = Math.min(410, Math.max(0, Math.round((f - 150) * 2.2)));
  const descartados = Math.min(830, Math.max(0, Math.round((f - 150) * 4.4)));
  return (
    <AbsoluteFill style={{ background: SOFT }}>
      <Corner />
      <div style={{ position: "absolute", left: 140, top: 230 }}>
        <Title size={56}>Preguntas que importan</Title>
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 24 }}>
          {preguntas.map((p, i) => {
            const s = useIn(30 + i * 25);
            const chk = interpolate(f, [70 + i * 25, 85 + i * 25], [0, 1], clamp);
            return (
              <Card
                key={p}
                style={{
                  width: 620,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  opacity: s,
                  transform: `translateX(${(1 - s) * -60}px)`,
                }}
              >
                <span style={{ fontSize: 36, fontWeight: 700, color: NAVY }}>{p}</span>
                <span
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    background: GREEN,
                    color: "#fff",
                    fontSize: 34,
                    display: "grid",
                    placeItems: "center",
                    transform: `scale(${chk})`,
                  }}
                >
                  ✓
                </span>
              </Card>
            );
          })}
        </div>
      </div>
      <div style={{ position: "absolute", right: 140, top: 230, display: "flex", gap: 30 }}>
        {[
          { t: "Aptos", n: aptos, c: GREEN },
          { t: "No cumplen", n: descartados, c: GREY },
        ].map((b, i) => {
          const s = useIn(120 + i * 10);
          return (
            <Card key={b.t} style={{ width: 340, textAlign: "center", opacity: s, borderTop: `10px solid ${b.c}` }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: NAVY }}>{b.t}</div>
              <div style={{ fontSize: 110, fontWeight: 800, color: b.c, lineHeight: 1.1 }}>{fmt(b.n)}</div>
              <div style={{ fontSize: 22, color: GREY }}>{i === 0 ? "siguen el proceso" : "reciben respuesta"}</div>
            </Card>
          );
        })}
      </div>
      <div style={{ position: "absolute", right: 140, top: 600, width: 710, display: "flex", flexDirection: "column", gap: 18 }}>
        {["⚡ En segundos", "🕒 24 horas", "🤖 Automático"].map((t, i) => {
          const s = useIn(200 + i * 12);
          return (
            <div
              key={t}
              style={{
                textAlign: "center",
                padding: "16px 10px",
                borderRadius: 40,
                background: BLUE,
                color: "#fff",
                fontSize: 30,
                fontWeight: 700,
                whiteSpace: "nowrap",
                opacity: s,
                transform: `translateX(${(1 - s) * 60}px)`,
              }}
            >
              {t}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* 4. WhatsApp + evaluación de idiomas con IA */
const Burbuja: React.FC<{ delay: number; mine?: boolean; children: React.ReactNode }> = ({ delay, mine, children }) => {
  const s = useIn(delay);
  return (
    <div
      style={{
        alignSelf: mine ? "flex-end" : "flex-start",
        maxWidth: "85%",
        background: mine ? "#DCF8C6" : "#fff",
        borderRadius: 16,
        padding: "14px 18px",
        fontSize: 24,
        color: "#1b1b1b",
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
        opacity: s,
        transform: `translateY(${(1 - s) * 20}px)`,
      }}
    >
      {children}
    </div>
  );
};

const Escena4 = () => {
  const f = useCurrentFrame();
  const phone = useIn(5);
  const ia = useIn(190);
  return (
    <AbsoluteFill style={{ background: SOFT }}>
      <Corner />
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 150,
          width: 470,
          height: 860,
          borderRadius: 60,
          background: "#111",
          padding: 18,
          transform: `translateY(${(1 - phone) * 300}px)`,
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: 44, overflow: "hidden", background: "#ECE5DD" }}>
          <div
            style={{
              background: "#075E54",
              color: "#fff",
              padding: "50px 24px 20px",
              fontSize: 26,
              fontWeight: 700,
              display: "flex",
              gap: 14,
              alignItems: "center",
            }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 26, background: "#fff", display: "grid", placeItems: "center" }}>
              <HumsIcon size={44} />
            </div>
            HUMS Selección
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 22 }}>
            <Burbuja delay={25}>¡Hola Laura! 👋 Pasaste el primer filtro para Operario de producción.</Burbuja>
            <Burbuja delay={60}>Completa tu proceso y presenta tus pruebas aquí 👉 Continuar</Burbuja>
            <Burbuja delay={100} mine>
              ¡Listo, ya las presenté! ✅
            </Burbuja>
            <Burbuja delay={140}>¡Gracias! Te avisaremos el siguiente paso.</Burbuja>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 800, top: 240, width: 960 }}>
        <Title size={54}>WhatsApp automático</Title>
        <div style={{ fontSize: 32, color: NAVY, marginTop: 14, opacity: useIn(30) }}>
          Completan su proceso y presentan sus pruebas sin que nadie los llame.
        </div>
        <Card
          style={{
            marginTop: 70,
            opacity: ia,
            transform: `translateY(${(1 - ia) * 40}px)`,
            borderLeft: `10px solid ${BLUE}`,
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 700, color: BLUE }}>CARGOS CON VARIOS IDIOMAS</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: NAVY, marginTop: 6 }}>Entrevista por voz con IA</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, height: 90, marginTop: 16 }}>
            {Array.from({ length: 48 }).map((_, i) => {
              const h = 14 + Math.abs(Math.sin((f - 190) / 4 + i * 0.7)) * 70 * (f > 200 ? 1 : 0.1);
              return <div key={i} style={{ width: 10, height: h, borderRadius: 5, background: BLUE, opacity: 0.85 }} />;
            })}
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 20 }}>
            {[
              ["🇬🇧 Inglés", "B2"],
              ["🇧🇷 Portugués", "B1"],
              ["🇫🇷 Francés", "A2"],
            ].map(([l, n], i) => {
              const s = useIn(250 + i * 15);
              return (
                <div
                  key={l}
                  style={{
                    flex: 1,
                    background: SOFT,
                    borderRadius: 14,
                    padding: "14px 18px",
                    fontSize: 28,
                    fontWeight: 700,
                    color: NAVY,
                    display: "flex",
                    justifyContent: "space-between",
                    opacity: s,
                  }}
                >
                  <span>{l}</span>
                  <span style={{ color: GREEN }}>{n}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

/* 5. Tablero por etapas, varias vacantes, compartir finalistas */
const COLS = ["Nuevos", "Aptos", "Pruebas", "Entrevista", "Finalistas"];
const NOMBRES = ["Laura M.", "Andrés P.", "Camila R.", "Jorge L.", "Valentina S.", "Diego H.", "Paula T.", "Sergio V."];

const Escena5 = () => {
  const f = useCurrentFrame();
  const share = useIn(200);
  return (
    <AbsoluteFill style={{ background: SOFT }}>
      <Corner />
      <div style={{ position: "absolute", left: 120, top: 170, display: "flex", gap: 16 }}>
        {["Operario · Bogotá", "Asesor comercial · Medellín", "Auxiliar de bodega · Cali"].map((t, i) => {
          const s = useIn(5 + i * 8);
          const active = i === 0;
          return (
            <div
              key={t}
              style={{
                padding: "14px 26px",
                borderRadius: 40,
                fontSize: 26,
                fontWeight: 700,
                background: active ? BLUE : "#fff",
                color: active ? "#fff" : NAVY,
                opacity: s,
              }}
            >
              {t}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 120, top: 270, right: 120, display: "flex", gap: 22 }}>
        {COLS.map((c, ci) => (
          <div key={c} style={{ flex: 1, background: "#E3E9F7", borderRadius: 18, padding: 16, height: 600 }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: NAVY, marginBottom: 14 }}>{c}</div>
          </div>
        ))}
      </div>
      {NOMBRES.map((n, i) => {
        // cada tarjeta avanza de columna en columna; los primeros llegan más lejos
        const target = Math.max(0, 4 - Math.floor(i / 2));
        const start = 20 + i * 6;
        const pos = interpolate(f, [start, start + 150], [0, target], { ...clamp, easing: Easing.inOut(Easing.cubic) });
        const colW = (1920 - 240 - 22 * 4) / 5;
        const x = 120 + 16 + pos * (colW + 22);
        const y = 340 + (i % 4) * 120 + (i >= 4 ? 40 : 0);
        const highlight = target === 4 && pos > 3.95;
        return (
          <div key={n} style={{ position: "absolute", left: x, top: y, width: colW - 32 }}>
            <Card
              style={{
                padding: 16,
                display: "flex",
                gap: 12,
                alignItems: "center",
                border: highlight ? `3px solid ${GREEN}` : "3px solid transparent",
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 23,
                  background: BLUE,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 20,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {n[0]}
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: NAVY }}>{n}</div>
            </Card>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          right: 120,
          bottom: 60,
          opacity: share,
          transform: `scale(${share})`,
          background: GREEN,
          color: "#fff",
          borderRadius: 40,
          padding: "20px 36px",
          fontSize: 32,
          fontWeight: 800,
        }}
      >
        🔗 Compartir finalistas con el jefe de área
      </div>
    </AbsoluteFill>
  );
};

/* 6. Cierre con embudo, logo y contacto */
const Escena6 = () => {
  const f = useCurrentFrame();
  const embudo = [
    ["Postulaciones", 1240],
    ["Aptos", 410],
    ["Contratados", 300],
  ] as const;
  const logo = useIn(110, 16);
  const embO = interpolate(f, [95, 115], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <AbsoluteFill style={{ opacity: embO, justifyContent: "center", alignItems: "center" }}>
        <Title size={60}>Menos tiempo filtrando.</Title>
        <Title delay={25} size={60} color={BLUE}>
          Más tiempo contratando.
        </Title>
        <div style={{ display: "flex", gap: 30, marginTop: 60 }}>
          {embudo.map(([t, n], i) => {
            const s = useIn(10 + i * 12);
            return (
              <Card key={t} style={{ width: 330, textAlign: "center", opacity: s, transform: `scale(${s})` }}>
                <div style={{ fontSize: 76, fontWeight: 800, color: i === 2 ? GREEN : BLUE }}>{fmt(n)}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: NAVY }}>{t}</div>
              </Card>
            );
          })}
        </div>
        <div style={{ marginTop: 20, fontSize: 20, color: GREY }}>Cifras ilustrativas de un mes</div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: logo,
          transform: `scale(${0.9 + logo * 0.1})`,
        }}
      >
        <HumsLogo scale={1.15} />
        <div style={{ marginTop: 50, fontSize: 40, fontWeight: 700, color: NAVY, opacity: useIn(150) }}>
          Selección inteligente de personal
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            gap: 18,
            background: WA,
            color: "#fff",
            padding: "18px 40px",
            borderRadius: 50,
            fontSize: 38,
            fontWeight: 800,
            opacity: useIn(170),
          }}
        >
          Carlos · +57 311 264 1234
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ESCENAS = [Escena1, Escena2, Escena3, Escena4, Escena5, Escena6];

export const HumsDemo = () => (
  <AbsoluteFill style={{ fontFamily, background: SOFT }}>
    <Audio src={staticFile("narracion.mp3")} />
    {ESCENAS.map((E, i) => {
      const from = Math.round(CUTS[i] * FPS);
      const dur = Math.round(CUTS[i + 1] * FPS) - from;
      return (
        <Sequence key={i} from={from} durationInFrames={dur}>
          <FadeScene dur={dur}>
            <E />
          </FadeScene>
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
