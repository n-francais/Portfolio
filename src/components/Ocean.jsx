import { useEffect, useMemo, useRef } from "react";
import { createOcean } from "../ocean/engine";

// Rayons de lumière : position, largeur, inclinaison, intensité, durée d'oscillation.
const RAYS = [[6, 160, -16, .5, 17], [20, 90, -10, .38, 21], [36, 200, -6, .5, 25], [55, 120, 3, .42, 19], [70, 170, 9, .48, 23], [87, 110, 15, .34, 27]];

export default function Ocean({ getAvoidRect }) {
  const pondRef = useRef(null);
  const seaRef = useRef(null);
  const avoidRef = useRef(getAvoidRect);
  avoidRef.current = getAvoidRect;

  const bubbles = useMemo(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return [];
    return Array.from({ length: 16 }, () => {
      const s = 6 + Math.random() * 20;
      return {
        left: `${Math.random() * 100}%`, width: s, height: s, "--sway": `${(Math.random() - .5) * 120}px`,
        animationDuration: `${14 + Math.random() * 18}s`, animationDelay: `${-Math.random() * 30}s`,
      };
    });
  }, []);

  useEffect(() => createOcean({
    pond: pondRef.current,
    sea: seaRef.current,
    getAvoidRect: () => avoidRef.current(),
  }), []);

  return (
    <>
      <div className="water" aria-hidden="true">
        <div className="rays">
          {RAYS.map(([x, w, r, o, d]) => (
            <i key={x} style={{ "--x": `${x}%`, "--w": `${w}px`, "--r": `${r}deg`, "--o": o, "--d": `${d}s` }} />
          ))}
        </div>
        <div className="bubbles">
          {bubbles.map((style, i) => <i key={i} style={style} />)}
        </div>
      </div>
      <canvas id="sea" ref={seaRef} aria-hidden="true" />
      <canvas id="pond" ref={pondRef} aria-hidden="true" />
    </>
  );
}
