const MAX_DEG = 5;

export default function useTilt() {
  const onMouseMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * MAX_DEG).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * MAX_DEG).toFixed(2)}deg`);
    el.style.setProperty("--ty", "-4px");
  };

  const onMouseLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--ty", "0px");
  };

  return { onMouseMove, onMouseLeave };
}
