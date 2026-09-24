import { useState } from "react";

const CENTER = 50;
const RADIUS = 38;
const ZOOM_MS = 420;

function nodePosition(index, count) {
  const angle = (-90 + index * (360 / count)) * (Math.PI / 180);
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

export default function MindMapNav({ items, activeId }) {
  const [zoomingId, setZoomingId] = useState(null);
  const nodes = items.map((item, i) => ({ ...item, ...nodePosition(i, items.length) }));

  const handleClick = (e, id) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    setZoomingId(id);
    setTimeout(() => {
      window.location.hash = id;
    }, ZOOM_MS);
  };

  return (
    <nav className={`mindmap${zoomingId ? " is-zooming" : ""}`} aria-label="Sections">
      <svg viewBox="0 0 100 100" className="mindmap-lines" aria-hidden="true">
        {nodes.map((n) => (
          <line
            key={n.id}
            x1={CENTER}
            y1={CENTER}
            x2={n.x}
            y2={n.y}
            className={activeId === n.id ? "active" : ""}
            style={{ "--c": n.color }}
          />
        ))}
      </svg>

      <a
        href="#apropos"
        className={`mindmap-hub${zoomingId === "apropos" ? " zoom" : ""}`}
        aria-label="Aller à la section À propos"
        onClick={(e) => handleClick(e, "apropos")}
      >
        Nina Français
      </a>

      {nodes.map((n) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          className={`mindmap-node${zoomingId === n.id ? " zoom" : ""}`}
          style={{ left: `${n.x}%`, top: `${n.y}%`, "--c": n.color }}
          aria-current={activeId === n.id || undefined}
          title={n.label}
          onClick={(e) => handleClick(e, n.id)}
        >
          {n.short}
        </a>
      ))}
    </nav>
  );
}
