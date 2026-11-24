import { useCallback, useEffect, useRef, useState } from "react";

const META_COLORS = { dark: "#060d36", light: "#7fd3ec" };

// Durée de la transition et moment où le thème bascule (quand le voile couvre tout l'écran).
const TRANSITION_MS = 1800;
const SWITCH_MS = 800;

// Thème sombre (les profondeurs) ou clair (près de la surface). Au premier chargement, on suit le
// réglage du système ; le choix fait avec le bouton est ensuite mémorisé. Passer d'un thème à l'autre
// joue une transition : on remonte vers la surface, ou l'on plonge. `fx` décrit celle en cours.
export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  const [fx, setFx] = useState(null);
  const busy = useRef(false);
  const timers = useRef([]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLORS[theme]);
  }, [theme]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const toggle = useCallback(() => {
    if (busy.current) return;
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      setTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        // stockage indisponible (navigation privée) : le thème vaut pour cette visite seulement
      }
    };

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }

    busy.current = true;
    document.documentElement.dataset.fx = "";
    setFx({ dir: next === "light" ? "up" : "down", id: Date.now() });
    timers.current = [
      setTimeout(apply, SWITCH_MS),
      setTimeout(() => {
        setFx(null);
        delete document.documentElement.dataset.fx;
        busy.current = false;
      }, TRANSITION_MS),
    ];
  }, [theme]);

  return [theme, toggle, fx];
}
