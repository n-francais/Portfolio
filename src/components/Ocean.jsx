import { useEffect, useMemo, useRef } from "react";
import { createOcean } from "../ocean/engine";

// Rayons de lumière : position (%), largeur, intensité, durée d'oscillation.
const RAYS = [[6, 160, .5, 17], [20, 90, .38, 21], [36, 200, .5, 25], [55, 120, .42, 19], [70, 170, .48, 23], [87, 110, .34, 27]];
const SUN_X = 68; // le soleil, en thème clair

// Sombre : rayons presque verticaux. Clair : ils partent du soleil en éventail.
const tilt = (x) => ({ dark: (x - 50) * 0.3, light: (SUN_X - x) * 0.25 });

export default function Ocean({ getAvoidRect, theme, fx, aquarium, gaugeRef, engineRef, onGame }) {
  const pondRef = useRef(null);
  const seaRef = useRef(null);
  const avoidRef = useRef(getAvoidRect);
  avoidRef.current = getAvoidRect;
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const aquariumRef = useRef(aquarium);
  aquariumRef.current = aquarium;
  const onGameRef = useRef(onGame);
  onGameRef.current = onGame;

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

  useEffect(() => {
    const engine = createOcean({
      pond: pondRef.current,
      sea: seaRef.current,
      getAvoidRect: () => avoidRef.current(),
      theme: themeRef.current,
      gauge: gaugeRef.current,
      feeding: aquariumRef.current,
      onGame: (snap) => onGameRef.current(snap),
    });
    engineRef.current = engine;
    return engine.stop;
  }, []);

  useEffect(() => {
    engineRef.current?.setTheme(theme);
  }, [theme]);

  // La nourriture ne se distribue qu'en mode aquarium.
  useEffect(() => {
    engineRef.current?.setFeeding(aquarium);
  }, [aquarium]);

  // Pendant la transition, les créatures nagent vers la lumière ou plongent.
  useEffect(() => {
    if (fx) engineRef.current?.rushTo(fx.dir);
  }, [fx]);

  return (
    <>
      <div className="water" aria-hidden="true">
        <div className="surface">
          <div className="sun" />
        </div>
        <div className="rays">
          {RAYS.map(([x, w, o, d]) => (
            <i key={x} style={{ "--x": `${x}%`, "--w": `${w}px`, "--rd": `${tilt(x).dark}deg`, "--rl": `${tilt(x).light}deg`, "--o": o, "--d": `${d}s` }} />
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
