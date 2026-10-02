const RADIUS = 13;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgressRing({ pct }) {
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  return (
    <svg viewBox="0 0 32 32" width="30" height="30" className="progress-ring" aria-hidden="true">
      <circle cx="16" cy="16" r={RADIUS} className="progress-ring-track" fill="none" strokeWidth="3" />
      <circle
        cx="16"
        cy="16"
        r={RADIUS}
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform="rotate(-90 16 16)"
        className="progress-ring-bar"
      />
      <text x="16" y="16.5" textAnchor="middle" dominantBaseline="middle" className="progress-ring-text">
        {pct}
      </text>
    </svg>
  );
}

export function competencyProgress(comp) {
  const acs = comp.levels.flatMap((level) => level.acs).filter((ac) => ac.status);
  const done = acs.filter((ac) => ac.status === "done").length;
  return { done, total: acs.length, pct: acs.length ? Math.round((done / acs.length) * 100) : 0 };
}
