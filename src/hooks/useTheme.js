import { useCallback, useEffect, useState } from "react";

const META_COLORS = { dark: "#060d36", light: "#7fd3ec" };

// Thème sombre (les profondeurs) ou clair (près de la surface). Au premier chargement, on suit le
// réglage du système ; le choix fait avec le bouton est ensuite mémorisé.
export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLORS[theme]);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {
        // stockage indisponible (navigation privée) : le thème vaut pour cette visite seulement
      }
      return next;
    });
  }, []);

  return [theme, toggle];
}
