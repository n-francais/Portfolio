/* Les habitants du bassin : espèces de poissons, position de départ des créatures et du décor. */

// Largeurs du corps en fraction de sa longueur, de la tête vers la queue.
const KOI_W = [.15, .19, .215, .225, .225, .215, .2, .18, .155, .13, .105, .08, .06, .045];
const BETTA_W = [.2, .27, .3, .29, .26, .22, .18, .14, .11, .09];

// Les longueurs des voiles sont en fraction de la taille du poisson (f.L) ; le corps du
// combattant est court (bodyLen) et ses nageoires immenses, comme sur la référence.
const betta = (c) => ({
  widths: BETTA_W, bodyLen: .6, bend: .09, gill: .24, scaleSize: .03, wag: .07, wave: .9, nose: .55, whiskers: false, ...c,
  veils: [
    { at: .55, side: 1,  splay: .55, len: .6,  w0: .1,  w1: .44, segs: 10, lag: 3,   ruffle: .03,  flutter: .35, pleats: 20 },
    { at: .62, side: -1, splay: .6,  len: .64, w0: .1,  w1: .46, segs: 10, lag: 3,   ruffle: .03,  flutter: .35, pleats: 20 },
    { at: .98, side: 0,  splay: 0,   len: .85, w0: .08, w1: .74, segs: 12, lag: 3.5, ruffle: .045, flutter: .25, pleats: 26 },
    { at: .24, side: 1,  splay: 1.1, len: .14, w0: .015, w1: .1, segs: 3,  lag: 10,  ruffle: .008, flap: .35, flutter: .2, pleats: 6 },
    { at: .24, side: -1, splay: 1.1, len: .14, w0: .015, w1: .1, segs: 3,  lag: 10,  ruffle: .008, flap: .35, flutter: .2, pleats: 6 },
  ],
});
const koi = (c) => ({
  widths: KOI_W, bodyLen: 1, bend: .13, gill: .2, scaleSize: .022, wag: .07, wave: 1.05, nose: .62, whiskers: true, ...c,
  veils: [
    { at: .97, side: 0,  splay: 0,    len: .55, w0: .05, w1: .5,  segs: 9, lag: 6, ruffle: .025, flutter: .18, pleats: 18, fork: true },
    { at: .52, side: 1,  splay: .9,   len: .18, w0: .02, w1: .13, segs: 4, lag: 8, ruffle: .01,  flap: .2, flutter: .2, pleats: 8 },
    { at: .52, side: -1, splay: .9,   len: .18, w0: .02, w1: .13, segs: 4, lag: 8, ruffle: .01,  flap: .2, flutter: .2, pleats: 8 },
    { at: .17, side: 1,  splay: 1.05, len: .34, w0: .025, w1: .24, segs: 6, lag: 7, ruffle: .016, flap: .3, flutter: .2, pleats: 12 },
    { at: .17, side: -1, splay: 1.05, len: .34, w0: .025, w1: .24, segs: 6, lag: 7, ruffle: .016, flap: .3, flutter: .2, pleats: 12 },
  ],
});

export const SPECIES = {
  // Combattant doré (maquette et référence) : or au centre, bords blanc lavande.
  gold: betta({
    body: ["#f2c93c", "#f9e6a6", "#e6ad22"], scale: "rgba(140,88,0,.34)", scaleLight: "rgba(255,248,215,.4)",
    shade: "rgba(110,62,0,.55)", iris: ["#120a04", "#f0c75a", "#9a6a12"], eyeSize: .13, sheen: "rgba(255,248,220,.45)", patches: [],
    silk: ["rgba(240,186,34,.9)", "rgba(246,206,64,.8)", "rgba(252,240,196,.6)", "rgba(222,216,255,.2)"],
    strands: ["240,184,30", "250,214,96", "255,236,170", "226,160,20"], tip: "236,232,255", band: 5,
  }),
  // Combattant rose (référence) : voiles corail aux pointes blanches, stries plus sombres.
  rose: betta({
    body: ["#f6a2b0", "#fbc6cc", "#ec8598"], scale: "rgba(170,40,72,.36)", scaleLight: "rgba(255,236,240,.45)",
    shade: "rgba(120,20,60,.5)", iris: ["#0c0608", "#f0c2cc", "#8a3a52"], eyeSize: .13, sheen: "rgba(255,236,240,.5)", patches: [],
    silk: ["rgba(240,118,140,.85)", "rgba(248,150,166,.7)", "rgba(252,202,208,.5)", "rgba(255,240,240,.16)"],
    strands: ["238,104,128", "248,146,160", "220,72,104", "255,192,196"], tip: "255,244,244", band: 6,
  }),
  // Combattant « opale » (référence) : voiles striées bleu nuit, rose et pêche, écailles bleutées.
  opal: betta({
    body: ["#d2a9cf", "#ebc6cf", "#8c92d2"], scale: "rgba(56,68,172,.5)", scaleLight: "rgba(255,226,236,.45)",
    shade: "rgba(40,30,110,.5)", iris: ["#08060f", "#d2d9f6", "#5560a8"], eyeSize: .13, sheen: "rgba(255,236,244,.5)", patches: [],
    silk: ["rgba(110,116,206,.8)", "rgba(228,160,192,.65)", "rgba(250,202,182,.45)", "rgba(255,232,222,.14)"],
    strands: ["64,84,184", "236,150,182", "250,192,164", "44,52,140", "176,146,222"], tip: "255,226,214", band: 7,
  }),
  // Koï « butterfly » de la maquette : corps blanc, taches rouges et gris-bleu, voiles blanches et ardoise.
  koi: koi({
    body: ["#fbf6ef", "#f8f0e6", "#ece2d8"], scale: "rgba(140,40,20,.26)", scaleLight: "rgba(255,255,255,.3)",
    shade: "rgba(40,30,80,.5)", iris: ["#0c0810", "#efe2b8", "#a8823a"], eyeSize: .1, sheen: "rgba(255,255,255,.4)",
    patches: [
      { t: .1, s: 0, r: .5, c: "228,70,28" },
      { t: .27, s: -.12, r: .62, c: "234,85,34" },
      { t: .43, s: .18, r: .55, c: "228,70,28" },
      { t: .47, s: -.5, r: .32, c: "111,132,166" },
      { t: .6, s: -.05, r: .5, c: "239,106,44" },
      { t: .69, s: .46, r: .3, c: "111,132,166" },
    ],
    silk: ["rgba(252,250,247,.85)", "rgba(232,236,246,.7)", "rgba(170,186,216,.45)", "rgba(84,108,156,.18)"],
    strands: ["250,250,252", "222,230,244", "150,168,206"], tip: "96,118,166", band: 4,
    dorsal: "rgba(90,115,160,.55)",
  }),
  // Petit koï orangé.
  ogon: koi({
    body: ["#ffe0bd", "#ffcd9a", "#f2ad70"], scale: "rgba(160,64,8,.32)", scaleLight: "rgba(255,240,220,.4)",
    shade: "rgba(140,60,10,.5)", iris: ["#120804", "#f6d08a", "#b06a1c"], eyeSize: .1, sheen: "rgba(255,244,228,.45)",
    patches: [{ t: .3, s: 0, r: .55, c: "245,120,40" }, { t: .55, s: .1, r: .45, c: "240,105,30" }],
    silk: ["rgba(255,236,214,.85)", "rgba(255,214,170,.7)", "rgba(255,180,120,.45)", "rgba(240,120,50,.16)"],
    strands: ["255,228,200", "255,188,130", "246,146,76"], tip: "255,240,226", band: 4,
    dorsal: "rgba(230,110,40,.5)",
  }),
};

// Ordre d'affichage : les plus profonds d'abord.
export const FISH = [
  { kind: "ogon", size: .52, speed: 50, turn: 1,   freq: 1.4,  x: .24, y: .86, heading: -40,  depth: .22 },
  { kind: "rose", size: .78, speed: 30, turn: .75, freq: 1.3,  x: .08, y: .82, heading: -70,  depth: .12 },
  { kind: "koi",  size: .95, speed: 34, turn: .55, freq: .9,   x: .17, y: .5,  heading: -90 },
  { kind: "opal", size: .92, speed: 27, turn: .7,  freq: 1.2,  x: .9,  y: .62, heading: 200 },
  { kind: "gold", size: 1.05, speed: 26, turn: .7, freq: 1.25, x: .85, y: .22, heading: 150 },
];


export const JELLY = [
  { fx: .07, fy: .95, size: 1,  depth: .06, seed: 1.3 },
  { fx: .94, fy: .45, size: .7, depth: .12, seed: 4.1 },
];

// Éventails de mer roses et froncés, nervurés, qui ondulent dans le courant.
export const FANS = [
  { fx: .1, h: .19, a: -1.85, sp: .75, seed: 1 },
  { fx: .9, h: .17, a: -1.4, sp: .8, seed: 3 },
];

export const STARS = [
  { fx: .2, size: 1, rot: .4, seed: 2, dir: 1 },
  { fx: .84, size: .8, rot: 1.3, seed: 5, dir: -1 },
];
