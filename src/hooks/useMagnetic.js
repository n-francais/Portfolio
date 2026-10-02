const STRENGTH = 0.35;
const MAX_PX = 14;

export default function useMagnetic() {
  const onMouseMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    const x = Math.max(-MAX_PX, Math.min(MAX_PX, mx * STRENGTH));
    const y = Math.max(-MAX_PX, Math.min(MAX_PX, my * STRENGTH));
    el.style.setProperty("--mbx", `${x.toFixed(1)}px`);
    el.style.setProperty("--mby", `${y.toFixed(1)}px`);
  };

  const onMouseLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--mbx", "0px");
    el.style.setProperty("--mby", "0px");
  };

  return { onMouseMove, onMouseLeave };
}
