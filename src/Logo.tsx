// Recreación vectorial del logo de HUMS a partir de la imagen que entregó el cliente.
export const BLUE = "#4A6BD6";

export const HumsIcon = ({ size = 120, color = BLUE }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="7" />
    {[
      [50, 12],
      [50, 88],
      [12, 50],
      [88, 50],
    ].map(([x, y]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill={color} stroke="#fff" strokeWidth="3" />
    ))}
    <rect x="31" y="31" width="8" height="38" rx="3" fill={color} />
    <rect x="61" y="31" width="8" height="38" rx="3" fill={color} />
    <rect x="31" y="46" width="38" height="8" rx="3" fill={color} />
  </svg>
);

export const HumsLogo = ({ scale = 1, color = BLUE }: { scale?: number; color?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 24 * scale }}>
    <HumsIcon size={150 * scale} color={color} />
    <div style={{ display: "flex", flexDirection: "column", color }}>
      <div style={{ fontSize: 118 * scale, fontWeight: 600, letterSpacing: 34 * scale, lineHeight: 1 }}>HUMS</div>
      <div style={{ fontSize: 30 * scale, fontWeight: 600, letterSpacing: 3 * scale, marginTop: 8 * scale }}>
        HUMAN SOLUTIONS GROUP
      </div>
    </div>
  </div>
);
