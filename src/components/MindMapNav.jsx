import { useRef, useState } from "react";
import { NAV_ICONS } from "./icons";

const CENTER = 50;
const RADIUS = 38;
const GLIDE_MS = 480;

function nodePosition(index, count) {
  const angle = (-90 + index * (360 / count)) * (Math.PI / 180);
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

export default function MindMapNav({ items, activeId }) {
  const [leavingId, setLeavingId] = useState(null);
  const nodeRefs = useRef([]);
  const nodes = items.map((item, i) => ({ ...item, ...nodePosition(i, items.length) }));

  const handleClick = (e, id) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    setLeavingId(id);
    setTimeout(() => {
      window.location.hash = id;
    }, GLIDE_MS);
  };

  const handleKeyDown = (e, index) => {
    const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (delta) {
      e.preventDefault();
      const next = (index + delta + nodes.length) % nodes.length;
      nodeRefs.current[next]?.focus();
    }
  };

  return (
    <nav className={`mindmap${leavingId ? " is-leaving" : ""}`} aria-label="Sections">
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
        className={`mindmap-hub${leavingId === "apropos" ? " leaving" : ""}`}
        aria-label="Aller à la section À propos"
        onClick={(e) => handleClick(e, "apropos")}
      >
        Nina Français
      </a>

      {nodes.map((n, i) => {
        const Icon = NAV_ICONS[n.id];
        return (
          <a
            key={n.id}
            ref={(el) => (nodeRefs.current[i] = el)}
            href={`#${n.id}`}
            className={`mindmap-node${leavingId === n.id ? " leaving" : ""}`}
            style={{ left: `${n.x}%`, top: `${n.y}%`, "--c": n.color }}
            aria-current={activeId === n.id || undefined}
            title={n.label}
            onClick={(e) => handleClick(e, n.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            {Icon && <Icon />}
            <span>{n.short}</span>
          </a>
        );
      })}
    </nav>
  );
}
