import { useMemo } from "react";

// Transition entre les deux thèmes : une vague qui remonte vers la surface (sombre → clair) ou une
// plongée dans les profondeurs (clair → sombre), avec des bulles qui filent vers le haut.
export default function ThemeTransition({ fx }) {
  const bubbles = useMemo(() => {
    if (!fx) return [];
    return Array.from({ length: fx.dir === "up" ? 34 : 14 }, () => {
      const size = 6 + Math.random() * 34;
      return {
        left: `${Math.random() * 100}%`, width: size, height: size,
        "--sway": `${(Math.random() - 0.5) * 140}px`,
        animationDelay: `${Math.random() * 0.55}s`, animationDuration: `${1 + Math.random() * 0.7}s`,
      };
    });
  }, [fx]);

  if (!fx) return null;

  return (
    <div key={fx.id} className={`tide-fx tide-fx--${fx.dir}`} aria-hidden="true">
      <div className="tide" />
      <div className="tide-flash" />
      <div className="tide-bubbles">
        {bubbles.map((style, i) => <i key={i} style={style} />)}
      </div>
    </div>
  );
}
