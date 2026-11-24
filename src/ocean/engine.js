/* Le bassin du portfolio : poissons, méduses, pieuvre, étoiles de mer et récif, dessinés et animés
   en canvas. `pond` reçoit les créatures, `sea` le récif et la neige marine. `getAvoidRect` renvoie la
   zone de texte que les poissons contournent (ou null). Renvoie `{ setTheme, stop }`. */
import { SPECIES, FISH, JELLY, FANS, STARS } from "./species";

// Couleurs qui changent avec le thème : en sombre, les profondeurs ; en clair, l'eau près de la surface.
// Les créatures et le récif sont rendus plus pastel côté CSS (filtre sur les canvas).
const PALETTES = {
  dark: {
    shadow: "rgba(2,0,40,.5)", starShadow: "rgba(0,0,20,.55)", tint: "4,10,48",
    snow: "190,210,255", snowAlpha: [0.16, 0.3, 0.48],
    rock: ["rgb(74,26,62)", "rgb(14,6,24)"], haze: ["rgba(6,14,60,.35)", "rgba(2,4,20,.45)"],
  },
  light: {
    shadow: "rgba(10,80,130,.3)", starShadow: "rgba(10,80,130,.3)", tint: "150,215,240",
    snow: "255,255,255", snowAlpha: [0.3, 0.5, 0.75],
    rock: ["rgb(200,160,176)", "rgb(120,96,128)"], haze: ["rgba(150,215,240,.12)", "rgba(60,150,190,.2)"],
  },
};

export function createOcean({ pond, sea, getAvoidRect, theme = "dark" }) {
  let pal = PALETTES[theme] || PALETTES.dark;
  // Pendant le changement de thème, tout le monde nage vers la lumière (-1) ou plonge dans les profondeurs (1).
  let rush = null;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const isUI = (el) => el.closest("button,a,summary,.view--sheet,.dock,.goal,.home-inner,.brand");

  /* ---------- Le bassin : poissons dessinés et animés en canvas ----------
     Chaque poisson a une colonne vertébrale articulée qui suit la tête, une onde de nage qui
     parcourt le corps de la tête vers la queue, et des voiles (queue, dorsale, anale, pectorales)
     qui sont des chaînes souples : elles traînent derrière le corps, ondulent et se froncent
     sur les bords, comme la soie des combattants « halfmoon ». */
  const g = pond.getContext("2d");
  let W = 0, H = 0, DPR = 1;
  const TAU = Math.PI * 2;
  const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
  const lerp = (a, b, k) => a + (b - a) * k;
  // Pseudo-hasard stable (le même à chaque image), pour les fils des nageoires et les granulations.
  const rnd = (a, b) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
  const nx = (a) => -Math.sin(a), ny = (a) => Math.cos(a);

  const stars = STARS.map((st) => ({ ...st }));
  const fishes = FISH.map((o) => {
    const sp = SPECIES[o.kind], n = sp.widths.length;
    const pt = () => ({ x: 0, y: 0, a: 0 });
    return {
      ...o, sp, n, h: (o.heading * Math.PI) / 180, hx: 0, hy: 0,
      joints: Array.from({ length: n }, pt), pts: Array.from({ length: n }, pt),
      veils: sp.veils.map((v, i) => ({ v, i, pts: Array.from({ length: v.segs + 1 }, pt) })),
      phase: Math.random() * TAU, boost: 1, energy: 1, food: null,
      s1: Math.random() * 9, s2: Math.random() * 9, f1: .35 + Math.random() * .3, f2: .15 + Math.random() * .2,
    };
  });

  function size(f) {
    const base = Math.max(140, Math.min(0.42 * Math.min(W * 0.85, H), 360));
    f.L = base * f.size;
    f.Lb = f.L * f.sp.bodyLen;
    f.seg = f.Lb / (f.n - 1);
  }

  /* --- Squelette --- */
  function follow(f) {
    const J = f.joints;
    J[0].x = f.hx; J[0].y = f.hy;
    let prev = f.h;
    for (let i = 1; i < f.n; i++) {
      const p = J[i - 1], q = J[i];
      let a = Math.atan2(p.y - q.y, p.x - q.x);
      const d = wrap(a - prev), lim = f.sp.bend;
      if (d > lim) a = prev + lim; else if (d < -lim) a = prev - lim;
      q.x = p.x - Math.cos(a) * f.seg; q.y = p.y - Math.sin(a) * f.seg;
      prev = a;
    }
  }
  // Onde de nage : décalage latéral qui grandit vers la queue et parcourt le corps.
  function swim(f) {
    const J = f.joints, P = f.pts, n = f.n, A = f.sp.wag * f.Lb * f.energy, k = TAU * f.sp.wave;
    for (let i = 0; i < n; i++) {
      const s = i / (n - 1);
      const fwd = i === 0 ? f.h : Math.atan2(J[i - 1].y - J[i].y, J[i - 1].x - J[i].x);
      const off = A * (0.1 + 0.9 * s ** 1.6) * Math.sin(k * s - f.phase);
      P[i].x = J[i].x + nx(fwd) * off; P[i].y = J[i].y + ny(fwd) * off;
    }
    for (let i = 0; i < n; i++) {
      const a = P[Math.max(i - 1, 0)], b = P[Math.min(i + 1, n - 1)];
      P[i].a = Math.atan2(a.y - b.y, a.x - b.x);
    }
  }
  // Point interpolé le long du corps (t de 0, la tête, à 1, la queue).
  function sample(f, t) {
    const P = f.pts, u = t * (f.n - 1), i = Math.min(Math.floor(u), f.n - 2), r = u - i, a = P[i], b = P[i + 1];
    return { x: lerp(a.x, b.x, r), y: lerp(a.y, b.y, r), a: a.a + wrap(b.a - a.a) * r, w: lerp(f.sp.widths[i], f.sp.widths[i + 1], r) * f.Lb };
  }

  /* --- Voiles : chaînes souples avec inertie --- */
  function placeVeil(f, vs, dt) {
    const v = vs.v, q = sample(f, v.at), P = vs.pts, m = v.segs, seg = (v.len * f.L) / m;
    P[0].x = q.x + nx(q.a) * v.side * q.w * 0.36;
    P[0].y = q.y + ny(q.a) * v.side * q.w * 0.36;
    const k = dt == null ? 1 : 1 - Math.exp(-dt * v.lag);
    // Les pectorales battent ; elles se replient quand le poisson accélère.
    const flap = v.flap ? Math.sin(f.phase * 0.5 + (v.side > 0 ? 0 : Math.PI)) * v.flap - (f.boost - 1) * 0.35 : 0;
    // Direction de repos de la voile, plus une onde qui la parcourt de la base vers le bord.
    const base = q.a + Math.PI + v.side * (v.splay + flap);
    for (let i = 1; i <= m; i++) {
      const p = P[i - 1], c = P[i];
      const rest = base + Math.sin(f.phase * 0.8 - i * 0.75 + v.side + f.s2) * v.flutter * (i / m);
      const cur = dt == null ? rest : Math.atan2(c.y - p.y, c.x - p.x);
      const a = cur + wrap(rest - cur) * k;
      c.x = p.x + Math.cos(a) * seg; c.y = p.y + Math.sin(a) * seg;
    }
  }

  function curve(pts, start, c = g) {
    if (start) c.moveTo(pts[0].x, pts[0].y); else c.lineTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length - 1; i++) {
      c.quadraticCurveTo(pts[i].x, pts[i].y, (pts[i].x + pts[i + 1].x) / 2, (pts[i].y + pts[i + 1].y) / 2);
    }
    const l = pts[pts.length - 1];
    c.lineTo(l.x, l.y);
  }

  const EDGE = 18;
  function drawVeil(f, vs, t) {
    const v = vs.v, P = vs.pts, m = v.segs, L = f.L, sp = f.sp;
    const left = [], right = [], hw = [], ang = [];
    for (let i = 0; i <= m; i++) {
      const a = P[Math.max(i - 1, 0)], b = P[Math.min(i + 1, m)];
      const an = Math.atan2(a.y - b.y, a.x - b.x);
      const s = i / m, w = ((v.w0 + (v.w1 - v.w0) * (1 - (1 - s) * (1 - s))) * L) / 2;
      ang.push(an); hw.push(w);
      left.push({ x: P[i].x + nx(an) * w, y: P[i].y + ny(an) * w });
      right.push({ x: P[i].x - nx(an) * w, y: P[i].y - ny(an) * w });
    }
    // Bord arrondi (ou fourchu), froncé, qui ondule doucement.
    const out = ang[m] + Math.PI, edge = [];
    for (let j = 0; j <= EDGE; j++) {
      const u = j / EDGE;
      const bulge = (v.fork ? (0.2 + 0.8 * Math.abs(u * 2 - 1)) * 0.8 : Math.sin(u * Math.PI) * 0.7) * hw[m];
      const ruf = Math.sin(u * Math.PI * 9 + t * 2.4 + f.s1) * v.ruffle * L * (0.55 + 0.45 * Math.sin(u * 7 + t * 1.3));
      const d = bulge + ruf;
      edge.push({ x: lerp(left[m].x, right[m].x, u) + Math.cos(out) * d, y: lerp(left[m].y, right[m].y, u) + Math.sin(out) * d });
    }
    const tip = edge[EDGE >> 1];

    // Membrane : un voile translucide qui relie les rayons, avec un léger halo.
    g.beginPath();
    curve(left, true);
    curve(edge, false);
    curve(right.slice().reverse(), false);
    g.closePath();
    const gr = g.createLinearGradient(P[0].x, P[0].y, tip.x, tip.y);
    gr.addColorStop(0, sp.silk[0]); gr.addColorStop(0.45, sp.silk[1]); gr.addColorStop(0.8, sp.silk[2]); gr.addColorStop(1, sp.silk[3]);
    g.save();
    g.globalAlpha *= 0.55;
    if (m >= 7) { g.shadowColor = `rgba(${sp.strands[0]},.35)`; g.shadowBlur = L * 0.05 * DPR; }
    g.fillStyle = gr;
    g.fill();
    g.restore();
    // Reflet irisé qui glisse sur la soie au rythme de la nage.
    const sh = (f.phase * 0.12 + v.at) % 1;
    const sg = g.createLinearGradient(P[0].x, P[0].y, tip.x, tip.y);
    sg.addColorStop(Math.max(0, sh - 0.14), "rgba(255,255,255,0)");
    sg.addColorStop(sh, "rgba(255,252,240,.16)");
    sg.addColorStop(Math.min(1, sh + 0.14), "rgba(255,255,255,0)");
    g.fillStyle = sg;
    g.fill();

    // Rayons : de fins fils soyeux colorés par bandes, qui dépassent du bord en s'effilochant.
    const K = v.pleats * 2, groups = sp.strands.map(() => []), all = [];
    for (let r = 0; r <= K; r++) {
      const u = (r / K) * 2 - 1, j = rnd(r, vs.i + f.s1);
      const line = [];
      for (let i = 0; i <= m; i++) line.push({ x: P[i].x + nx(ang[i]) * u * hw[i] * 0.97, y: P[i].y + ny(ang[i]) * u * hw[i] * 0.97 });
      const e = edge[Math.round(((u + 1) / 2) * EDGE)];
      const ext = L * (0.01 + j * 0.07), sway = Math.sin(t * 2.2 + r * 0.9 + f.s2) * L * 0.012 * j;
      line.push({ x: e.x + Math.cos(out) * ext + nx(out) * sway, y: e.y + Math.sin(out) * ext + ny(out) * sway });
      const band = (Math.sin(u * sp.band + vs.i * 1.7 + f.s1) + 1) / 2;
      groups[Math.min(groups.length - 1, Math.floor(band * groups.length))].push(line);
      all.push(line);
    }
    g.lineCap = "round";
    g.lineWidth = Math.max(0.6, L * 0.0032);
    groups.forEach((lines, k) => {
      if (!lines.length) return;
      const c = sp.strands[k];
      const lg = g.createLinearGradient(P[0].x, P[0].y, tip.x, tip.y);
      lg.addColorStop(0, `rgba(${c},.85)`); lg.addColorStop(0.6, `rgba(${c},.7)`);
      lg.addColorStop(0.88, `rgba(${sp.tip},.55)`); lg.addColorStop(1, `rgba(${sp.tip},.05)`);
      g.beginPath();
      for (const ln of lines) curve(ln, true);
      g.strokeStyle = lg;
      g.stroke();
    });
    // Quelques fils plus clairs, comme des reflets sur la soie.
    g.beginPath();
    for (let r = 2; r < all.length; r += 4) curve(all[r], true);
    g.strokeStyle = "rgba(255,255,255,.2)";
    g.lineWidth = Math.max(0.5, L * 0.0018);
    g.stroke();
  }

  /* --- Corps --- */
  const LIGHT = { x: -0.55, y: -0.83 }; // la lumière vient du haut à gauche

  function bodyPath(f, begin) {
    const P = f.pts, Wd = f.sp.widths, L = f.Lb, left = [], right = [];
    for (let i = 0; i < f.n; i++) {
      const w = (Wd[i] * L) / 2, p = P[i];
      left.push({ x: p.x + nx(p.a) * w, y: p.y + ny(p.a) * w });
      right.push({ x: p.x - nx(p.a) * w, y: p.y - ny(p.a) * w });
    }
    const h0 = P[0], w0 = Wd[0] * L, dx = Math.cos(h0.a), dy = Math.sin(h0.a), nz = f.sp.nose;
    if (begin) g.beginPath();
    curve(left.slice().reverse(), true);
    g.quadraticCurveTo(left[0].x + dx * w0 * 0.55, left[0].y + dy * w0 * 0.55, h0.x + dx * w0 * nz, h0.y + dy * w0 * nz);
    g.quadraticCurveTo(right[0].x + dx * w0 * 0.55, right[0].y + dy * w0 * 0.55, right[0].x, right[0].y);
    curve(right, false);
    g.closePath();
  }

  const noShadow = () => { g.shadowColor = "transparent"; g.shadowBlur = 0; g.shadowOffsetX = 0; g.shadowOffsetY = 0; };

  // Écailles qui se chevauchent : un bord sombre et un liseré clair côté lumière.
  function scales(f) {
    const sp = f.sp, L = f.Lb, r = L * sp.scaleSize, step = r * 1.55;
    const rows = Math.max(4, Math.floor((0.64 * L) / (r * 1.2)));
    const dark = [];
    for (let j = 0; j <= rows; j++) {
      const q = sample(f, 0.19 + (0.64 * j) / rows), back = q.a + Math.PI;
      const cols = Math.ceil(q.w / step);
      for (let k = -cols; k <= cols; k++) {
        const off = k * step * 0.5 + (j % 2 ? step * 0.25 : 0);
        if (Math.abs(off) > q.w * 0.47) continue;
        dark.push([q.x + nx(q.a) * off, q.y + ny(q.a) * off, back]);
      }
    }
    g.beginPath();
    for (const [x, y, b] of dark) { g.moveTo(x + Math.cos(b - 1.15) * r, y + Math.sin(b - 1.15) * r); g.arc(x, y, r, b - 1.15, b + 1.15); }
    g.strokeStyle = sp.scale;
    g.lineWidth = Math.max(0.6, L * 0.0032);
    g.stroke();
    g.beginPath();
    const lx = LIGHT.x * r * 0.28, ly = LIGHT.y * r * 0.28;
    for (const [x, y, b] of dark) { g.moveTo(x + lx + Math.cos(b - 0.8) * r * 0.85, y + ly + Math.sin(b - 0.8) * r * 0.85); g.arc(x + lx, y + ly, r * 0.85, b - 0.8, b + 0.8); }
    g.strokeStyle = sp.scaleLight;
    g.lineWidth = Math.max(0.5, L * 0.0022);
    g.stroke();
  }

  function drawFish(f, t) {
    const sp = f.sp, P = f.pts, L = f.Lb, n = f.n;
    const wmax = Math.max(...sp.widths) * L;
    g.save();
    g.globalAlpha = f.alpha || 1;

    for (const vs of f.veils) drawVeil(f, vs, t);

    // Corps et ombre portée sur le fond.
    bodyPath(f, true);
    const last = P[n - 1];
    const gr = g.createLinearGradient(P[0].x, P[0].y, last.x, last.y);
    gr.addColorStop(0, sp.body[0]); gr.addColorStop(0.45, sp.body[1]); gr.addColorStop(1, sp.body[2]);
    g.shadowColor = pal.shadow;
    g.shadowBlur = 28 * DPR * f.size;
    g.shadowOffsetX = 14 * DPR * f.size;
    g.shadowOffsetY = 24 * DPR * f.size;
    g.fillStyle = gr;
    g.fill();
    noShadow();

    g.save();
    bodyPath(f, true);
    g.clip();

    // Taches aux bords organiques.
    for (const pt of sp.patches) {
      const q = sample(f, pt.t), r = pt.r * q.w;
      const cx = q.x + nx(q.a) * pt.s * q.w, cy = q.y + ny(q.a) * pt.s * q.w;
      const pg = g.createRadialGradient(cx, cy, r * 0.72, cx, cy, r);
      pg.addColorStop(0, `rgba(${pt.c},1)`); pg.addColorStop(1, `rgba(${pt.c},0)`);
      g.fillStyle = pg;
      g.fillRect(cx - r, cy - r, r * 2, r * 2);
    }

    scales(f);

    // Volume : ombre interne projetée depuis les bords opposés à la lumière.
    g.beginPath();
    g.rect(P[0].x - 3 * L, P[0].y - 3 * L, 6 * L, 6 * L);
    bodyPath(f, false);
    g.shadowColor = sp.shade;
    g.shadowBlur = wmax * 0.5 * DPR;
    g.shadowOffsetX = -LIGHT.x * wmax * 0.16 * DPR;
    g.shadowOffsetY = -LIGHT.y * wmax * 0.16 * DPR;
    g.fillStyle = "#000";
    g.fill("evenodd");
    noShadow();

    // Reflet doux le long du dos, décalé vers la lumière, puis un reflet net plus court.
    const spine = P.slice(1, n - 2).map((p) => ({ x: p.x + LIGHT.x * wmax * 0.1, y: p.y + LIGHT.y * wmax * 0.1 }));
    g.lineCap = "round";
    g.beginPath();
    curve(spine, true);
    g.strokeStyle = sp.sheen;
    g.lineWidth = wmax * 0.2;
    g.shadowColor = sp.sheen;
    g.shadowBlur = wmax * 0.4 * DPR;
    g.stroke();
    noShadow();
    g.beginPath();
    curve(spine.slice(1, Math.ceil(n * 0.55)), true);
    g.strokeStyle = "rgba(255,255,255,.45)";
    g.lineWidth = wmax * 0.035;
    g.stroke();

    // Ouïe : un arc sombre et son liseré clair.
    const gq = sample(f, sp.gill), ga = Math.cos(gq.a), gb = Math.sin(gq.a);
    const arc = (back, color, lw) => {
      g.beginPath();
      g.moveTo(gq.x + nx(gq.a) * gq.w * 0.5 - ga * back, gq.y + ny(gq.a) * gq.w * 0.5 - gb * back);
      g.quadraticCurveTo(gq.x - ga * (gq.w * 0.32 + back), gq.y - gb * (gq.w * 0.32 + back), gq.x - nx(gq.a) * gq.w * 0.5 - ga * back, gq.y - ny(gq.a) * gq.w * 0.5 - gb * back);
      g.strokeStyle = color;
      g.lineWidth = lw;
      g.stroke();
    };
    arc(0, "rgba(10,5,40,.14)", L * 0.007);
    arc(L * 0.008, "rgba(255,255,255,.2)", L * 0.005);
    g.restore();

    if (sp.dorsal) {
      g.beginPath();
      curve(P.slice(3, 10), true);
      g.strokeStyle = sp.dorsal;
      g.lineWidth = L * 0.012;
      g.lineCap = "round";
      g.stroke();
    }

    // Yeux : sur les côtés de la tête, ils dépassent un peu du contour comme sur un vrai koï vu de dessus.
    const eq = sample(f, 0.1);
    for (const side of [1, -1]) {
      const x = eq.x + nx(eq.a) * side * eq.w * 0.44, y = eq.y + ny(eq.a) * side * eq.w * 0.44;
      const rx = eq.w * sp.eyeSize, ry = rx * 0.72;
      // ombre de l'orbite
      const so = g.createRadialGradient(x, y, rx * 0.7, x, y, rx * 1.5);
      so.addColorStop(0, "rgba(20,10,40,.3)"); so.addColorStop(1, "rgba(20,10,40,0)");
      g.fillStyle = so;
      g.beginPath(); g.ellipse(x, y, rx * 1.5, ry * 1.5, eq.a, 0, TAU); g.fill();
      // globe : grande pupille, iris fin et métallique
      const ir = g.createRadialGradient(x, y, 0, x, y, rx);
      ir.addColorStop(0, sp.iris[0]); ir.addColorStop(0.6, sp.iris[0]);
      ir.addColorStop(0.68, sp.iris[1]); ir.addColorStop(0.92, sp.iris[2]); ir.addColorStop(1, "rgba(15,8,25,.85)");
      g.fillStyle = ir;
      g.beginPath(); g.ellipse(x, y, rx, ry, eq.a, 0, TAU); g.fill();
      // reflet de la cornée, petit et net, et un second très léger
      g.fillStyle = "rgba(255,255,255,.85)";
      g.beginPath(); g.ellipse(x + LIGHT.x * rx * 0.3, y + LIGHT.y * ry * 0.3, rx * 0.16, ry * 0.12, eq.a, 0, TAU); g.fill();
      g.fillStyle = "rgba(255,255,255,.3)";
      g.beginPath(); g.ellipse(x - LIGHT.x * rx * 0.3, y - LIGHT.y * ry * 0.3, rx * 0.1, ry * 0.08, eq.a, 0, TAU); g.fill();
    }
    // Narines et barbillons.
    const h0 = P[0], w0 = sp.widths[0] * L, hx = Math.cos(h0.a), hy = Math.sin(h0.a);
    g.fillStyle = "rgba(20,10,30,.45)";
    for (const side of [1, -1]) {
      g.beginPath();
      g.arc(h0.x + hx * w0 * 0.3 + nx(h0.a) * side * w0 * 0.17, h0.y + hy * w0 * 0.3 + ny(h0.a) * side * w0 * 0.17, w0 * 0.035, 0, TAU);
      g.fill();
    }
    if (sp.whiskers) {
      const nose = { x: h0.x + hx * w0 * 0.55, y: h0.y + hy * w0 * 0.55 };
      g.beginPath();
      for (const side of [1, -1]) {
        const wob = Math.sin(f.phase * 1.3 + side) * w0 * 0.08;
        g.moveTo(nose.x + nx(h0.a) * side * w0 * 0.12, nose.y + ny(h0.a) * side * w0 * 0.12);
        g.quadraticCurveTo(
          nose.x + hx * w0 * 0.4 + nx(h0.a) * (side * w0 * 0.15 + wob), nose.y + hy * w0 * 0.4 + ny(h0.a) * (side * w0 * 0.15 + wob),
          nose.x + hx * w0 * 0.32 + nx(h0.a) * side * w0 * 0.55, nose.y + hy * w0 * 0.32 + ny(h0.a) * side * w0 * 0.55);
      }
      g.strokeStyle = "rgba(255,240,228,.75)";
      g.lineWidth = Math.max(0.8, L * 0.006);
      g.lineCap = "round";
      g.stroke();
    }
    g.restore();
  }

  /* --- Méduses : une cloche translucide qui pulse, des bras froncés et de longs filaments --- */
  const chain = (n) => Array.from({ length: n }, () => ({ x: 0, y: 0 }));
  const jellies = JELLY.map((o) => ({
    ...o, x: 0, y: 0, vx: 0, vy: 0, ang: 0, phase: o.seed, R: 40, startle: 0,
    arms: Array.from({ length: 4 }, (_, k) => ({ k, pts: chain(16) })),
    tents: Array.from({ length: 12 }, (_, k) => ({ k, pts: chain(24) })),
    specks: Array.from({ length: 150 }, (_, i) => ({
      th: Math.PI + rnd(i, o.seed) * Math.PI, r: 0.25 + 0.75 * Math.sqrt(rnd(i + 99, o.seed)), s: 0.5 + rnd(i + 7, o.seed),
    })),
  }));

  // La cloche se contracte (plus étroite et plus haute) puis se relâche.
  function bellShape(j) {
    const p = Math.max(0, Math.sin(j.phase));
    return { p, w: j.R * (1 - 0.16 * p), hgt: j.R * (0.78 + 0.14 * p) };
  }
  const toWorld = (j, lx, ly) => ({
    x: j.x + lx * Math.cos(j.ang) - ly * Math.sin(j.ang),
    y: j.y + lx * Math.sin(j.ang) + ly * Math.cos(j.ang),
  });
  // Un filament suit son point d'attache avec du retard et ondule.
  function trail(j, c, anchor, len, lag, wave, dt, t) {
    const P = c.pts, n = P.length - 1, seg = len / n, k = dt == null ? 1 : 1 - Math.exp(-dt * lag);
    P[0].x = anchor.x; P[0].y = anchor.y;
    const down = j.ang + Math.PI / 2;
    for (let i = 1; i <= n; i++) {
      const p = P[i - 1], q = P[i];
      const rest = down + Math.sin(t * 1.1 - i * 0.35 + c.k * 1.7 + j.seed) * wave * (i / n);
      const cur = dt == null ? rest : Math.atan2(q.y - p.y, q.x - p.x);
      const a = cur + wrap(rest - cur) * k;
      q.x = p.x + Math.cos(a) * seg; q.y = p.y + Math.sin(a) * seg;
    }
  }
  function trails(j, dt, t) {
    const { w, hgt } = bellShape(j), nt = j.tents.length;
    for (const c of j.arms) trail(j, c, toWorld(j, (c.k - 1.5) * w * 0.22, -hgt * 0.05), j.R * (2.8 + 0.4 * (c.k % 2)), 2.2, 0.45, dt, t);
    for (const c of j.tents) trail(j, c, toWorld(j, ((c.k / (nt - 1)) * 2 - 1) * w * 0.92, -hgt * 0.02), j.R * 5.5, 1.6, 0.5, dt, t);
  }
  // Une méduse sortie par le haut revient par le bas, à côté du texte de l'accueil.
  function spawnX(j) {
    if (keepOut) {
      const lw = keepOut.l, rw = W - keepOut.r;
      return Math.random() < lw / (lw + rw) ? j.R + Math.random() * Math.max(1, lw - 2 * j.R) : keepOut.r + j.R + Math.random() * Math.max(1, rw - 2 * j.R);
    }
    return j.R * 2 + Math.random() * (W - j.R * 4);
  }

  function updateJelly(j, dt, t) {
    j.startle = Math.max(0, j.startle - dt);
    if (rush) { j.startle = Math.max(j.startle, 0.4); j.vy += rush.dir * j.R * 5 * dt; }
    j.phase += dt * TAU * (j.startle > 0 ? 0.9 : 0.42);
    const { p } = bellShape(j);
    // Poussée pendant la contraction, puis lente redescente.
    const thrust = p * p * j.R * 0.9;
    j.vx += Math.sin(j.ang) * thrust * dt;
    j.vy -= Math.cos(j.ang) * thrust * dt;
    j.vy += j.R * 0.06 * dt;
    const drag = Math.exp(-dt * 0.9);
    j.vx *= drag; j.vy *= drag;

    let tilt = Math.sin(t * 0.21 + j.seed) * 0.28;
    const m = j.R * 2;
    if (j.x < m) tilt = 0.35; else if (j.x > W - m) tilt = -0.35;
    if (keepOut && j.x > keepOut.l - m && j.x < keepOut.r + m) tilt = j.x < (keepOut.l + keepOut.r) / 2 ? -0.4 : 0.4;
    // Effrayée par le curseur : elle pulse plus vite et s'éloigne.
    const dx = j.x - ptr.x, dy = j.y - ptr.y, d = Math.hypot(dx, dy);
    if (d < j.R * 4) { tilt = Math.max(-0.9, Math.min(0.9, Math.atan2(dx, -dy))); j.startle = 1.2; }
    j.ang += wrap(tilt - j.ang) * Math.min(1, dt * 0.8);

    j.x += j.vx * dt; j.y += j.vy * dt;
    if (j.y < -j.R * 3) { j.y = H + j.R * 5; j.x = spawnX(j); j.ang = 0; trails(j, null, t); }
    if (j.y > H + j.R * 8) j.y = H + j.R * 8;
    trails(j, dt, t);
  }

  function drawJelly(j, t) {
    const { p, w, hgt } = bellShape(j), R = j.R;
    g.save();
    g.lineCap = "round";
    // Longs filaments.
    g.beginPath();
    for (const c of j.tents) curve(c.pts, true);
    g.strokeStyle = "rgba(250,184,198,.6)";
    g.lineWidth = Math.max(0.7, R * 0.014);
    g.stroke();
    // Bras froncés.
    for (const c of j.arms) {
      const P = c.pts, n = P.length - 1, left = [], right = [];
      for (let i = 0; i <= n; i++) {
        const a0 = P[Math.max(i - 1, 0)], b0 = P[Math.min(i + 1, n)], a = Math.atan2(a0.y - b0.y, a0.x - b0.x);
        const wd = R * 0.22 * (1 - (i / n) * 0.6) * (0.5 + 0.5 * Math.abs(Math.sin(i * 1.9 + t * 1.4 + c.k)));
        left.push({ x: P[i].x + nx(a) * wd, y: P[i].y + ny(a) * wd });
        right.push({ x: P[i].x - nx(a) * wd, y: P[i].y - ny(a) * wd });
      }
      g.beginPath();
      curve(left, true);
      curve(right.slice().reverse(), false);
      g.closePath();
      g.fillStyle = "rgba(252,196,210,.58)";
      g.fill();
      g.beginPath();
      for (let i = 1; i <= n; i++) {
        for (const s of [left[i], right[i]]) {
          const rr = R * 0.05 * (1 - (i / n) * 0.5) * (0.6 + 0.4 * Math.sin(i * 2.7 + t * 2 + c.k));
          g.moveTo(s.x + rr, s.y);
          g.arc(s.x, s.y, rr, 0, TAU);
        }
      }
      g.fillStyle = "rgba(255,230,236,.42)";
      g.fill();
      g.beginPath();
      curve(P, true);
      g.strokeStyle = "rgba(255,240,244,.35)";
      g.lineWidth = R * 0.012;
      g.stroke();
    }

    // Cloche, dans le repère de la méduse.
    g.translate(j.x, j.y);
    g.rotate(j.ang);
    const bell = () => {
      g.beginPath();
      g.moveTo(-w, 0);
      g.bezierCurveTo(-w * 1.02, -hgt * 1.25, w * 1.02, -hgt * 1.25, w, 0);
      const lap = 14;
      for (let k = lap; k > 0; k--) {
        const xa = -w + (2 * w * k) / lap, xb = -w + (2 * w * (k - 1)) / lap;
        g.quadraticCurveTo((xa + xb) / 2, R * (0.08 + 0.05 * p), xb, 0);
      }
      g.closePath();
    };
    bell();
    const bg = g.createRadialGradient(0, -hgt * 0.55, R * 0.1, 0, -hgt * 0.4, R * 1.15);
    bg.addColorStop(0, "rgba(255,200,210,.85)"); bg.addColorStop(0.55, "rgba(250,150,172,.62)"); bg.addColorStop(1, "rgba(236,112,146,.45)");
    g.shadowColor = "rgba(255,140,170,.65)";
    g.shadowBlur = R * 0.9 * DPR;
    g.fillStyle = bg;
    g.fill();
    noShadow();

    g.save();
    bell();
    g.clip();
    // Gonades : quatre lobes plus lumineux.
    for (let k = 0; k < 4; k++) {
      const gx = (k - 1.5) * w * 0.32, gy = -hgt * (0.42 + 0.06 * Math.sin(k * 2 + t)), gw = w * 0.3;
      const rg = g.createRadialGradient(gx, gy, 0, gx, gy, gw);
      rg.addColorStop(0, "rgba(255,222,230,.75)"); rg.addColorStop(1, "rgba(255,214,222,0)");
      g.fillStyle = rg;
      g.fillRect(gx - gw, gy - gw, gw * 2, gw * 2);
    }
    // Granulations, dont certaines scintillent.
    g.beginPath();
    for (const s of j.specks) {
      const x = Math.cos(s.th) * w * s.r, y = Math.sin(s.th) * hgt * 1.05 * s.r, rr = R * 0.016 * s.s;
      g.moveTo(x + rr, y);
      g.arc(x, y, rr, 0, TAU);
    }
    g.fillStyle = "rgba(255,232,238,.85)";
    g.fill();
    g.beginPath();
    j.specks.forEach((s, i) => {
      if (i % 7 || Math.sin(t * 3 + s.th * 20) < 0.6) return;
      const x = Math.cos(s.th) * w * s.r, y = Math.sin(s.th) * hgt * 1.05 * s.r;
      g.moveTo(x + R * 0.02, y);
      g.arc(x, y, R * 0.02, 0, TAU);
    });
    g.fillStyle = "rgba(255,255,255,.9)";
    g.fill();
    g.restore();

    bell();
    g.strokeStyle = "rgba(255,210,220,.45)";
    g.lineWidth = R * 0.02;
    g.stroke();
    g.beginPath();
    g.ellipse(-w * 0.35, -hgt * 0.72, w * 0.28, hgt * 0.12, -0.5, 0, TAU);
    g.fillStyle = "rgba(255,255,255,.18)";
    g.fill();
    g.restore();
  }

  /* --- Neige marine : de fines particules qui dérivent, plus nettes au premier plan --- */
  const sc = sea.getContext("2d");
  const SNOW = Array.from({ length: 110 }, (_, i) => ({ x: rnd(i, 3), y: rnd(i, 5), z: rnd(i, 9), s: rnd(i, 11) * 9 }));
  function drawSea(t, dt) {
    sc.setTransform(1, 0, 0, 1, 0, 0);
    sc.clearRect(0, 0, sea.width, sea.height);
    sc.drawImage(reef, 0, 0);
    sc.setTransform(DPR, 0, 0, DPR, 0, 0);
    drawFans(t);
    for (let band = 0; band < 3; band++) {
      sc.beginPath();
      for (const p of SNOW) {
        if (Math.min(2, Math.floor(p.z * 3)) !== band) continue;
        if (dt) {
          p.y += (0.006 + 0.014 * p.z) * dt;
          p.x += Math.sin(t * 0.3 + p.s) * 0.004 * dt;
          if (p.y > 1.02) { p.y = -0.02; p.x = rnd(p.s, t); }
          p.x = (p.x + 1) % 1;
        }
        const x = p.x * W, y = p.y * H, r = 0.5 + p.z * 1.8;
        sc.moveTo(x + r, y);
        sc.arc(x, y, r, 0, TAU);
      }
      sc.fillStyle = `rgba(${pal.snow},${pal.snowAlpha[band]})`;
      sc.fill();
    }
  }

  /* ---------- Le récif : dessiné une fois (à l'ouverture et au redimensionnement) ---------- */
  const reef = document.createElement("canvas"), rc = reef.getContext("2d");
  const mix = (c1, c2, k) => c1.map((v, i) => Math.round(v + (c2[i] - v) * k));
  const rgb = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  // Corail branchu : chaque branche se divise en deux ou trois, de la base sombre aux pointes lumineuses.
  function branch(x, y, ang, len, wid, l, max, c0, c1, seed) {
    const pts = [{ x, y }];
    let a = ang, px = x, py = y;
    for (let s = 1; s <= 4; s++) {
      a += (rnd(seed, s + l * 7) - 0.5) * 0.35;
      px += (Math.cos(a) * len) / 4; py += (Math.sin(a) * len) / 4;
      pts.push({ x: px, y: py });
    }
    const col = mix(c0, c1, l / max), end = mix(c0, c1, (l + 1) / max);
    rc.lineCap = "round"; rc.lineJoin = "round";
    rc.shadowColor = rgb(end, 0.4); rc.shadowBlur = wid * 1.6 * DPR;
    rc.beginPath(); rc.moveTo(x, y);
    for (const p of pts) rc.lineTo(p.x, p.y);
    rc.strokeStyle = rgb(col); rc.lineWidth = wid; rc.stroke();
    rc.shadowBlur = 0;
    rc.beginPath(); rc.moveTo(x - wid * 0.2, y - wid * 0.15);
    for (const p of pts) rc.lineTo(p.x - wid * 0.2, p.y - wid * 0.15);
    rc.strokeStyle = rgb(mix(col, [255, 255, 255], 0.3), 0.45); rc.lineWidth = wid * 0.32; rc.stroke();
    // grain : petites aspérités claires
    rc.fillStyle = rgb(mix(end, [255, 255, 255], 0.4), 0.55);
    pts.forEach((p, i) => {
      rc.beginPath(); rc.arc(p.x + (rnd(seed, i + 20) - 0.5) * wid * 0.6, p.y + (rnd(seed, i + 30) - 0.5) * wid * 0.6, wid * 0.11, 0, TAU); rc.fill();
    });
    if (l >= max - 1 || len < 5) {
      rc.shadowColor = rgb(c1, 0.7); rc.shadowBlur = wid * 2.5 * DPR;
      rc.beginPath(); rc.arc(px, py, wid * 0.62, 0, TAU);
      rc.fillStyle = rgb(mix(c1, [255, 255, 255], 0.15)); rc.fill();
      rc.shadowBlur = 0;
      return;
    }
    const n = 2 + (rnd(seed, l + 3) > 0.6 ? 1 : 0);
    for (let b = 0; b < n; b++) {
      const da = (b - (n - 1) / 2) * 0.55 + (rnd(seed + b, l) - 0.5) * 0.3;
      branch(px, py, a + da, len * (0.7 + rnd(seed, b + l) * 0.15), wid * 0.72, l + 1, max, c0, c1, seed * 1.7 + b + 1);
    }
  }

  // Corail cerveau : un dôme parcouru de crêtes claires sinueuses.
  function brainCoral(cx, by, rx, ry, c0, c1, seed) {
    rc.save();
    rc.beginPath(); rc.ellipse(cx, by, rx, ry, 0, Math.PI, TAU); rc.closePath();
    const gr = rc.createRadialGradient(cx - rx * 0.3, by - ry * 0.75, ry * 0.1, cx, by - ry * 0.3, rx * 1.1);
    gr.addColorStop(0, rgb(c1)); gr.addColorStop(0.6, rgb(c0)); gr.addColorStop(1, rgb(mix(c0, [0, 0, 0], 0.5)));
    rc.shadowColor = rgb(c1, 0.45); rc.shadowBlur = 22 * DPR;
    rc.fillStyle = gr; rc.fill();
    rc.shadowBlur = 0;
    rc.clip();
    rc.strokeStyle = "rgba(255,226,244,.7)"; rc.lineWidth = Math.max(1, rx * 0.022); rc.lineCap = "round";
    for (let i = 0; i < 30; i++) {
      let x = cx + (rnd(seed, i) - 0.5) * rx * 2, y = by - rnd(seed, i + 50) * ry, a = rnd(seed, i + 9) * TAU;
      rc.beginPath(); rc.moveTo(x, y);
      for (let s = 0; s < 34; s++) {
        a += (rnd(seed + i, s) - 0.5) * 1.1;
        x += Math.cos(a) * rx * 0.028; y += Math.sin(a) * rx * 0.028;
        rc.lineTo(x, y);
      }
      rc.stroke();
    }
    rc.restore();
  }

  // Corail bulle : une grappe de petites sphères turquoise.
  function bubbleCoral(cx, by, r, c0, c1, seed) {
    const balls = [];
    for (let i = 0; i < 46; i++) {
      const a = Math.PI + rnd(seed, i) * Math.PI, d = Math.sqrt(rnd(seed, i + 40)) * r;
      balls.push({ x: cx + Math.cos(a) * d, y: by + Math.sin(a) * d * 0.85, s: r * (0.08 + rnd(seed, i + 80) * 0.1) });
    }
    balls.sort((p, q) => p.y - q.y);
    rc.shadowColor = rgb(c1, 0.35); rc.shadowBlur = 10 * DPR;
    for (const b of balls) {
      const gr = rc.createRadialGradient(b.x - b.s * 0.35, b.y - b.s * 0.35, b.s * 0.1, b.x, b.y, b.s);
      gr.addColorStop(0, rgb(c1)); gr.addColorStop(1, rgb(c0));
      rc.fillStyle = gr;
      rc.beginPath(); rc.arc(b.x, b.y, b.s, 0, TAU); rc.fill();
    }
    rc.shadowBlur = 0;
  }

  // Corail rosette : des couronnes de pétales, du menthe au crème.
  function rosette(cx, cy, r, seed) {
    rc.shadowColor = "rgba(190,240,220,.35)"; rc.shadowBlur = 12 * DPR;
    for (let ring = 0; ring < 4; ring++) {
      const rr = r * (1 - ring * 0.22), n = 12 - ring * 2, col = mix([120, 180, 170], [250, 236, 200], ring / 3);
      for (let k = 0; k < n; k++) {
        const a = (k / n) * TAU + ring * 0.4 + rnd(seed, k + ring * 20) * 0.2;
        const px = cx + Math.cos(a) * rr * 0.55, py = cy + Math.sin(a) * rr * 0.4;
        rc.beginPath(); rc.ellipse(px, py, rr * 0.38, rr * 0.2, a, 0, TAU);
        rc.fillStyle = rgb(col, 0.9); rc.fill();
        rc.strokeStyle = rgb(mix(col, [255, 255, 255], 0.4), 0.6); rc.lineWidth = 1; rc.stroke();
      }
    }
    rc.shadowBlur = 0;
  }

  // Coraux en doigts, bleu ardoise et granuleux.
  function fingers(x, by, hgt, wid, seed) {
    for (let k = 0; k < 6; k++) {
      const fx = x + (rnd(seed, k) - 0.5) * wid * 4, fh = hgt * (0.55 + rnd(seed, k + 9) * 0.45), lean = (rnd(seed, k + 3) - 0.5) * 0.5;
      const tx = fx + Math.sin(lean) * fh, ty = by - fh;
      rc.lineCap = "round";
      rc.beginPath(); rc.moveTo(fx, by); rc.quadraticCurveTo(fx, by - fh * 0.6, tx, ty);
      rc.strokeStyle = "rgb(96,118,160)"; rc.lineWidth = wid; rc.stroke();
      rc.beginPath(); rc.moveTo(fx - wid * 0.2, by); rc.quadraticCurveTo(fx - wid * 0.2, by - fh * 0.6, tx - wid * 0.2, ty);
      rc.strokeStyle = "rgba(170,190,225,.45)"; rc.lineWidth = wid * 0.35; rc.stroke();
      rc.fillStyle = "rgba(190,205,235,.5)";
      for (let d = 0; d < 14; d++) {
        const s = rnd(seed + k, d), px = lerp(fx, tx, s) + (rnd(seed + k, d + 40) - 0.5) * wid * 0.7, py = lerp(by, ty, s);
        rc.beginPath(); rc.arc(px, py, wid * 0.09, 0, TAU); rc.fill();
      }
    }
  }

  function buildReef() {
    reef.width = Math.round(W * DPR); reef.height = Math.round(H * DPR);
    rc.setTransform(DPR, 0, 0, DPR, 0, 0);
    rc.clearRect(0, 0, W, H);
    const u = Math.min(W, H * 1.5) / 100, B = H + 2;

    // Rochers du fond, plus hauts sur les côtés.
    rc.beginPath(); rc.moveTo(0, H);
    for (let i = 0; i <= 60; i++) {
      const x = (i / 60) * W, side = Math.abs(x / W - 0.5) * 2;
      rc.lineTo(x, B - (2.5 + rnd(i, 1) * 2.5 + side * side * 7) * u);
    }
    rc.lineTo(W, H); rc.closePath();
    const rg = rc.createLinearGradient(0, H - 12 * u, 0, H);
    rg.addColorStop(0, pal.rock[0]); rg.addColorStop(1, pal.rock[1]);
    rc.fillStyle = rg; rc.fill();

    fingers(W * 0.03, B - 2 * u, 18 * u, 1.6 * u, 3);
    fingers(W * 0.97, B - 2 * u, 15 * u, 1.4 * u, 8);
    bubbleCoral(W * 0.07, B - 3 * u, 6 * u, [30, 96, 120], [150, 232, 220], 4);
    bubbleCoral(W * 0.87, B - 4 * u, 5 * u, [30, 96, 120], [150, 232, 220], 9);
    bubbleCoral(W * 0.58, B - 1.5 * u, 3.4 * u, [30, 96, 120], [150, 232, 220], 13);
    branch(W * 0.12, B - 3 * u, -Math.PI / 2 - 0.1, 7 * u, 2.2 * u, 0, 5, [208, 70, 110], [255, 204, 142], 2.3);
    branch(W * 0.9, B - 4 * u, -Math.PI / 2 + 0.15, 7.5 * u, 2.3 * u, 0, 5, [196, 60, 112], [255, 178, 124], 5.1);
    branch(W * 0.8, B - 2 * u, -Math.PI / 2 - 0.2, 5.5 * u, 1.8 * u, 0, 4, [210, 90, 90], [255, 214, 150], 7.7);
    branch(W * 0.42, B - 1 * u, -Math.PI / 2, 3.8 * u, 1.3 * u, 0, 4, [200, 80, 120], [255, 196, 160], 11.2);
    brainCoral(W * 0.22, B - 1.5 * u, 7 * u, 5.5 * u, [140, 34, 104], [236, 112, 172], 6);
    brainCoral(W * 0.72, B - 1 * u, 6 * u, 4.6 * u, [124, 30, 96], [226, 104, 166], 14);
    rosette(W * 0.3, B - 2 * u, 4 * u, 2);
    rosette(W * 0.5, B - 1 * u, 3 * u, 5);

    // Voile d'eau : le récif se fond dans la profondeur.
    rc.globalCompositeOperation = "source-atop";
    const hz = rc.createLinearGradient(0, H - 35 * u, 0, H);
    hz.addColorStop(0, pal.haze[0]); hz.addColorStop(1, pal.haze[1]);
    rc.fillStyle = hz; rc.fillRect(0, 0, W, H);
    rc.globalCompositeOperation = "source-over";
  }

  function drawFans(t) {
    const u = Math.min(W, H * 1.5) / 100;
    for (const f of FANS) {
      const bx = f.fx * W, by = H - 3 * u, hh = Math.min(f.h * H, 20 * u);
      const tilt = f.a + Math.sin(t * 0.4 + f.seed) * 0.06, pts = [];
      for (let i = 0; i <= 90; i++) {
        const q = i / 90, a = tilt - f.sp + q * f.sp * 2;
        const r = hh * (0.82 + 0.18 * Math.sin(q * Math.PI)) + hh * 0.06 * Math.sin(q * 40 + t * 0.8 + f.seed) + hh * 0.035 * Math.sin(q * 17 - t * 0.5);
        pts.push({ x: bx + Math.cos(a) * r, y: by + Math.sin(a) * r });
      }
      sc.beginPath(); sc.moveTo(bx, by);
      curve(pts, false, sc); sc.closePath();
      const gr = sc.createRadialGradient(bx, by, 0, bx, by, hh);
      gr.addColorStop(0, "rgba(200,70,124,.85)"); gr.addColorStop(0.55, "rgba(238,150,196,.75)"); gr.addColorStop(1, "rgba(150,160,240,.62)");
      sc.shadowColor = "rgba(240,140,200,.35)"; sc.shadowBlur = 18 * DPR;
      sc.fillStyle = gr; sc.fill();
      sc.shadowBlur = 0;
      sc.beginPath();
      for (let v = 0; v <= 14; v++) {
        const p = pts[Math.round((v / 14) * 90)];
        sc.moveTo(bx, by);
        sc.quadraticCurveTo(lerp(bx, p.x, 0.5) + Math.sin(v + f.seed) * hh * 0.04, lerp(by, p.y, 0.5), lerp(bx, p.x, 0.95), lerp(by, p.y, 0.95));
      }
      sc.strokeStyle = "rgba(190,50,110,.38)"; sc.lineWidth = 1.2; sc.stroke();
      sc.beginPath(); curve(pts, true, sc);
      sc.strokeStyle = "rgba(255,222,240,.65)"; sc.lineWidth = 1.6; sc.stroke();
    }
  }

  /* ---------- Étoiles de mer ---------- */
  function updateStar(s, dt, t) {
    s.x += s.dir * 3 * dt;
    s.rot += Math.sin(t * 0.1 + s.seed) * 0.02 * dt;
    if (s.x < s.R) s.dir = 1; else if (s.x > W - s.R) s.dir = -1;
  }
  function drawStar(s, t) {
    const R = s.R;
    g.save();
    g.translate(s.x, s.y);
    g.rotate(s.rot);
    const tips = [];
    g.beginPath();
    for (let k = 0; k < 5; k++) {
      const a = (k / 5) * TAU + Math.sin(t * 0.5 + k * 1.3 + s.seed) * 0.07;
      const bend = Math.sin(t * 0.4 + k * 2.1 + s.seed) * R * 0.12, len = R * (1 + Math.sin(t * 0.3 + k) * 0.04);
      const ca = Math.cos(a), sa = Math.sin(a), px = -sa, py = ca;
      const tip = { x: ca * len + px * bend, y: sa * len + py * bend }, dir = { x: ca, y: sa };
      tips.push({ tip, a, bend });
      const v1a = a - Math.PI / 5;
      const v1 = { x: Math.cos(v1a) * R * 0.38, y: Math.sin(v1a) * R * 0.38 };
      if (k === 0) g.moveTo(v1.x, v1.y);
      const w = R * 0.08;
      g.quadraticCurveTo(Math.cos(a - 0.14) * R * 0.72 + px * bend * 0.5, Math.sin(a - 0.14) * R * 0.72 + py * bend * 0.5, tip.x - px * w, tip.y - py * w);
      g.quadraticCurveTo(tip.x + dir.x * w * 1.6, tip.y + dir.y * w * 1.6, tip.x + px * w, tip.y + py * w);
      const v2a = a + Math.PI / 5;
      g.quadraticCurveTo(Math.cos(a + 0.14) * R * 0.72 + px * bend * 0.5, Math.sin(a + 0.14) * R * 0.72 + py * bend * 0.5, Math.cos(v2a) * R * 0.38, Math.sin(v2a) * R * 0.38);
    }
    g.closePath();
    const gr = g.createRadialGradient(0, 0, R * 0.05, 0, 0, R);
    gr.addColorStop(0, "rgb(150,58,112)"); gr.addColorStop(0.35, "rgb(232,112,64)"); gr.addColorStop(1, "rgb(255,196,140)");
    g.shadowColor = pal.starShadow; g.shadowBlur = R * 0.4 * DPR; g.shadowOffsetX = R * 0.12 * DPR; g.shadowOffsetY = R * 0.18 * DPR;
    g.fillStyle = gr; g.fill();
    noShadow();
    g.save();
    g.clip();
    // Bande violette le long de chaque bras, et petites bosses claires de part et d'autre.
    g.lineCap = "round";
    for (const { tip, a, bend } of tips) {
      g.beginPath(); g.moveTo(0, 0);
      g.quadraticCurveTo(Math.cos(a) * R * 0.5 - Math.sin(a) * bend * 0.5, Math.sin(a) * R * 0.5 + Math.cos(a) * bend * 0.5, tip.x, tip.y);
      g.strokeStyle = "rgba(128,64,150,.8)"; g.lineWidth = R * 0.13; g.stroke();
    }
    g.fillStyle = "rgba(255,236,210,.9)";
    g.beginPath();
    tips.forEach(({ tip, a }, k) => {
      for (let i = 2; i < 13; i++) {
        const q = i / 13, w = R * 0.2 * (1 - q * 0.7);
        const cx = lerp(0, tip.x, q), cy = lerp(0, tip.y, q);
        for (const side of [-1, 1]) {
          for (const o of [0.45, 0.8]) {
            const x = cx - Math.sin(a) * side * w * o, y = cy + Math.cos(a) * side * w * o, r = R * 0.024 * (1 - q * 0.4) * (0.7 + rnd(i + k * 13, o * side + s.seed) * 0.6);
            g.moveTo(x + r, y); g.arc(x, y, r, 0, TAU);
          }
        }
      }
    });
    g.fill();
    g.fillStyle = "rgba(196,140,220,.85)";
    g.beginPath();
    for (let i = 0; i < 40; i++) {
      const a = rnd(i, s.seed) * TAU, d = Math.sqrt(rnd(i + 50, s.seed)) * R * 0.3, r = R * 0.022;
      g.moveTo(Math.cos(a) * d + r, Math.sin(a) * d); g.arc(Math.cos(a) * d, Math.sin(a) * d, r, 0, TAU);
    }
    g.fill();
    g.restore();
    g.restore();
  }

  /* ---------- La pieuvre ---------- */
  const octo = {
    x: 0, y: 0, ang: -Math.PI / 2, vx: 0, vy: 0, phase: 0, R: 40, startle: 0, s1: 3.3,
    arms: Array.from({ length: 8 }, (_, k) => ({ k, pts: chain(14) })),
    spots: Array.from({ length: 30 }, (_, i) => ({
      u: rnd(i, 1) * 2 - 1, v: rnd(i, 2) * 2 - 1, r: 0.05 + rnd(i, 3) * 0.08,
      c: [[255, 150, 60], [255, 214, 80], [90, 120, 232], [232, 60, 72]][Math.floor(rnd(i, 4) * 4)],
    })).filter((p) => p.u * p.u + p.v * p.v < 0.85),
  };
  const inks = [];
  function octoArms(dt, t) {
    const o = octo, R = o.R, dx = Math.cos(o.ang), dy = Math.sin(o.ang), back = o.ang + Math.PI;
    const jet = Math.max(0, Math.sin(o.phase)) ** 3, n = 13, seg = (R * 2.3) / n, k = dt == null ? 1 : 1 - Math.exp(-dt * 5);
    const base = { x: o.x - dx * R * 0.5, y: o.y - dy * R * 0.5 };
    for (const arm of o.arms) {
      const off = (arm.k - 3.5) / 3.5, P = arm.pts;
      P[0].x = base.x + Math.cos(back + off * 1.2) * R * 0.32;
      P[0].y = base.y + Math.sin(back + off * 1.2) * R * 0.32;
      let rest = back + off * (0.3 + 0.75 * (1 - jet));
      for (let i = 1; i <= n; i++) {
        const p = P[i - 1], q = P[i];
        if (i > 1) rest += Math.sin(t * 1.1 + arm.k * 0.9 - i * 0.3) * 0.2 * (i / n) + (1 - jet) * 0.05 * Math.sign(off || 1);
        const cur = dt == null ? rest : Math.atan2(q.y - p.y, q.x - p.x);
        const a = cur + wrap(rest - cur) * k;
        q.x = p.x + Math.cos(a) * seg; q.y = p.y + Math.sin(a) * seg;
      }
    }
  }
  function updateOcto(dt, t) {
    const o = octo, R = o.R;
    o.startle = Math.max(0, o.startle - dt);
    if (rush) { o.startle = Math.max(o.startle, 0.4); o.vy += rush.dir * o.R * 6 * dt; }
    o.phase += dt * TAU * (o.startle > 0 ? 0.9 : 0.33);
    const jet = Math.max(0, Math.sin(o.phase)) ** 3;
    // Direction : errance, bords (elle peut sortir puis revient), texte de l'accueil, curseur.
    const B = R * 3, m = R * 2;
    const edge = (d, lim) => (d < lim ? Math.min(2, (lim - d) / lim) : 0);
    let ax = edge(o.x + B, m) - edge(W + B - o.x, m), ay = edge(o.y + B, m) - edge(H * 0.85 - o.y, m);
    if (keepOut) {
      const cx = Math.max(keepOut.l, Math.min(o.x, keepOut.r)), cy = Math.max(keepOut.t, Math.min(o.y, keepOut.b));
      const ox = o.x - cx, oy = o.y - cy, od = Math.hypot(ox, oy), pad = R * 2.5;
      if (od < pad) {
        const kk = (1 - od / pad) * 2.2;
        if (od > 1) { ax += (ox / od) * kk; ay += (oy / od) * kk; } else ax += (o.x < (keepOut.l + keepOut.r) / 2 ? -1 : 1) * kk;
      }
    }
    const px = o.x - ptr.x, py = o.y - ptr.y, pd = Math.hypot(px, py);
    if (pd < R * 4 && ptr.speed > 380) {
      ax += (px / pd) * 3; ay += (py / pd) * 3;
      if (!o.startle) {
        o.startle = 1.5;
        o.phase = Math.PI / 2;  // jet immédiat
        for (let i = 0; i < 9; i++) {
          const a = o.ang + Math.PI + (rnd(i, t) - 0.5) * 1.4, v = R * (0.6 + rnd(i + 9, t));
          inks.push({ x: o.x, y: o.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, age: 0 });
        }
      }
    }
    let turn = (Math.sin(t * 0.37 + o.s1) + 0.6 * Math.sin(t * 0.83)) * 0.35;
    if (Math.hypot(ax, ay) > 0.04) turn = Math.max(-1.4, Math.min(1.4, wrap(Math.atan2(ay, ax) - o.ang) * 2));
    o.ang = wrap(o.ang + turn * dt * (0.4 + jet));
    const thrust = jet * R * (o.startle > 0 ? 14 : 6);
    o.vx += Math.cos(o.ang) * thrust * dt; o.vy += Math.sin(o.ang) * thrust * dt;
    const drag = Math.exp(-dt * 1.3);
    o.vx *= drag; o.vy *= drag;
    o.x += o.vx * dt; o.y += o.vy * dt;
    octoArms(dt, t);
    for (let i = inks.length - 1; i >= 0; i--) {
      const p = inks[i];
      p.age += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= Math.exp(-dt * 1.5); p.vy *= Math.exp(-dt * 1.5);
      if (p.age > 3) inks.splice(i, 1);
    }
  }
  function drawOcto(t) {
    const o = octo, R = o.R, dx = Math.cos(o.ang), dy = Math.sin(o.ang), pxn = -dy, pyn = dx;
    g.save();
    for (const p of inks) {
      const r = R * (0.3 + p.age * 0.7), a = 0.5 * (1 - p.age / 3);
      const ig = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      ig.addColorStop(0, `rgba(24,10,44,${a})`); ig.addColorStop(1, "rgba(24,10,44,0)");
      g.fillStyle = ig; g.fillRect(p.x - r, p.y - r, r * 2, r * 2);
    }
    // Bras, avec une rangée de ventouses du côté intérieur.
    for (const arm of o.arms) {
      const P = arm.pts, n = P.length - 1, left = [], right = [], ws = [], angs = [];
      for (let i = 0; i <= n; i++) {
        const a0 = P[Math.max(i - 1, 0)], b0 = P[Math.min(i + 1, n)], a = Math.atan2(a0.y - b0.y, a0.x - b0.x);
        const w = R * 0.19 * (1 - i / n) ** 0.8 + R * 0.025;
        ws.push(w); angs.push(a);
        left.push({ x: P[i].x + nx(a) * w, y: P[i].y + ny(a) * w });
        right.push({ x: P[i].x - nx(a) * w, y: P[i].y - ny(a) * w });
      }
      g.beginPath(); curve(left, true); curve(right.slice().reverse(), false); g.closePath();
      const ag = g.createLinearGradient(P[0].x, P[0].y, P[n].x, P[n].y);
      ag.addColorStop(0, "rgb(226,104,132)"); ag.addColorStop(1, "rgb(246,172,186)");
      g.fillStyle = ag; g.fill();
      g.strokeStyle = "rgba(150,40,80,.35)"; g.lineWidth = 1; g.stroke();
      const side = arm.k < 4 ? 1 : -1;
      g.beginPath();
      for (let i = 2; i < n; i++) {
        const w = ws[i], x = P[i].x + nx(angs[i]) * side * w * 0.55, y = P[i].y + ny(angs[i]) * side * w * 0.55, r = w * 0.42;
        g.moveTo(x + r, y); g.arc(x, y, r, 0, TAU);
      }
      g.fillStyle = "rgba(255,222,228,.95)"; g.fill();
      g.strokeStyle = "rgba(190,90,120,.5)"; g.lineWidth = 0.8; g.stroke();
    }
    // Tête et manteau tacheté, dont les couleurs pulsent.
    const hx = o.x - dx * R * 0.15, hy = o.y - dy * R * 0.15;
    g.beginPath(); g.ellipse(hx, hy, R * 0.6, R * 0.55, o.ang, 0, TAU);
    g.fillStyle = "rgb(232,112,138)"; g.fill();
    const mx = o.x + dx * R * 0.5, my = o.y + dy * R * 0.5;
    g.beginPath(); g.ellipse(mx, my, R * 0.95, R * 0.75, o.ang, 0, TAU);
    const mg = g.createRadialGradient(mx - R * 0.3, my - R * 0.35, R * 0.1, mx, my, R);
    mg.addColorStop(0, "rgb(255,182,186)"); mg.addColorStop(0.6, "rgb(234,104,130)"); mg.addColorStop(1, "rgb(196,66,110)");
    g.shadowColor = "rgba(255,120,150,.4)"; g.shadowBlur = R * 0.5 * DPR;
    g.fillStyle = mg; g.fill();
    noShadow();
    g.save(); g.clip();
    for (const [i, s] of o.spots.entries()) {
      const sx = mx + dx * s.u * R * 0.9 + pxn * s.v * R * 0.7, sy = my + dy * s.u * R * 0.9 + pyn * s.v * R * 0.7;
      g.beginPath(); g.arc(sx, sy, s.r * R, 0, TAU);
      g.fillStyle = rgb(s.c, 0.5 + 0.3 * Math.sin(t * 2 + i)); g.fill();
    }
    g.restore();
    g.beginPath(); g.ellipse(mx - R * 0.25, my - R * 0.3, R * 0.3, R * 0.14, -0.6, 0, TAU);
    g.fillStyle = "rgba(255,255,255,.22)"; g.fill();
    // Yeux en relief, iris doré et pupille horizontale.
    for (const side of [1, -1]) {
      const ex = hx + pxn * side * R * 0.42, ey = hy + pyn * side * R * 0.42;
      g.beginPath(); g.arc(ex, ey, R * 0.2, 0, TAU); g.fillStyle = "rgb(240,140,160)"; g.fill();
      g.beginPath(); g.arc(ex, ey, R * 0.12, 0, TAU); g.fillStyle = "rgb(232,174,64)"; g.fill();
      g.beginPath(); g.ellipse(ex, ey, R * 0.085, R * 0.04, o.ang + Math.PI / 2, 0, TAU); g.fillStyle = "#0a0610"; g.fill();
      g.beginPath(); g.arc(ex - R * 0.04, ey - R * 0.05, R * 0.03, 0, TAU); g.fillStyle = "rgba(255,255,255,.9)"; g.fill();
    }
    g.restore();
  }

  // Place (ou replace) les habitants du récif selon la taille de l'écran.
  function placeSeaLife(first) {
    const u = Math.min(W, H * 1.5) / 100;
    for (const s of stars) {
      s.R = Math.max(22, Math.min(4.2 * u, 48)) * s.size;
      if (first) s.x = s.fx * W;
      s.y = H - s.R * 0.85;
    }
    octo.R = Math.max(26, Math.min(5 * u, 56));
    if (first) { octo.x = W * 0.92; octo.y = H * 0.4; }
    octoArms(null, 0);
  }

  /* --- Placement initial --- */
  function layout(f) {
    const dx = Math.cos(f.h), dy = Math.sin(f.h);
    f.joints.forEach((j, i) => { j.x = f.hx - dx * f.seg * i; j.y = f.hy - dy * f.seg * i; });
    swim(f);
    for (const vs of f.veils) placeVeil(f, vs, null);
  }
  function resize() {
    const pw = W, ph = H;
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    pond.width = Math.round(W * DPR); pond.height = Math.round(H * DPR);
    sea.width = pond.width; sea.height = pond.height;
    for (const f of fishes) {
      size(f);
      if (pw) { f.hx *= W / pw; f.hy *= H / ph; } else { f.hx = f.x * W; f.hy = f.y * H; }
      layout(f);
    }
    for (const j of jellies) {
      const pr = j.R;
      j.R = Math.max(32, Math.min(0.075 * Math.min(W * 0.9, H), 72)) * j.size;
      if (pw) { j.x *= W / pw; j.y *= H / ph; } else { j.x = j.fx * W; j.y = j.fy * H; }
      if (pr !== j.R || !pw) trails(j, null, 0);
    }
    buildReef();
    placeSeaLife(!pw);
    updateKeepOut();
    if (reduce.matches) { render(0); drawSea(0, 0); }
  }

  /* --- Interaction : curseur, nourriture --- */
  const ptr = { x: -1e4, y: -1e4, t: 0, speed: 0 };
  const onPointerMove = (e) => {
    const now = performance.now();
    if (ptr.t) {
      const dt = (now - ptr.t) / 1000;
      if (dt > 0) ptr.speed = Math.max(ptr.speed, Math.min(Math.hypot(e.clientX - ptr.x, e.clientY - ptr.y) / dt, 3000));
    }
    ptr.x = e.clientX; ptr.y = e.clientY; ptr.t = now;
  };
  const onPointerLeave = () => { ptr.x = ptr.y = -1e4; ptr.t = 0; };

  const foods = [], rings = [], ripples = [];
  const onPointerDown = (e) => {
    if (reduce.matches || isUI(e.target)) return;
    if (ripples.length < 8) ripples.push({ x: e.clientX, y: e.clientY, age: 0 });
    if (foods.length < 6) foods.push({ x: e.clientX, y: e.clientY, age: 0, s: Math.random() * 9 });
  };

  // Zone de texte que les poissons contournent (fournie par l'application, ou null).
  let keepOut = null;
  function updateKeepOut() {
    const r = getAvoidRect();
    keepOut = r ? { l: r.left, r: r.right, t: r.top, b: r.bottom } : null;
  }

  /* --- Comportement --- */
  function steer(f, dt, t) {
    // Les poissons peuvent sortir entièrement de l'écran : ils ne font demi-tour qu'une fois dehors.
    const L = f.L, m = L * 0.3 + 40, B = L * 1.1;
    const edge = (d, lim) => (d < lim ? Math.min(2, (lim - d) / lim) : 0);
    let ax = edge(f.hx + B, m) - edge(W + B - f.hx, m);
    let ay = edge(f.hy + B, m) - edge(H + B - f.hy, m);
    if (rush) { ay += rush.dir * 2.6; ax *= 0.4; }

    if (keepOut) {
      const cx = Math.max(keepOut.l, Math.min(f.hx, keepOut.r)), cy = Math.max(keepOut.t, Math.min(f.hy, keepOut.b));
      const ox = f.hx - cx, oy = f.hy - cy, od = Math.hypot(ox, oy), pad = L * 0.55;
      if (od < pad) {
        const k = (1 - od / pad) * (f.food ? 0.6 : 2.2);
        if (od > 1) { ax += (ox / od) * k; ay += (oy / od) * k; }
        else ax += (f.hx < (keepOut.l + keepOut.r) / 2 ? -1 : 1) * k;
      }
    }

    // Un curseur rapide effraie ; un curseur calme attire les curieux.
    const dx = f.hx - ptr.x, dy = f.hy - ptr.y, d = Math.hypot(dx, dy), R = 240;
    let fleeing = 0;
    if (d < R && ptr.speed > 380) {
      fleeing = 1 - d / R;
      ax += (dx / d) * fleeing * 2.6; ay += (dy / d) * fleeing * 2.6;
    } else if (d < R * 1.4 && d > L * 0.3 && !f.food) {
      const c = (1 - d / (R * 1.4)) * 0.35;
      ax -= (dx / d) * c; ay -= (dy / d) * c;
    }

    if (f.food) {
      const fx = f.food.x - f.hx, fy = f.food.y - f.hy, fd = Math.hypot(fx, fy) || 1;
      ax += (fx / fd) * 1.8; ay += (fy / fd) * 1.8;
      if (fd < L * 0.12) {
        f.food.eaten = true;
        rings.push({ x: f.food.x, y: f.food.y, age: 0 });
        f.boost = 2.2;
      }
    }

    const wander = (Math.sin(t * f.f1 + f.s1) + 0.6 * Math.sin(t * f.f2 * 2.3 + f.s2)) * f.turn * 0.55;
    let turn = wander;
    if (Math.hypot(ax, ay) > 0.04) {
      const err = wrap(Math.atan2(ay, ax) - f.h);
      turn = Math.max(-1.5, Math.min(1.5, err * 2.2));
    }
    f.h = wrap(f.h + turn * dt);

    const target = 1 + fleeing * 1.8 + (f.food ? 0.6 : 0) + (rush ? 1.2 : 0);
    f.boost += (target - f.boost) * Math.min(1, dt * 2.5);
    // Nage par à-coups : quelques battements de queue, puis une glissade.
    const c = 0.5 + 0.5 * Math.sin(t * (0.45 + f.f2) + f.s2);
    const drive = Math.min(1, 0.25 + 0.75 * c * c + (f.boost - 1) * 0.6);
    f.glide = lerp(f.glide ?? drive, drive, Math.min(1, dt * 2));
    const v = f.speed * f.boost * (0.55 + 0.6 * f.glide);
    f.hx += Math.cos(f.h) * v * dt;
    f.hy += Math.sin(f.h) * v * dt;

    // La nage s'accélère et s'amplifie avec la vitesse.
    f.phase += TAU * f.freq * (0.35 + 0.75 * f.glide) * (0.8 + 0.4 * f.boost) * dt;
    f.energy = 0.45 + 0.65 * f.glide + 0.25 * (f.boost - 1);
    follow(f);
    swim(f);
    for (const vs of f.veils) placeVeil(f, vs, dt);
  }

  function feed(dt) {
    for (const f of fishes) f.food = null;
    for (let i = foods.length - 1; i >= 0; i--) {
      const p = foods[i];
      p.age += dt;
      p.y += 8 * dt;
      p.x += Math.sin(p.age * 1.5 + p.s) * 6 * dt;
      if (p.eaten || p.age > 14) { foods.splice(i, 1); continue; }
      let best = null, bd = Infinity;
      for (const f of fishes) {
        const d = Math.hypot(f.hx - p.x, f.hy - p.y);
        if (d < bd) { bd = d; best = f; }
      }
      if (best && (!best.food || bd < Math.hypot(best.hx - best.food.x, best.hy - best.food.y))) best.food = p;
    }
    for (let i = rings.length - 1; i >= 0; i--) if ((rings[i].age += dt) > 0.7) rings.splice(i, 1);
    for (let i = ripples.length - 1; i >= 0; i--) if ((ripples[i].age += dt) > 2) ripples.splice(i, 1);
  }

  function render(t) {
    g.setTransform(DPR, 0, 0, DPR, 0, 0);
    g.clearRect(0, 0, W, H);
    for (const p of foods) {
      const a = Math.min(1, (14 - p.age) / 2);
      g.beginPath(); g.arc(p.x, p.y, 4, 0, TAU);
      g.fillStyle = `rgba(214,150,70,${a})`; g.fill();
      g.beginPath(); g.arc(p.x - 1.2, p.y - 1.2, 1.4, 0, TAU);
      g.fillStyle = `rgba(255,240,210,${a})`; g.fill();
    }
    // Les méduses dérivent plus bas que les poissons, teintées par l'eau.
    for (const j of jellies) {
      drawJelly(j, t);
      g.globalCompositeOperation = "source-atop";
      g.fillStyle = `rgba(${pal.tint},${j.depth})`;
      g.fillRect(0, 0, W, H);
      g.globalCompositeOperation = "source-over";
    }
    // Poissons profonds d'abord (teintés par l'eau), puis la vie du récif, puis les poissons du premier plan.
    for (const f of fishes) {
      if (!f.depth) continue;
      drawFish(f, t);
      g.globalCompositeOperation = "source-atop";
      g.fillStyle = `rgba(${pal.tint},${f.depth})`;
      g.fillRect(0, 0, W, H);
      g.globalCompositeOperation = "source-over";
    }
    for (const st of stars) drawStar(st, t);
    drawOcto(t);
    for (const f of fishes) if (!f.depth) drawFish(f, t);
    for (const r of rings) {
      g.beginPath(); g.arc(r.x, r.y, 6 + r.age * 60, 0, TAU);
      g.strokeStyle = `rgba(255,255,255,${0.6 * (1 - r.age / 0.7)})`;
      g.lineWidth = 1.5; g.stroke();
    }
    // Ondulation au clic : trois anneaux nets qui s'élargissent, et un léger éclat au centre.
    for (const r of ripples) {
      if (r.age < 0.5) {
        const fl = g.createRadialGradient(r.x, r.y, 0, r.x, r.y, 46);
        fl.addColorStop(0, `rgba(200,220,255,${0.22 * (1 - r.age / 0.5)})`); fl.addColorStop(1, "rgba(200,220,255,0)");
        g.fillStyle = fl;
        g.fillRect(r.x - 46, r.y - 46, 92, 92);
      }
      for (let k = 0; k < 3; k++) {
        const a = r.age - k * 0.2;
        if (a <= 0) continue;
        const pr = Math.min(1, a / 1.6), e = 1 - (1 - pr) ** 3;
        g.beginPath();
        g.arc(r.x, r.y, 6 + e * (110 - k * 18), 0, TAU);
        g.strokeStyle = `rgba(214,228,255,${(1 - pr) ** 2 * (k ? 0.32 : 0.6)})`;
        g.lineWidth = 0.6 + 1.4 * (1 - pr);
        g.stroke();
      }
    }
  }

  let last = 0, raf = 0, sinceAvoid = 0;
  function frame(now) {
    const dt = Math.min((now - (last || now)) / 1000, 0.05);
    last = now;
    const t = now / 1000;
    // La zone de texte bouge avec l'onglet et le défilement : on la relit régulièrement.
    if ((sinceAvoid += dt) > 0.3) { sinceAvoid = 0; updateKeepOut(); }
    ptr.speed *= Math.exp(-dt * 5);
    if (rush && (rush.left -= dt) <= 0) rush = null;
    feed(dt);
    for (const f of fishes) steer(f, dt, t);
    for (const j of jellies) updateJelly(j, dt, t);
    for (const st of stars) updateStar(st, dt, t);
    updateOcto(dt, t);
    render(t);
    drawSea(t, dt);
    raf = requestAnimationFrame(frame);
  }

  // Avec « réduire les animations », le bassin est dessiné une fois, immobile.
  function start() {
    cancelAnimationFrame(raf);
    last = 0;
    if (reduce.matches) { render(0); drawSea(0, 0); } else raf = requestAnimationFrame(frame);
  }

  resize();
  start();
  addEventListener("resize", resize);
  addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerleave", onPointerLeave);
  document.addEventListener("pointerdown", onPointerDown);
  reduce.addEventListener("change", start);

  // Change de thème : le récif est redessiné avec la nouvelle palette (le reste suit à l'image suivante).
  function setTheme(name) {
    pal = PALETTES[name] || PALETTES.dark;
    buildReef();
    if (reduce.matches) { render(0); drawSea(0, 0); }
  }

  // Lance la ruée : `up` pour remonter vers la surface, `down` pour plonger.
  function rushTo(dir) {
    rush = { dir: dir === "up" ? -1 : 1, left: 1.7 };
  }

  function stop() {
    cancelAnimationFrame(raf);
    removeEventListener("resize", resize);
    removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerleave", onPointerLeave);
    document.removeEventListener("pointerdown", onPointerDown);
    reduce.removeEventListener("change", start);
  }

  return { setTheme, rushTo, stop };
}
