/* The meadow: a living painting. Drawn in code, looping every sixty seconds; see /meadow/. */
const MW_BASE = new URL('.', document.currentScript.src).href;   // the sprites sit beside this file
(() => { const s = document.createElement('style'); s.textContent = ".mw-stage{position:absolute;left:0;top:0;width:1956px;height:1100px;transform-origin:0 0;overflow:hidden}\n.mw-stage>img{position:absolute;display:block}\n.mw-stage .sp{position:absolute;left:0;top:0;background-size:100% 100%;background-repeat:no-repeat;will-change:transform}\n.mw-stage .puff{position:absolute;left:0;top:0;width:84px;height:84px;background:url(MW_BASE/puff.webp) center/100% 100% no-repeat;will-change:transform,opacity;opacity:0}\n.mw-stage .glow{position:absolute;left:0;top:0;border-radius:50%;mix-blend-mode:screen;will-change:transform,opacity}\n.mw-stage .soft{position:absolute;left:0;top:0;border-radius:50%;will-change:transform,opacity;pointer-events:none}\n.mw-stage .ray{position:absolute;left:-60px;top:-60px;width:2600px;height:150px;transform-origin:0 50%;mix-blend-mode:screen;background:linear-gradient(90deg,rgba(255,244,205,.34),rgba(255,244,205,.12) 45%,rgba(255,244,205,0) 80%);will-change:transform,opacity}\n.mw-stage .rod{position:absolute;left:0;top:0;width:24px;height:2.6px;margin:-1.3px 0 0 -12px;background:#c9c2b4;border:.7px solid #2b1d16;border-radius:1.5px;box-sizing:border-box;will-change:transform}\n.mw-stage .mw-ground{position:absolute;left:0;top:560px;width:1956px;height:540px;overflow:hidden;-webkit-mask-image:linear-gradient(transparent,#000 90px);mask-image:linear-gradient(transparent,#000 90px);pointer-events:none}\n.mw-stage .m{position:absolute;pointer-events:none}\n/* the page's own decorations, on durations that divide sixty seconds so a recording loops */\n.mw-stage .lampglow{width:2.4%;aspect-ratio:1;translate:-50% -50%;border-radius:50%;background:radial-gradient(circle,rgba(255,214,120,.75),rgba(255,190,90,0) 68%);mix-blend-mode:screen;animation:glow var(--t,3s) ease-in-out var(--d,0s) infinite}\n@keyframes glow{0%,100%{opacity:.35}35%{opacity:.9}55%{opacity:.55}80%{opacity:.8}}\n.mw-stage .glint{width:1.4%;height:.25%;border-radius:2px;background:#fffbe8;opacity:0;animation:glint var(--t,4s) ease-in-out var(--d,0s) infinite}\n@keyframes glint{0%,100%{opacity:0;transform:scaleX(.3)}50%{opacity:.85;transform:scaleX(1)}}\n.mw-stage .flock{top:var(--y,12%);left:-8%;width:7%;animation:fly var(--t,60s) linear var(--d,0s) infinite}\n@keyframes fly{0%{transform:translate(0,0)}50%{transform:translate(780%,-30%)}100%{transform:translate(1580%,10%)}}\n.mw-stage .flock svg{width:100%;overflow:visible}\n.mw-stage .flock .w{transform-box:fill-box;transform-origin:50% 100%;animation:flap .5s ease-in-out infinite alternate}\n@keyframes flap{to{transform:scaleY(-.6)}}\n.mw-stage .orbit{aspect-ratio:1;translate:-50% -50%;animation:spin 10s linear var(--d,0s) infinite}\n@keyframes spin{to{rotate:360deg}}\n.mw-stage .orbit svg{position:absolute;top:0;left:50%;width:22%;translate:-50% -50%;overflow:visible;animation:bob 1.2s ease-in-out infinite alternate}\n@keyframes bob{to{transform:translateY(-25%) rotate(-8deg)}}\n.mw-stage .seed{width:.32%;aspect-ratio:1;border-radius:50%;background:#fffbe8;box-shadow:0 0 4px rgba(255,255,240,.9);opacity:.85;animation:drift var(--t,30s) linear var(--d,0s) infinite}\n@keyframes drift{0%{transform:translate(0,0)}25%{transform:translate(900%,-500%)}50%{transform:translate(1800%,200%)}75%{transform:translate(2700%,-700%)}100%{transform:translate(3600%,-200%);opacity:0}}\n.mw-stage .wisp{top:4%;left:-25%;width:22%;height:6%;border-radius:50%;background:radial-gradient(ellipse,rgba(255,252,240,.55),rgba(255,252,240,0) 70%);filter:blur(2px);animation:wisp 60s linear infinite}\n@keyframes wisp{0%{transform:translateX(0);opacity:0}10%{opacity:1}55%{opacity:1}70%{transform:translateX(300%);opacity:0}100%{transform:translateX(300%);opacity:0}}".replace('MW_BASE/', MW_BASE); document.head.append(s); })();
(() => {
'use strict';
const META = {"sprites": {"wheel8": {"w": 18, "h": 18, "ax": 9, "ay": 9}, "wheel5": {"w": 12, "h": 12, "ax": 6, "ay": 6}, "loco": {"w": 92, "h": 58, "ax": 46, "ay": 56}, "tender": {"w": 40, "h": 42, "ax": 20, "ay": 40}, "car_red": {"w": 84, "h": 48, "ax": 42, "ay": 46}, "car_teal": {"w": 84, "h": 48, "ax": 42, "ay": 46}, "car_gold": {"w": 84, "h": 48, "ax": 42, "ay": 46}, "pad": {"w": 222, "h": 110, "ax": 160, "ay": 16}, "boat": {"w": 20, "h": 28, "ax": 10, "ay": 22}, "ship": {"w": 100, "h": 158, "ax": 50, "ay": 152}, "door": {"w": 22, "h": 30, "ax": 3, "ay": 16}, "flame2": {"w": 40, "h": 70, "ax": 20, "ay": 2}, "airship": {"w": 166, "h": 82, "ax": 76, "ay": 34}, "prop": {"w": 6, "h": 20, "ax": 3, "ay": 10}, "cloud1": {"w": 300, "h": 150, "ax": 150, "ay": 110}, "cloud2": {"w": 220, "h": 115, "ax": 110, "ay": 85}, "cloud3": {"w": 170, "h": 90, "ax": 85, "ay": 66}, "wash0": {"w": 18, "h": 22, "ax": 9, "ay": 4}, "wash1": {"w": 18, "h": 22, "ax": 9, "ay": 4}, "wash2": {"w": 18, "h": 22, "ax": 9, "ay": 4}, "wash3": {"w": 18, "h": 22, "ax": 9, "ay": 4}, "wash4": {"w": 18, "h": 22, "ax": 9, "ay": 4}, "wash5": {"w": 18, "h": 22, "ax": 9, "ay": 4}, "wash6": {"w": 18, "h": 22, "ax": 9, "ay": 4}, "bunt0": {"w": 12, "h": 13, "ax": 6, "ay": 2}, "bunt1": {"w": 12, "h": 13, "ax": 6, "ay": 2}, "bunt2": {"w": 12, "h": 13, "ax": 6, "ay": 2}, "bunt3": {"w": 12, "h": 13, "ax": 6, "ay": 2}, "pennant": {"w": 66, "h": 22, "ax": 3, "ay": 6}, "sheep0": {"w": 58, "h": 32, "ax": 28, "ay": 26}, "sheep1": {"w": 58, "h": 32, "ax": 28, "ay": 26}, "sheep2": {"w": 58, "h": 32, "ax": 28, "ay": 26}, "sheep3": {"w": 58, "h": 32, "ax": 28, "ay": 26}, "sheep4": {"w": 58, "h": 32, "ax": 28, "ay": 26}, "sheep5": {"w": 58, "h": 32, "ax": 28, "ay": 26}, "sheep6": {"w": 58, "h": 32, "ax": 28, "ay": 26}, "sheep7": {"w": 58, "h": 32, "ax": 28, "ay": 26}, "sheep8": {"w": 58, "h": 32, "ax": 28, "ay": 26}, "girl1": {"w": 16, "h": 22, "ax": 8, "ay": 20}, "girl2": {"w": 16, "h": 22, "ax": 8, "ay": 20}, "man1": {"w": 16, "h": 22, "ax": 8, "ay": 20}, "man2": {"w": 16, "h": 22, "ax": 8, "ay": 20}, "kid": {"w": 16, "h": 22, "ax": 8, "ay": 20}, "kite": {"w": 16, "h": 23, "ax": 8, "ay": 11}, "bfly_w": {"w": 18, "h": 14, "ax": 9, "ay": 7}, "bfly_y": {"w": 18, "h": 14, "ax": 9, "ay": 7}, "gull": {"w": 20, "h": 10, "ax": 10, "ay": 6}, "grassA": {"w": 68, "h": 84, "ax": 34, "ay": 80}, "grassB": {"w": 68, "h": 66, "ax": 34, "ay": 62}, "grassC": {"w": 68, "h": 102, "ax": 34, "ay": 98}, "puff": {"w": 84, "h": 84, "ax": 42, "ay": 42}, "sails": {"w": 180, "h": 180, "ax": 90, "ay": 90}, "mecha": {"w": 52, "h": 118, "ax": 26, "ay": 116, "frames": 8}, "sheepf": {"w": 33, "h": 21, "ax": 15, "ay": 19, "frames": 4}, "dhead": {"w": 60, "h": 38, "ax": 22, "ay": 28}, "dclaw": {"w": 12, "h": 12, "ax": 2, "ay": 2}, "surfer": {"w": 38, "h": 46, "ax": 18, "ay": 40}, "fox": {"w": 28, "h": 46, "ax": 14, "ay": 44}, "foxtail": {"w": 18, "h": 42, "ax": 9, "ay": 40}, "foxfire": {"w": 16, "h": 22, "ax": 8, "ay": 14}, "star4": {"w": 64, "h": 64, "ax": 32, "ay": 32}}, "layers": {"front": {"x": 44.315625, "y": 792.5875, "w": 1890.290625, "h": 307.6625}, "castle": {"x": 943.3625, "y": 18.3375, "w": 760.496875, "h": 827.225}, "g_knee1": {"cx": 1051.859375, "cy": 720.0015625, "w": 44.825, "h": 45.334375}, "g_knee2": {"cx": 1308.075, "cy": 720.0015625, "w": 44.825, "h": 45.334375}, "g_knee3": {"cx": 1257.9015625, "cy": 710.06875, "w": 45.334375, "h": 44.825}, "g_knee4": {"cx": 1484.0640625, "cy": 703.95625, "w": 45.334375, "h": 44.825}, "g_boil1": {"cx": 1508.0046875, "cy": 480.0859375, "w": 70.803125, "h": 70.803125}, "g_boil2": {"cx": 1555.8859375, "cy": 436.025, "w": 43.296875, "h": 42.7875}, "windows": {"x": 745.215625, "y": 258.253125, "w": 645.378125, "h": 742.159375}}, "extra": {"laundry": [{"x": 1180.5, "y": 334.5, "w": 8.190101916187873, "h": 14.493093892424003, "skew": -0.635463530751574, "c": "#c4533a", "dark": false}, {"x": 1196.75, "y": 334.875, "w": 9.153212655563634, "h": 11.273142676010833, "skew": 0.6749103637231473, "c": "#7ea463", "dark": false}, {"x": 1213.0, "y": 334.0, "w": 8.317944535279697, "h": 14.015215555885522, "skew": 0.2463852008094367, "c": "#d9a54a", "dark": false}, {"x": 1229.25, "y": 331.875, "w": 7.525885168249097, "h": 10.293148585020273, "skew": 0.6538109357545563, "c": "#f3e7cf", "dark": false}, {"x": 1261.75, "y": 323.875, "w": 8.360327003516844, "h": 11.844490748826475, "skew": -0.4885679294239066, "c": "#5e7f8c", "dark": false}, {"x": 1511.0, "y": 323.0, "w": 9.469765183913175, "h": 13.637286344019751, "skew": -0.21049371362170877, "c": "#f3e7cf", "dark": true}, {"x": 1529.5, "y": 328.5, "w": 10.958885706063995, "h": 11.652374723700579, "skew": 0.6139572241811424, "c": "#5e7f8c", "dark": true}], "bunt": [{"x": 1108.301775147929, "y": 127.04142011834321, "c": 1}, {"x": 1126.8994082840236, "y": 132.78106508875737, "c": 2}, {"x": 1145.792899408284, "y": 137.21893491124257, "c": 3}, {"x": 1164.9822485207098, "y": 140.3550295857988, "c": 0}, {"x": 1184.467455621302, "y": 142.18934911242604, "c": 1}, {"x": 1204.2485207100592, "y": 142.72189349112426, "c": 2}, {"x": 1224.3254437869823, "y": 141.9526627218935, "c": 3}, {"x": 1244.698224852071, "y": 139.88165680473372, "c": 0}, {"x": 1265.3668639053253, "y": 136.50887573964496, "c": 1}, {"x": 1286.3313609467455, "y": 131.8343195266272, "c": 2}, {"x": 1307.5917159763314, "y": 125.85798816568047, "c": 3}, {"x": 1329.147928994083, "y": 118.57988165680473, "c": 0}], "flag": [1090, 22], "sheep": [{"x": 620, "y": 860, "s": 1.1}, {"x": 642, "y": 868, "s": 1.1133333333333333}, {"x": 670, "y": 856, "s": 1.0933333333333333}, {"x": 1560, "y": 880, "s": 1.1333333333333333}, {"x": 1584, "y": 872, "s": 1.12}, {"x": 1080, "y": 1000, "s": 1.3333333333333333}, {"x": 1110, "y": 1008, "s": 1.3466666666666667}, {"x": 1800, "y": 960, "s": 1.2666666666666666}, {"x": 330, "y": 900, "s": 1.1666666666666667}], "paths": {"maktaba": [[1288, 838], [1063, 867], [929, 798], [720, 774]], "classophile": [[1288, 838], [1042, 863], [687, 781], [400, 794]], "trader": [[1288, 838], [1366, 861], [1589, 804], [1735, 808]], "milepost": [[1288, 838], [1122, 865], [995, 918], [900, 938]], "rizq": [[1288, 838], [1061, 909], [559, 998], [260, 1020]], "mailmind": [[1288, 838], [1117, 892], [722, 1048], [590, 1048]], "beats": [[1288, 838], [1192, 910], [1268, 1019], [1210, 1042]], "bus": [[1288, 838], [1454, 913], [1502, 1070], [1545, 1048]]}}, "night": {"stars": [[937.0, 52.7, 1.33, 0.68], [583.7, 103.6, 1.49, 3.51], [732.0, 30.0, 1.26, 5.59], [1718.3, 33.8, 1.45, 2.36], [938.3, 48.3, 1.3, 1.75], [1801.6, 67.9, 1.45, 1.01], [1085.1, 65.4, 1.1, 0.75], [682.4, 114.8, 1.08, 0.56], [942.7, 113.1, 0.86, 3.43], [865.4, 128.7, 1.31, 0.53], [651.1, 65.1, 1.53, 1.46], [1955.6, 47.4, 1.14, 5.29], [792.8, 87.5, 1.3, 1.85], [1009.9, 52.8, 1.04, 5.24], [528.8, 126.1, 1.26, 0.97], [1409.8, 4.0, 1.41, 2.61], [1745.8, 66.1, 1.01, 4.28], [1000.8, 111.0, 1.03, 5.53], [1933.8, 78.0, 0.87, 1.19], [639.2, 44.9, 0.74, 4.77], [1067.3, 75.7, 0.79, 5.96], [1722.6, 76.4, 0.65, 2.4], [645.4, 152.3, 1.03, 5.65], [576.0, 107.0, 0.72, 1.46], [578.8, 113.6, 1.4, 5.75], [1728.2, 40.7, 0.81, 4.32], [590.7, 39.2, 0.69, 4.76], [724.6, 63.5, 1.47, 4.73], [1021.6, 27.7, 0.67, 3.57], [725.9, 87.6, 0.97, 1.6], [1631.6, 48.8, 0.81, 4.28], [778.3, 112.6, 1.57, 5.36], [1858.7, 17.0, 0.98, 0.24], [732.9, 265.0, 1.28, 3.4], [1536.1, 12.9, 0.79, 4.73], [681.5, 64.1, 0.6, 1.58], [1820.6, 16.3, 1.15, 5.46], [975.8, 86.9, 1.48, 5.2], [1917.5, 22.5, 1.0, 5.23], [1038.0, 83.4, 1.41, 2.19], [512.5, 21.9, 1.6, 1.11], [1889.6, 170.5, 1.53, 5.38], [601.2, 71.5, 0.71, 4.83], [976.2, 28.4, 0.88, 1.71], [913.4, 52.9, 1.18, 0.25], [918.4, 54.0, 1.08, 1.09], [837.7, 178.6, 0.72, 2.99], [586.2, 26.9, 1.01, 4.0], [1542.8, 4.6, 0.82, 1.7], [1111.1, 24.4, 0.89, 0.96], [630.7, 33.6, 0.75, 4.97], [1773.0, 60.9, 1.6, 5.16], [644.3, 16.9, 0.75, 2.62], [647.5, 100.8, 0.69, 3.01], [1891.4, 105.4, 0.72, 5.01], [1886.3, 157.6, 1.12, 0.44], [723.7, 305.1, 0.7, 0.82], [989.6, 24.6, 0.7, 3.86], [529.6, 49.1, 1.21, 1.78], [1850.5, 23.5, 0.96, 4.6], [654.1, 32.2, 0.92, 5.26], [1558.9, 18.2, 0.76, 5.74], [1713.4, 78.7, 1.31, 0.04], [892.6, 83.6, 1.25, 1.14], [1884.9, 131.8, 0.89, 3.47], [585.4, 55.2, 1.1, 2.29], [1632.4, 33.5, 0.66, 4.24], [1940.2, 114.1, 1.02, 2.85], [825.2, 101.5, 1.07, 2.48], [1857.2, 14.2, 1.45, 5.1], [802.6, 72.8, 0.95, 0.62], [706.4, 5.1, 1.6, 0.82], [663.1, 99.3, 1.06, 2.03], [1735.6, 61.8, 1.6, 2.36], [1922.3, 110.5, 0.68, 5.0], [1722.2, 71.8, 0.92, 3.38], [1828.3, 28.1, 1.2, 2.92], [730.2, 41.5, 1.29, 0.29], [660.3, 9.1, 0.91, 1.5], [1900.6, 158.6, 1.56, 3.74], [1757.5, 52.9, 0.73, 1.88], [1080.6, 71.7, 1.47, 5.29], [1734.5, 5.5, 1.53, 3.55], [1951.1, 93.9, 1.09, 4.1], [1691.1, 53.6, 1.32, 2.67], [868.8, 118.1, 1.5, 5.65], [703.5, 18.9, 1.04, 1.3], [637.5, 90.8, 1.18, 0.51], [1906.1, 197.5, 1.44, 1.67], [1878.4, 13.5, 0.85, 2.15]], "moon": [1690, 30]}};
const BASE = MW_BASE;
const SPR = META.sprites, LAY = META.layers, EX = META.extra;
const LOOP = 60;                       // everything repeats on this; a recording of one loop is seamless
const CAPTURE = /[?&]capture/.test(location.search);
const stage = document.createElement('div'); stage.className = 'mw-stage';
const baseImg = document.createElement('img'); baseImg.src = BASE + 'base.webp'; baseImg.alt = ''; baseImg.width = 1956; baseImg.height = 1100; baseImg.style.cssText = 'left:0;top:0;width:1956px;height:1100px'; stage.append(baseImg);
const INK = '#2b1d16', TAU = Math.PI * 2;

// ---------------------------------------------------------------- helpers
let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const hash = (i, k) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = u => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u); };
const mod = (a, n) => ((a % n) + n) % n;
const fade = u => u < .45 ? 1 : (1 - u) / .55;
const wave = (tau, period, ph = 0) => Math.sin(TAU * tau / period + ph);   // periods divide 60

let host = stage;
function into(el) { host = el; }
function mk(name, extra) {
  const m = SPR[name], e = document.createElement('div');
  e.className = 'sp';
  e.style.cssText = `width:${m.w}px;height:${m.h}px;background-image:url(${BASE}${name}.webp);transform-origin:${m.ax}px ${m.ay}px;` + (extra || '');
  e.m = m; host.append(e); return e;
}
function mkStrip(name, extra) {
  const e = mk(name, extra), n = e.m.frames;
  e.style.backgroundSize = `${n * 100}% 100%`; e.frame = -1; return e;
}
function setFrame(e, i) { if (e.frame !== i) { e.frame = i; e.style.backgroundPosition = `${(i / (e.m.frames - 1) * 100).toFixed(3)}% 0`; } }
const svgLayer = inner => {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('viewBox', '0 0 1956 1100');
  s.style.cssText = 'position:absolute;left:0;top:0;width:1956px;height:1100px;overflow:visible;pointer-events:none';
  s.innerHTML = inner; host.append(s); return s;
};
function pose(e, x, y, a = 0, sx = 1, sy = 1, more = '') {
  e.style.transform = `translate(${(x - e.m.ax).toFixed(2)}px,${(y - e.m.ay).toFixed(2)}px) rotate(${a.toFixed(2)}deg) scale(${sx.toFixed(3)},${sy.toFixed(3)})${more}`;
}
function show(e, on) { const v = on ? 'visible' : 'hidden'; if (e.style.visibility !== v) e.style.visibility = v; }
function deco(cls, x, y, vars = {}, w) {
  const e = document.createElement('div');
  e.className = 'm ' + cls;
  if (x != null) e.style.left = x + '%';
  if (y != null) e.style.top = y + '%';
  if (w) e.style.width = w + '%';
  for (const [k, v] of Object.entries(vars)) e.style.setProperty(k, v);
  host.append(e); return e;
}
function glow(size, color, cls = 'glow') {
  const e = document.createElement('div');
  e.className = cls;
  e.style.cssText = `width:${size}px;height:${size}px;margin:${-size / 2}px 0 0 ${-size / 2}px;background:radial-gradient(circle,${color},rgba(0,0,0,0) 68%)`;
  host.append(e); return e;
}
function at(e, x, y, s = 1, op) {
  e.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${s.toFixed(3)})`;
  if (op != null) e.style.opacity = clamp(op, 0, 1).toFixed(3);
}
function img(src, l) {
  const e = document.createElement('img');
  e.src = src; e.alt = '';
  e.style.cssText = `position:absolute;display:block;left:${l.x}px;top:${l.y}px;width:${l.w}px;height:${l.h}px`;
  host.append(e); return e;
}
const pool = n => Array.from({ length: n }, () => { const e = document.createElement('div'); e.className = 'puff'; host.append(e); return e; });
function drawPool(p, list) {
  for (let i = 0; i < p.length; i++) {
    const e = p[i], q = list[i];
    if (!q) { if (e.style.opacity !== '0') e.style.opacity = '0'; continue; }
    e.style.transform = `translate(${(q[0] - 42).toFixed(1)}px,${(q[1] - 42).toFixed(1)}px) scale(${(q[2] / 84).toFixed(3)})`;
    e.style.opacity = clamp(q[3], 0, 1).toFixed(3);
  }
}
// a cubic path with an arc-length table, for walkers
function bez(P) {
  const L = [[0, P[0][0], P[0][1]]];
  let s = 0;
  for (let i = 1; i <= 200; i++) {
    const t = i / 200, a = (1 - t) ** 3, b = 3 * (1 - t) ** 2 * t, c = 3 * (1 - t) * t * t, d = t ** 3;
    const x = a * P[0][0] + b * P[1][0] + c * P[2][0] + d * P[3][0], y = a * P[0][1] + b * P[1][1] + c * P[2][1] + d * P[3][1];
    s += Math.hypot(x - L[i - 1][1], y - L[i - 1][2]); L.push([s, x, y]);
  }
  return { len: s, at(d) {
    d = clamp(d, 0, s); let i = 1; while (i < 200 && L[i][0] < d) i++;
    const A = L[i - 1], B = L[i], u = (d - A[0]) / (B[0] - A[0] || 1);
    return [A[1] + (B[1] - A[1]) * u, A[2] + (B[2] - A[2]) * u, Math.sign(B[1] - A[1])];
  } };
}

// ---------------------------------------------------------------- the rail line (meadow.py's track(), a quadratic)
const P0 = [-30, 952], PC = [978, 986], P1 = [1986, 968];
const N = 1200, LUT = [];
{
  let s = 0, px = P0[0], py = P0[1];
  for (let i = 0; i <= N; i++) {
    const t = i / N, a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
    const x = a * P0[0] + b * PC[0] + c * P1[0], y = a * P0[1] + b * PC[1] + c * P1[1];
    s += Math.hypot(x - px, y - py); px = x; py = y;
    LUT.push([s, x, y]);
  }
}
const LTOT = LUT[N][0];
function onTrack(s) {
  if (s <= 0 || s >= LTOT) {
    const [i, j] = s <= 0 ? [0, 1] : [N - 1, N], ang = Math.atan2(LUT[j][2] - LUT[i][2], LUT[j][1] - LUT[i][1]);
    const o = s <= 0 ? LUT[0] : LUT[N], d = s <= 0 ? s : s - LTOT;
    return [o[1] + Math.cos(ang) * d, o[2] + Math.sin(ang) * d, ang];
  }
  let lo = 0, hi = N;
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (LUT[mid][0] < s) lo = mid; else hi = mid; }
  const A = LUT[lo], B = LUT[hi], u = (s - A[0]) / (B[0] - A[0] || 1);
  return [A[1] + (B[1] - A[1]) * u, A[2] + (B[2] - A[2]) * u, Math.atan2(B[2] - A[2], B[1] - A[1])];
}
const sAtX = x => { let i = 0; while (i < N && LUT[i][1] < x) i++; return LUT[i][0]; };

// ---------------------------------------------------------------- the train: two passes a loop, a halt at the station each time
const CARS = [
  ['loco', 42, [['wheel5', -30, -5], ['wheel8', -6, -8], ['wheel8', 14, -8], ['wheel5', 30, -5]]],
  ['tender', 106, [['wheel5', -10, -5], ['wheel5', 10, -5]]],
  ['car_red', 164, [['wheel5', -26, -5], ['wheel5', -15, -5], ['wheel5', 15, -5], ['wheel5', 26, -5]]],
  ['car_teal', 240, [['wheel5', -26, -5], ['wheel5', -15, -5], ['wheel5', 15, -5], ['wheel5', 26, -5]]],
  ['car_gold', 316, [['wheel5', -26, -5], ['wheel5', -15, -5], ['wheel5', 15, -5], ['wheel5', 26, -5]]],
];
const TRAIN_LEN = 352, V = 150, DB = 280, DA = 300, TB = 2 * DB / V, TA = 2 * DA / V, TSTOP = 4.5;
const S_HALT = sAtX(900);
function profile(tau, pStop) {
  const p0 = -70, pEnd = LTOT + TRAIN_LEN + 90;
  const t1 = (pStop - DB - p0) / V, t2 = t1 + TB, t3 = t2 + TSTOP, t4 = t3 + TA, t5 = t4 + (pEnd - pStop - DA) / V;
  if (tau < 0 || tau > t5) return null;
  if (tau < t1) return [p0 + V * tau, V];
  if (tau < t2) { const u = (tau - t1) / TB; return [pStop - DB + DB * (1 - (1 - u) ** 2), V * (1 - u)]; }
  if (tau < t3) return [pStop, 0];
  if (tau < t4) { const u = (tau - t3) / TA; return [pStop + DA * u * u, V * u]; }
  return [pStop + DA + V * (tau - t4), V];
}
const PASSES = [{ start: 1, dir: 1, stop: S_HALT + 240 }, { start: 31, dir: -1, stop: LTOT - (S_HALT - 240) }];
function trainAt(tau) {
  for (const ps of PASSES) {
    const r = profile(tau - ps.start, ps.stop);
    if (r) return { p: r[0], v: r[1], dir: ps.dir, front: ps.dir > 0 ? r[0] : LTOT - r[0] };
  }
  return null;
}
function carPose(tr, off) { const [x, y, a] = onTrack(tr.front - tr.dir * off); return [x, y + 4, a]; }

// ---------------------------------------------------------------- the rocket ship: lands on the castle's pad, opens its door, flies off
const PADX = 1690, PADY = 330, FEET = PADY + 1, Y0 = -300;
function shipAt(tau) {
  if (tau < 3.5 || tau >= 47) return null;
  let x = PADX, y = FEET, tilt = 0, fl = 0, sq = 0, long = 1;
  if (tau < 12) {
    const u = (tau - 3.5) / 8.5, e = 1 - u;
    y = FEET - (FEET - Y0) * e * e * e;
    x = PADX + 50 * e * e + 7 * e * wave(tau, 4);
    tilt = 9 * e * e + 4 * e * wave(tau, 3, 1);
    fl = .7 + .3 * ease((tau - 9) / 2);
  } else if (tau < 40.8) {
    fl = tau < 12.4 ? 1 - ease((tau - 12) / .4) : tau >= 40 ? ease((tau - 40) / .3) : 0;
    if (tau < 12.7) sq = Math.sin(Math.PI * (tau - 12) / .7) * .055;
  } else {
    const u = (tau - 40.8) / 6.2;
    y = FEET - 860 * Math.pow(u, 2.2); x = PADX - 14 * u * u + 5 * u * wave(tau, 3); tilt = -3 * u + 2 * u * wave(tau, 2);
    fl = 1; long = 1.15 + .4 * ease(u * 2);
  }
  const door = ease((tau - 15) / 1.2) * (1 - ease((tau - 36) / 1.2));
  return { x, y, tilt, fl, sq, long, door };
}

// ---------------------------------------------------------------- smoke and steam: every puff is a pure function of time
const CHIMNEYS = [[60.276, 12.727, 1.4], [72.546, 16.364, 1.2], [65.389, 10.0, 1.5], [74.029, 16.909, .9], [50.716, 19.818, .9]]
  .map(([x, y, s]) => [x / 100 * 1956, y / 100 * 1100, s]);
function chimneyPuffs(t, out) {
  const L = 12, DT = 1.2;
  CHIMNEYS.forEach(([cx, cy, s], e) => {
    const w = 31.3 * s, ph = e * .37;
    for (let n = Math.floor((t - L - ph) / DT) + 1; n * DT + ph <= t; n++) {
      const a = t - (n * DT + ph), u = a / L, nn = mod(n, LOOP / DT), dx = .5 + hash(nn, e) * .7;
      const op = u < .06 ? u / .06 * .95 : u < .55 ? .95 - (u - .06) / .49 * .15 : .8 * (1 - u) / .45;
      out.push([cx + dx * u * w + 3 * Math.sin(a * 1.3 + nn), cy - 4.3 * u * w, w * (.4 + 1.9 * u), op]);
    }
  });
}
// the boiler lets off steam now and then
const VENTS = [{ x: 1534, y: 386, every: 7.5, ph: 2, vx: 18, vy: -60 }, { x: 1594, y: 530, every: 10, ph: 6, vx: 70, vy: -14 }, { x: 1003, y: 470, every: 12, ph: 9, vx: -50, vy: -20 }];
function ventPuffs(t, out) {
  VENTS.forEach((v, k) => {
    const L = 2.6;
    for (let n = Math.floor((t - L - v.ph - 1) / v.every) + 1; n * v.every + v.ph <= t; n++) {
      const t0 = n * v.every + v.ph;
      for (let i = 0; i < 7; i++) {
        const tb = t0 + i * .09, age = t - tb;
        if (age < 0 || age > L) continue;
        const u = age / L, k2 = 1.6, d = (1 - Math.exp(-k2 * age)) / k2;
        out.push([v.x + v.vx * d + (hash(mod(n, LOOP / v.every) * 7 + i, k) - .5) * 8, v.y + v.vy * d - 10 * age, 9 + 30 * Math.sqrt(u), .85 * fade(u)]);
      }
    }
  });
}
function trainPuffs(t, out) {
  const L = 2.8, DT = .2;
  for (let n = Math.floor((t - L) / DT) + 1; n * DT <= t; n++) {
    const tb = n * DT, tr = trainAt(mod(tb, LOOP));
    if (!tr || (tr.v < 20 && mod(n, 4))) continue;
    const [x, y, a] = carPose(tr, 42), fx = tr.dir * 22, fy = -55;
    const X = x + fx * Math.cos(a) - fy * Math.sin(a), Y = y + fx * Math.sin(a) + fy * Math.cos(a);
    if (X < -80 || X > 2040) continue;
    const age = t - tb, u = age / L;
    out.push([X + 9 * age + (hash(mod(n, LOOP / DT), 9) - .5) * 6, Y - 24 * age - 12 * (1 - Math.exp(-2 * age)), 13 + 34 * Math.sqrt(u), .9 * Math.pow(1 - u, 1.4)]);
  }
}
function shipPuffs(t, out) {
  const tau = mod(t, LOOP);
  const burst = (t0, t1, rate, L, fn) => {
    for (let i = Math.max(0, Math.floor((tau - L - t0) * rate)); ; i++) {
      const tb = t0 + i / rate;
      if (tb > tau || tb > t1) break;
      const age = tau - tb;
      if (age < L) { const r = fn(i, tb, age, age / L); if (r) out.push(r); }
    }
  };
  const spray = (sp, big) => (i, tb, age, u) => {
    const r = shipAt(tb); if (!r || r.fl < .2) return null;
    const h = FEET - r.y; if (h > 120) return null;
    const side = hash(i, 3) < .5 ? -1 : 1, v = sp[0] + hash(i, 4) * sp[1];
    const k = 1.4, d = v * (1 - Math.exp(-k * age)) / k;
    return [PADX + side * (12 + hash(i, 5) * 14 + d), PADY - 6 - 12 * age - hash(i, 6) * 10, big[0] + big[1] * Math.sqrt(u), .95 * fade(u) * (1 - h / 140)];
  };
  burst(9.6, 12.5, 11, 2.4, spray([45, 80], [18, 52]));
  burst(12.3, 18, 5, 4, (i, tb, age, u) => hash(i, 7) > 1 - (tb - 12.3) / 5.7 ? null :
    [PADX + (hash(i, 8) - .5) * 80 + 6 * age, PADY - 6 - 16 * age, 18 + 50 * Math.sqrt(u), .6 * fade(u)]);
  burst(40, 42.6, 14, 3.2, spray([70, 140], [22, 76]));
  burst(40.8, 47, 7, 2.8, (i, tb, age, u) => {
    const r = shipAt(tb); if (!r || r.y < -60 || r.y > FEET - 70) return null;
    return [r.x + (hash(i, 1) - .5) * 18 + 7 * age, r.y + 4 + 8 * age, 18 + 46 * Math.sqrt(u), .8 * fade(u)];
  });
}

// ================================================================ build the scene, back to front
// --- sky, behind the castle
const SUNRAYS = [[18, 0, 20], [27, 1.3, 30], [36, 2.6, 15], [45, 4, 20]].map(([deg, ph, per]) => {
  const e = document.createElement('div'); e.className = 'ray'; host.append(e); return { e, deg, ph, per };
});
const CLOUDS = [['cloud2', 1180, 120, 0, 34], ['cloud1', 1820, 200, 2, 44], ['cloud3', 660, 290, 4, 26], ['cloud3', 1560, 60, 1, 30]]
  .map(([n, x, y, ph, amp]) => ({ e: mk(n), x, y, ph, amp }));
const airship = mk('airship'), prop = mk('prop');
{
  seed = 7;
  for (let i = 0; i < 14; i++) {
    const x = rnd() < .7 ? 2 + rnd() * 46 : 82 + rnd() * 16;
    deco('glint', x, 49.4 + rnd() * 3.6, { '--t': [3, 4, 5, 6][Math.floor(rnd() * 4)] + 's', '--d': (-rnd() * 6).toFixed(1) + 's' });
  }
  deco('wisp');
}
const BOATS = [[380, 556, 0, 1], [452, 570, 2.1, 1], [228, 551, 4.2, .8]].map(([x, y, ph, s]) => ({ x, y, ph, s, e: mk('boat') }));
// --- the castle, and what lives on it
const mechaEl = mkStrip('mecha');
const visor = glow(20, 'rgba(127,240,255,1)'), thruster = glow(30, 'rgba(120,200,255,.95)');
const dsvg = svgLayer(`<path id="dbody" fill="#4fb39a" stroke="#2b1d16" stroke-width="1.4" stroke-linejoin="round"/>
  <path id="dbelly" fill="none" stroke="#f3e7cf" stroke-linecap="round"/><path id="dback" fill="none" stroke="#2f8a72" stroke-width="2" stroke-linecap="round" opacity=".7"/>
  <g id="dspikes" fill="#d84a3a" stroke="#2b1d16" stroke-width=".7" stroke-linejoin="round"></g><path id="dtail" fill="#d84a3a" stroke="#2b1d16" stroke-width=".8"/>
  <path id="dwhisk" fill="none" stroke="#2b1d16" stroke-width="1.3" stroke-linecap="round"/>`);
const dbody = dsvg.querySelector('#dbody'), dbelly = dsvg.querySelector('#dbelly'), dback = dsvg.querySelector('#dback'), dspikes = dsvg.querySelector('#dspikes'), dtail = dsvg.querySelector('#dtail'), dwhisk = dsvg.querySelector('#dwhisk');
const NSPK = 15;
dspikes.innerHTML = Array.from({ length: NSPK }, () => '<polygon/>').join('');
const dclaws = [mk('dclaw'), mk('dclaw'), mk('dclaw'), mk('dclaw')];
const dhead = mk('dhead');
img(BASE + 'castle.webp', LAY.castle);
const GEARS = [['g_knee1', 3], ['g_knee2', -3], ['g_knee3', -3], ['g_knee4', 3], ['g_boil1', 2], ['g_boil2', -3]].map(([n, rev]) => {
  const l = LAY[n], e = document.createElement('div');
  e.className = 'sp';
  e.style.cssText = `width:${l.w}px;height:${l.h}px;background-image:url(${BASE}${n}.webp);transform-origin:50% 50%`;
  host.append(e); return { e, l, rev };
});
const WASH = EX.laundry.map((g, i) => ({ g, e: mk('wash' + i, g.dark ? 'filter:brightness(.8) saturate(.9)' : '') }));
const BUNT = EX.bunt.map(b => ({ b, e: mk('bunt' + b.c) }));
const pennant = mk('pennant');
const sails = mk('sails');
const POOL_SMOKE = pool(80);
const pad = mk('pad');
const padLamps = [glow(16, 'rgba(255,90,60,.95)'), glow(16, 'rgba(255,90,60,.95)')];
const flameGlow = glow(170, 'rgba(255,196,110,.8)');
const flame = mk('flame2');
const POOL_SHIP = pool(140);
const ship = mk('ship');
const door = mk('door');
const doorGlow = glow(70, 'rgba(255,214,140,.9)');
const beacon = glow(22, 'rgba(255,90,60,1)');
const porthole = glow(46, 'rgba(255,214,140,.7)');
for (const [x, y] of [[59.8, 34.1], [69.6, 31.5], [58.9, 44.6], [70.9, 44.6], [79.8, 46.9]])
  deco('lampglow', x, y, { '--t': [2, 2.5, 3, 4][Math.floor(rnd() * 4)] + 's', '--d': (-rnd() * 3).toFixed(1) + 's' });
const GULLS = [[20, 0, 1], [15, 2.1, .85], [30, 4.2, 1.1]].map(([per, ph, s]) => ({ per, ph, s, e: mk('gull') }));
const TRAIL = Array.from({ length: 28 }, (_, i) => glow(i % 3 ? 16 : 22, i % 2 ? 'rgba(127,240,255,.95)' : 'rgba(255,255,255,.95)'));
const scarf = svgLayer('<path id="scarf" fill="none" stroke="#c4533a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path id="scarf2" fill="none" stroke="#2b1d16" stroke-width=".7" stroke-linecap="round"/>');
const scarfP = scarf.querySelector('#scarf');
const boardGlow = glow(60, 'rgba(127,240,255,.9)');
const surfer = mk('surfer');
{
  const bird = 'M0 6 q5 -6 10 0 q5 -6 10 0';
  for (const [y, d] of [[9, 0], [16, -30]]) {
    const f = deco('flock', null, null, { '--y': y + '%', '--t': '60s', '--d': d + 's' });
    f.innerHTML = '<svg viewBox="0 0 80 30">' + [[0, 10], [18, 2], [30, 14], [46, 6], [60, 16]].map(([bx, by], k) =>
      `<g transform="translate(${bx} ${by})"><path class="w" d="${bird}" fill="none" stroke="#3b4656" stroke-width="2.2" stroke-linecap="round" style="animation-delay:-${(k * .2).toFixed(1)}s"/></g>`).join('') + '</svg>';
  }
}
// --- the meadow, behind the rails
const SHEEP = EX.sheep.map((s, i) => ({ s, i, front: s.y > 975 }));
SHEEP.forEach(sh => {     // a wander of four stops around home, timed to fill exactly one loop
  const k = sh.i, r = 26 + 22 * hash(k, 11), lamb = k === 2 || k === 7, v = 11;
  sh.lamb = lamb; sh.scale = sh.s.s * (lamb ? .72 : 1.05);
  sh.wp = [0, 1, 2, 3].map(j => { const a = TAU * (j / 4 + hash(k, j)); return [sh.s.x + r * Math.cos(a), sh.s.y + r * .35 * Math.sin(a)]; });
  sh.walk = sh.wp.map((w, j) => { const n = sh.wp[(j + 1) % 4]; return Math.hypot(n[0] - w[0], n[1] - w[1]) / v; });
  sh.graze = (LOOP - sh.walk.reduce((a, b) => a + b, 0)) / 4;
  sh.ph = hash(k, 5) * LOOP;
});
SHEEP.filter(s => !s.front).forEach(s => (s.e = mkStrip('sheepf')));
const WALKERS = [
  { a: mk('girl1'), b: mk('girl2'), path: bez(EX.paths.trader), out: [0, 27], back: [30, 57] },
  { a: mk('man1'), b: mk('man2'), path: bez(EX.paths.maktaba), out: [31, 59], back: [1, 29] },
];
const strings = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
strings.setAttribute('viewBox', '0 0 1956 1100');
strings.style.cssText = 'position:absolute;left:0;top:0;width:1956px;height:1100px;overflow:visible;pointer-events:none';
strings.innerHTML = `<path id="kstr" fill="none" stroke="#fbf6e9" stroke-width=".9" opacity=".85"/><path id="ktail" fill="none" stroke="#c4533a" stroke-width="1.6" stroke-linecap="round"/>`;
host.append(strings);
const kstr = strings.querySelector('#kstr'), ktail = strings.querySelector('#ktail');
const KID = { x: 612, y: 902 }, kid = mk('kid'), kite = mk('kite');
const FOX = { x: 1858, y: 916, s: 1.9 };
const foxTails = [-62, -38, -14].map(a => ({ a, e: mk('foxtail') }));
const foxEl = mk('fox');
const FIRES = [0, 1, 2].map(i => ({ i, g: glow(34, 'rgba(110,200,255,.9)'), e: mk('foxfire') }));
// --- the train
const TRAIN = CARS.map(([name, off, wheels]) => ({
  off, e: mk(name), wheels: wheels.map(([w, lx, ly]) => ({ lx, ly, r: w === 'wheel8' ? 8 : 5, e: mk(w) })),
}));
const rod = document.createElement('div'); rod.className = 'rod'; host.append(rod);
const POOL_TRAIN = pool(20);
// --- in front of the rails
img(BASE + 'front.webp', LAY.front);
SHEEP.filter(s => s.front).forEach(s => (s.e = mkStrip('sheepf')));
const BFLIES = [[250, 960, 0], [700, 1010, 1.3], [1050, 985, 2.6], [1400, 1000, 3.9], [1760, 965, 5.2], [560, 885, .7], [1620, 880, 4.4]]
  .map(([x, y, ph], i) => ({ x, y, ph, e: mk(i % 3 ? 'bfly_w' : 'bfly_y') }));
const GRASS = [[60, 1106, 'grassC', 1.25], [150, 1104, 'grassA', 1.1], [470, 1108, 'grassB', 1.2], [760, 1105, 'grassA', 1.15], [1060, 1108, 'grassC', 1.1],
  [1360, 1106, 'grassB', 1.25], [1680, 1108, 'grassA', 1.2], [1915, 1104, 'grassC', 1.3]].map(([x, y, n, s]) => ({ x, y, s, e: mk(n) }));
const clock = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
clock.setAttribute('viewBox', '-20 -20 40 40');
clock.style.cssText = 'position:absolute;left:1190px;top:886.08px;width:40px;height:40px;overflow:visible';
clock.innerHTML = `<g stroke="${INK}" stroke-linecap="round"><path id="hh" d="M0 0 V-8" stroke-width="2.1"/><path id="mh" d="M0 0 V-11.6" stroke-width="1.6"/></g><circle r="1.5" fill="${INK}"/>`;
host.append(clock);
const hh = clock.querySelector('#hh'), mh = clock.querySelector('#mh');
{
  const hut = { x: 30.16, top: 80.84 };
  for (let i = 0; i < 3; i++) {
    const o = deco('orbit', hut.x - 3.4, hut.top - 4, { '--d': (-i * 10 / 3).toFixed(2) + 's' }, 3.4 + i * .9);
    o.innerHTML = '<svg viewBox="0 0 20 12"><path d="M0 4 L20 0 L8 12 Z" fill="#fbf6e9" stroke="#2b1d16" stroke-width="1"/><path d="M8 5 L20 0 L11 12" fill="#efe3c6" stroke="#2b1d16" stroke-width=".8"/></svg>';
  }
  seed = 31;
  for (let i = 0; i < 16; i++)
    deco('seed', 6 + rnd() * 80, 38 + rnd() * 48, { '--t': [20, 30, 60][Math.floor(rnd() * 3)] + 's', '--d': (-rnd() * 60).toFixed(1) + 's' });
}
const star = mk('star4', 'mix-blend-mode:screen;opacity:.9');
const FLARES = [[.3, 46, 'rgba(255,236,190,.22)'], [.48, 24, 'rgba(170,220,255,.2)'], [.62, 70, 'rgba(255,214,170,.12)'], [.8, 30, 'rgba(190,255,230,.14)']]
  .map(([k, size, c]) => ({ k, e: glow(size, c) }));
// --- weather over everything on the ground: cloud shadows and the wind going through the grass
const ground = document.createElement('div'); ground.className = 'mw-ground'; stage.append(ground); into(ground);
const SHADOWS = [0, 30].map(ph => ({ ph, e: glow(900, 'rgba(24,46,34,.2)', 'soft') }));
SHADOWS.forEach(s => (s.e.style.height = '300px', s.e.style.marginTop = '-150px'));
const GUST = glow(700, 'rgba(255,250,214,.16)', 'soft'); GUST.style.height = '200px'; GUST.style.marginTop = '-100px';
into(stage);
// ---------------------------------------------------------------- the real weather (Meadow.weather): layers ported from the home dashboard
const WXCSS = `.mw-wx{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.mw-wx>*{position:absolute;inset:0}
.mw-wx .skymask{-webkit-mask:url(${BASE}wx-sky.webp) 0 0/100% 100% no-repeat;mask:url(${BASE}wx-sky.webp) 0 0/100% 100% no-repeat}
.mw-wx .sky{mix-blend-mode:multiply;background:var(--mw-sky,transparent);transition:background 2s}
.mw-wx .scene{mix-blend-mode:multiply;background:var(--mw-scene,transparent);transition:background 2s}
.mw-wx .desat{mix-blend-mode:saturation;background:#808080;opacity:var(--mw-desat,0);transition:opacity 2s}
.mw-wx .haze{background:linear-gradient(180deg,rgba(235,238,242,var(--mw-haze-top,0)) 0%,rgba(235,238,242,var(--mw-haze,0)) 45%,rgba(235,238,242,calc(var(--mw-haze,0) * .6)) 100%)}
.mw-wx .frost{mix-blend-mode:screen;background:linear-gradient(180deg,transparent 0 50%,rgba(255,255,255,.08) 54%,rgba(240,246,255,calc(var(--mw-frost,0) * .7)) 70%,rgba(240,246,255,var(--mw-frost,0)) 100%)}
.mw-wx .deck i{position:absolute;border-radius:50%;background:radial-gradient(ellipse at 50% 55%,var(--mw-cloud,#8b94a1) 0%,var(--mw-cloud,#8b94a1) 38%,transparent 70%);filter:blur(6px);opacity:var(--mw-deck,0);transition:opacity 2s;animation:mw-deck var(--t,180s) linear var(--d,0s) infinite}
@keyframes mw-deck{from{transform:translateX(-30%)}to{transform:translateX(130%)}}
.mw-wx .wins{opacity:var(--mw-win,0);transition:opacity 2s}
.mw-wx .wins img{position:absolute}
.mw-wx .rain{opacity:var(--mw-rain,0);transition:opacity 2s}
.mw-wx .rain b{position:absolute;left:-15%;top:-40%;width:130%;height:180%;rotate:var(--mw-slant,10deg);animation:mw-fall .55s linear infinite;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='220'%3E%3Cg stroke='%23dfe8f2' stroke-linecap='round' stroke-width='1.3' opacity='.75'%3E%3Cpath d='M12 8v26M58 70v22M96 20v30M130 120v24M30 140v28M78 170v20M110 196v18M8 96v20M64 120v16'/%3E%3C/g%3E%3C/svg%3E")}
.mw-wx .rain b+b{background-size:90px 150px;opacity:.6;animation-duration:.8s}
@keyframes mw-fall{from{transform:translateY(-220px)}to{transform:translateY(0)}}
.mw-wx .snow i{position:absolute;top:-4%;left:var(--x);width:var(--s);aspect-ratio:1;border-radius:50%;background:#fff;box-shadow:0 0 3px rgba(255,255,255,.9);animation:mw-flake var(--t,14s) linear var(--d,0s) infinite}
@keyframes mw-flake{0%{transform:translate(0,0)}25%{transform:translate(var(--sw,20px),297px)}50%{transform:translate(calc(var(--sw,20px) * -1),594px)}75%{transform:translate(var(--sw,20px),891px)}100%{transform:translate(0,1188px)}}
.mw-wx .fog{opacity:var(--mw-fog,0);transition:opacity 2s}
.mw-wx .fog i{position:absolute;left:-40%;width:180%;height:var(--h,9%);top:var(--y);border-radius:50%;background:radial-gradient(ellipse at 50% 50%,rgba(240,242,245,.95),rgba(240,242,245,.55) 45%,transparent 72%);filter:blur(8px);animation:mw-band var(--t,90s) ease-in-out var(--d,0s) infinite alternate}
@keyframes mw-band{from{transform:translateX(-8%)}to{transform:translateX(8%)}}
.mw-wx .flash{background:#eef3ff;mix-blend-mode:screen;opacity:0;animation:mw-flash var(--mw-flash,0s) linear infinite}
@keyframes mw-flash{0%,90.5%,91.5%,93%,100%{opacity:0}90.8%{opacity:.55}92.2%{opacity:.35}}
.mw-stage.mw-wet .flock,.mw-stage.mw-wet .seed,.mw-stage.mw-wet .orbit,.mw-stage.mw-dark .flock,.mw-stage.mw-dark .seed,.mw-stage.mw-dull .glint,.mw-stage.mw-dull .wisp{display:none}
@media (prefers-reduced-motion:reduce){.mw-wx *{animation:none!important;transition:none!important}.mw-wx .snow i{top:var(--y)}.mw-wx .flash{display:none}}`;
{ const s = document.createElement('style'); s.textContent = WXCSS; document.head.append(s); }
const wxLayer = html => { const e = document.createElement('div'); e.className = 'mw-wx'; e.innerHTML = html; stage.append(e); return e; };
const wxLow = wxLayer('<div class="sky skymask"></div><div class="deck skymask"></div><div class="scene"></div><div class="desat"></div><div class="haze"></div><div class="frost"></div>');
const tint = document.createElement('div');
tint.style.cssText = 'position:absolute;inset:0;mix-blend-mode:multiply;pointer-events:none;opacity:0';
stage.append(tint);
const lights = document.createElement('div');
lights.style.cssText = 'position:absolute;inset:0;pointer-events:none;opacity:0';
stage.append(lights);
into(lights);
const NIGHT = META.night;
const STARS = NIGHT.stars.map(([x, y, s, ph]) => { const e = glow(10 * s, 'rgba(255,255,240,1)'); e.ph = ph; e.sx = x; e.sy = y; return e; });
const moonGlow = glow(260, 'rgba(255,244,214,.55)');
const moon = document.createElement('div');
moon.style.cssText = 'position:absolute;left:0;top:0;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:radial-gradient(circle at 38% 36%,#fffdf2,#f3e7c4 62%,#e2d3a8);box-shadow:0 0 18px rgba(255,246,220,.9)';
lights.append(moon);
img(BASE + 'windows.webp', LAY.windows);
const winGlow = img(BASE + 'windows-glow.webp', { x: 0, y: 0, w: 1956, h: 1100 }); winGlow.style.mixBlendMode = 'screen';
into(stage);
const nightlife = document.createElement('div');
nightlife.style.cssText = 'position:absolute;inset:0;pointer-events:none;opacity:0';
stage.append(nightlife);
into(nightlife);
const FLIES = Array.from({ length: 26 }, (_, i) => ({ i, e: glow(i % 3 ? 9 : 12, 'rgba(230,255,140,1)') }));
const headlamp = glow(70, 'rgba(255,236,170,.9)');
into(stage);
// these already give off light; keep them above the night
[...FIRES.flatMap(f => [f.g, f.e]), flame, flameGlow, beacon, porthole, doorGlow, ...padLamps, boardGlow, ...TRAIL].forEach(e => stage.append(e));
const wxHigh = wxLayer(`<div class="wins"><img src="${BASE}windows.webp" alt="" style="left:${LAY.windows.x}px;top:${LAY.windows.y}px;width:${LAY.windows.w}px;height:${LAY.windows.h}px"><img src="${BASE}windows-glow.webp" alt="" style="left:0;top:0;width:1956px;height:1100px;mix-blend-mode:screen"></div><div class="rain"><b></b><b></b></div><div class="snow"></div><div class="fog"></div><div class="flash"></div>`);
// what each kind of weather does to the painting; the hour (above) stays the host's to set
const WX_SCENE = {
  clear: {},
  cloudy: { '--mw-sky': '#a9b0ba', '--mw-scene': '#dfe1e4', '--mw-desat': .35, '--mw-deck': .75, '--mw-cloud': '#9aa3af' },
  rain: { '--mw-sky': '#8d96a3', '--mw-scene': '#c9ced6', '--mw-desat': .45, '--mw-deck': .9, '--mw-cloud': '#7e8794' },
  storm: { '--mw-sky': '#555e6c', '--mw-scene': '#8e97a6', '--mw-desat': .55, '--mw-deck': 1, '--mw-cloud': '#5f6774', '--mw-win': .9, '--mw-flash': '9s' },
  snow: { '--mw-sky': '#c4cad2', '--mw-scene': '#e6e9ee', '--mw-desat': .4, '--mw-deck': .7, '--mw-cloud': '#b4bcc7', '--mw-haze-top': .12, '--mw-haze': .08, '--mw-frost': .26 },
  fog: { '--mw-sky': '#c7ccd2', '--mw-desat': .4, '--mw-haze-top': .5, '--mw-haze': .18, '--mw-fog': .9 },
};
const WX_VARS = ['--mw-sky', '--mw-scene', '--mw-desat', '--mw-deck', '--mw-cloud', '--mw-win', '--mw-flash', '--mw-haze-top', '--mw-haze', '--mw-frost', '--mw-fog', '--mw-rain', '--mw-slant'];
const MOOD = { wet: false, dark: false, dull: false };   // what the host says about the sky: no sun when dull, nobody out when wet
let COVER = 0, wxBuilt = '';                              // how much of the night sky the clouds hide
function setMood(m) {
  Object.assign(MOOD, m);
  for (const k of ['wet', 'dark', 'dull']) stage.classList.toggle('mw-' + k, !!MOOD[k]);
}
function setWeather(w) {
  const scene = w && WX_SCENE[w.scene] ? w.scene : 'clear', inten = clamp(w && w.intensity || .8, 0, 1), wind = w && w.wind || 1;
  const look = { ...WX_SCENE[scene] };
  if (scene === 'rain' || scene === 'storm') { look['--mw-rain'] = inten; look['--mw-slant'] = (8 + wind * 4).toFixed(0) + 'deg'; }
  for (const v of WX_VARS) stage.style.removeProperty(v);
  for (const [k, v] of Object.entries(look)) stage.style.setProperty(k, v);
  COVER = { clear: 0, cloudy: .65 }[scene] ?? 1;
  setMood({ wet: ['rain', 'storm', 'snow'].includes(scene), dull: scene !== 'clear' });
  const key = scene + '|' + inten;
  if (key === wxBuilt) return;
  wxBuilt = key;
  let sd = 11; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  const deck = wxLow.querySelector('.deck'), snow = wxHigh.querySelector('.snow'), fog = wxHigh.querySelector('.fog');
  deck.replaceChildren(); snow.replaceChildren(); fog.replaceChildren();
  const put = (box, css, vars) => { const e = document.createElement('i'); Object.assign(e.style, css); for (const [k, v] of Object.entries(vars)) e.style.setProperty(k, v); box.append(e); };
  if (scene !== 'clear') for (let i = 0; i < 9; i++)
    put(deck, { left: (-20 + i * 14) + '%', top: (-6 + r() * 30) + '%', width: (28 + r() * 22) + '%', height: (16 + r() * 14) + '%' }, { '--t': (160 + r() * 120).toFixed(0) + 's', '--d': (-r() * 260).toFixed(0) + 's' });
  if (scene === 'snow') for (let i = 0; i < Math.round(170 * inten); i++) {
    const near = r() < .25;
    put(snow, near ? {} : { opacity: .75 }, { '--x': r() * 100 + '%', '--y': r() * 100 + '%', '--s': (near ? 6 + r() * 3 : 2.5 + r() * 3).toFixed(1) + 'px',
      '--t': (near ? 9 + r() * 4 : 14 + r() * 10).toFixed(1) + 's', '--d': (-r() * 24).toFixed(1) + 's', '--sw': (10 + r() * 30).toFixed(0) + 'px' });
  }
  if (scene === 'fog') for (const [y, h, t] of [[36, 12, 80], [44, 10, 110], [51, 13, 95], [58, 9, 130], [70, 7, 100], [88, 6, 120]])
    put(fog, {}, { '--y': y + '%', '--h': h + '%', '--t': t + 's', '--d': (-r() * 60).toFixed(0) + 's' });
}
const TINTS = [[0, [255, 255, 255], 0], [.33, [255, 176, 96], .3], [.66, [168, 116, 196], .55], [1, [38, 52, 112], .8]];
let HOUR = 0;
function hourTint(h) {
  let i = 0; while (i < TINTS.length - 2 && h > TINTS[i + 1][0]) i++;
  const [h0, c0, o0] = TINTS[i], [h1, c1, o1] = TINTS[i + 1], u = ease((h - h0) / (h1 - h0));
  return [c0.map((c, k) => Math.round(c + (c1[k] - c) * u)), o0 + (o1 - o0) * u];
}

// ================================================================ one frame
function frame(t) {
  const tau = mod(t, LOOP);
  // sun, sky, clouds, airship
  for (const r of SUNRAYS) {
    r.e.style.transform = `rotate(${(r.deg + 1.2 * wave(tau, r.per, r.ph)).toFixed(2)}deg)`;
    r.e.style.opacity = (.4 + .35 * wave(tau, 60 / Math.round(60 / (r.per * 2)), r.ph)).toFixed(3);
  }
  for (const c of CLOUDS) pose(c.e, c.x + c.amp * wave(tau, 60, c.ph), c.y + 3 * wave(tau, 20, c.ph), 0, 1 + .02 * wave(tau, 30, c.ph), 1);
  {
    const u = tau / LOOP, x = 2160 - 2400 * u, y = 118 + 8 * wave(tau, 12) + 30 * u, a = 1.5 * wave(tau, 10, 1);
    pose(airship, x, y, a, .72, .72);
    const r = a * Math.PI / 180, px = 30 * .72, py = 37 * .72;
    pose(prop, x + px * Math.cos(r) - py * Math.sin(r), y + px * Math.sin(r) + py * Math.cos(r), a, .72, .72 * Math.abs(Math.cos(TAU * tau * 6)) + .05);
  }
  for (const b of BOATS) {
    const w = Math.sin(tau / LOOP * TAU + b.ph);
    pose(b.e, b.x + 24 * w, b.y + .7 * Math.sin(tau * Math.PI / 2 + b.ph), 2.2 * Math.sin(tau * Math.PI / 2 + b.ph + 1), b.s, b.s);
  }
  // the giant on the far shore
  {
    const s = 1.35, x = -140 + 2340 * tau / LOOP, y = 612, fr = Math.floor(mod(tau / 1.5, 1) * 8);
    setFrame(mechaEl, fr); pose(mechaEl, x, y, 0, s, s);
    at(visor, x + 6 * s, y - 95 * s, 1, .55 + .4 * Math.abs(wave(tau, 2)));
    const burn = Math.max(0, wave(tau, 12, 1)) ** 4;
    at(thruster, x - 14 * s, y - 52 * s, .5 + burn, burn * .9);
  }
  // the dragon, weaving through the towers
  {
    const T0 = 15, T1 = 36, on = tau >= T0 && tau < T1;
    [dsvg, dhead, ...dclaws].forEach(e => show(e, on));
    if (on) {
      const H = t_ => { const q = t_ - T0; return [2250 - 150 * q, 180 + 62 * Math.sin(TAU * q / 6) + 18 * Math.sin(TAU * q / 2.5)]; };
      const n = 52, pts = [], L = [], Rr = [];
      for (let k = 0; k <= n; k++) pts.push(H(tau - k * .06));
      const W = k => 3 + 14 * Math.pow(1 - k / n, .7) * (1 + .15 * Math.sin(k * .5));
      const nrm = k => { const a = pts[Math.max(0, k - 1)], b = pts[Math.min(n, k + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [-dy / l, dx / l]; };
      for (let k = 0; k <= n; k++) { const [nx, ny] = nrm(k), w = W(k); L.push([pts[k][0] + nx * w, pts[k][1] + ny * w]); Rr.push([pts[k][0] - nx * w, pts[k][1] - ny * w]); }
      const f1 = q => q[0].toFixed(1) + ' ' + q[1].toFixed(1);
      dbody.setAttribute('d', 'M' + L.map(f1).join(' L') + ' L' + Rr.reverse().map(f1).join(' L') + 'Z');
      Rr.reverse();
      dbelly.setAttribute('d', 'M' + pts.map((q, k) => { const [nx, ny] = nrm(k), w = W(k) * .5; return f1([q[0] - nx * w, q[1] - ny * w]); }).join(' L'));
      dbelly.setAttribute('stroke-width', '4');
      dback.setAttribute('d', 'M' + pts.map((q, k) => { const [nx, ny] = nrm(k), w = W(k) * .45; return f1([q[0] + nx * w, q[1] + ny * w]); }).join(' L'));
      [...dspikes.children].forEach((pg, i) => {
        const k = 3 + i * 3, [nx, ny] = nrm(k), w = W(k), a = pts[k], b = pts[k + 1];
        const tx = b[0] - a[0], ty = b[1] - a[1], tl = Math.hypot(tx, ty) || 1;
        const base = [a[0] + nx * w * .9, a[1] + ny * w * .9], hgt = 6 + 5 * (1 - k / n);
        pg.setAttribute('points', `${f1([base[0] - tx / tl * 3, base[1] - ty / tl * 3])} ${f1([base[0] + nx * hgt + tx / tl * 3, base[1] + ny * hgt + ty / tl * 3])} ${f1([base[0] + tx / tl * 3, base[1] + ty / tl * 3])}`);
      });
      const e = pts[n], d = pts[n - 1], [nx, ny] = nrm(n);
      dtail.setAttribute('d', `M${f1(d)} L${f1([e[0] + nx * 9, e[1] + ny * 9])} L${f1([e[0] + (e[0] - d[0]) * 3, e[1] + (e[1] - d[1]) * 3])} L${f1([e[0] - nx * 9, e[1] - ny * 9])} Z`);
      [10, 12, 30, 32].forEach((k, i) => {
        const [nx2, ny2] = nrm(k), w = W(k), a = pts[k], b = pts[k + 1], deg = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
        pose(dclaws[i], a[0] - nx2 * w, a[1] - ny2 * w, deg + 70 + 25 * wave(tau, 1, i), 1.7, 1.7);
      });
      const h = pts[0], h2 = H(tau - .03), deg = Math.atan2(h[1] - h2[1], h[0] - h2[0]) * 180 / Math.PI, left = h[0] < h2[0];
      pose(dhead, h[0], h[1], deg, 1.6, left ? -1.6 : 1.6);
      const r = deg * Math.PI / 180, sgn = left ? -1 : 1, tip = [h[0] + 52 * Math.cos(r), h[1] + 52 * Math.sin(r)];
      let wd = '';
      for (const off of [-2.5, 3]) {
        const o = [tip[0] - off * Math.sin(r) * sgn, tip[1] + off * Math.cos(r) * sgn];
        wd += 'M' + f1(o);
        for (let k = 1; k <= 8; k++) { const back = -6 * k; wd += ' L' + f1([o[0] + back * Math.cos(r) + 4 * Math.sin(TAU * tau * 1.2 + k * .7 + off) * -Math.sin(r), o[1] + back * Math.sin(r) + 4 * Math.sin(TAU * tau * 1.2 + k * .7 + off) * Math.cos(r)]); }
      }
      dwhisk.setAttribute('d', wd);
    }
  }
  // the castle's moving parts
  pose(sails, 958, 326, tau * 24);
  for (const g of GEARS) g.e.style.transform = `translate(${(g.l.cx - g.l.w / 2).toFixed(2)}px,${(g.l.cy - g.l.h / 2).toFixed(2)}px) rotate(${(tau / LOOP * 360 * g.rev).toFixed(2)}deg)`;
  const breeze = .6 + .4 * wave(tau, 12);
  WASH.forEach(({ g, e }, i) => pose(e, g.x, g.y, breeze * (7 * wave(tau, 2.5, i * .9) + 4), 1 - .08 * Math.abs(wave(tau, 1.5, i)), 1));
  BUNT.forEach(({ b, e }, i) => pose(e, b.x, b.y, breeze * 9 * wave(tau, 2, i * .55), 1, .8 + .2 * wave(tau, 1, i * .7)));
  pose(pennant, EX.flag[0], EX.flag[1], 2 * wave(tau, 3), .9 + .1 * wave(tau, 1.5), 1, ` skewY(${(5 * wave(tau, 1, .4)).toFixed(2)}deg)`);
  const smoke = []; chimneyPuffs(t, smoke); ventPuffs(t, smoke); drawPool(POOL_SMOKE, smoke);
  // the pad and the rocket ship
  pose(pad, PADX, PADY);
  const r = shipAt(tau), arriving = tau > 3 && tau < 13;
  padLamps.forEach((g, i) => at(g, PADX + (i ? 50 : -50), PADY - 10.5, 1, arriving ? (mod(tau * 2, 1) < .5 ? .95 : .15) : (mod(tau / 2 + i * .5, 1) < .25 ? .8 : .1)));
  [ship, flame, flameGlow, door, doorGlow, beacon, porthole].forEach(e => show(e, !!r));
  if (r) {
    const rad = r.tilt * Math.PI / 180, c = Math.cos(rad), s = Math.sin(rad);
    const L = (lx, ly) => [r.x + lx * c - ly * s, r.y + lx * s + ly * c];   // ship-local to world
    pose(ship, r.x, r.y, r.tilt, 1 + r.sq * .6, 1 - r.sq);
    const [nx, ny] = L(0, -10 * (1 - r.sq));
    const fk = r.fl * (.88 + .12 * Math.sin(tau * 47) + .08 * Math.sin(tau * 83 + 1)) * r.long;
    const reach = Math.max(.04, (PADY + 1 - ny) / 62);
    pose(flame, nx, ny - 1, r.tilt, r.fl * (.95 + .07 * Math.sin(tau * 61)), Math.min(fk, ny < PADY ? reach : 99));
    at(flameGlow, nx - 22 * s, ny + 22 * c, .4 + .8 * r.fl, r.fl * (.75 + .2 * Math.sin(tau * 41)));
    const [dx, dy] = L(-8, -41 * (1 - r.sq));
    pose(door, dx, dy, r.tilt, Math.cos(r.door * Math.PI * .88), 1);
    const [gx, gy] = L(0, -40); at(doorGlow, gx, gy, .6 + .5 * r.door, r.door * .9);
    const [bx, by] = L(0, -145); at(beacon, bx, by, 1, mod(tau, 1) < .35 ? 1 : .15);
    const [px, py] = L(0, -77); at(porthole, px, py, 1, .5 + .25 * wave(tau, 2));
  }
  const sp = []; shipPuffs(t, sp); drawPool(POOL_SHIP, sp);
  GULLS.forEach((g, i) => {
    const a = TAU * tau / g.per + g.ph, x = 1300 + 360 * Math.cos(a), y = 230 + 55 * Math.sin(a) + 10 * wave(tau, 5, i);
    pose(g.e, x, y, -8 * Math.cos(a), g.s * (Math.sin(a) > 0 ? -1 : 1), g.s * (.45 + .55 * Math.abs(Math.sin(TAU * tau * 2 + i))));
  });
  // the hoverboard rider, racing the rocket ship as it climbs
  {
    const T0 = 41, T1 = 47.5, on = tau >= T0 && tau < T1;
    const B = u => { const P = [[-80, 840], [560, 380], [1300, 250], [2160, 20]], a = (1 - u) ** 3, b = 3 * (1 - u) ** 2 * u, c = 3 * (1 - u) * u * u, d = u ** 3;
      return [a * P[0][0] + b * P[1][0] + c * P[2][0] + d * P[3][0], a * P[0][1] + b * P[1][1] + c * P[2][1] + d * P[3][1]]; };
    [surfer, boardGlow, scarf].forEach(e => show(e, on));
    if (on) {
      const u = (tau - T0) / (T1 - T0), [x, y] = B(u), [x2, y2] = B(Math.min(1, u + .01));
      const tilt = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI * .55, spin = 360 * ease((u - .4) / .17), a = tilt - spin, s = 2.3;
      pose(surfer, x, y, a, s, s);
      const r = a * Math.PI / 180, c = Math.cos(r), sn = Math.sin(r), Lw = (lx, ly) => [x + s * (lx * c - ly * sn), y + s * (lx * sn + ly * c)];
      const g = Lw(0, 3); at(boardGlow, g[0], g[1], 1, .85);
      const nk = Lw(2, -21), dirx = (x - x2), diry = (y - y2), dl = Math.hypot(dirx, diry) || 1;
      let d = `M${nk[0].toFixed(1)} ${nk[1].toFixed(1)}`;
      for (let k = 1; k <= 7; k++) d += ` L${(nk[0] + dirx / dl * 9 * k + 3 * Math.sin(TAU * tau * 3 - k) * -diry / dl).toFixed(1)} ${(nk[1] + diry / dl * 9 * k + 3 * Math.sin(TAU * tau * 3 - k) * dirx / dl).toFixed(1)}`;
      scarfP.setAttribute('d', d); scarf.querySelector('#scarf2').setAttribute('d', d);
    }
    TRAIL.forEach((e, i) => {
      const age = i * .03 + mod(tau, .03), tb = tau - age, u = (tb - T0) / (T1 - T0);
      if (u < 0 || u > 1 || !on && tau - T1 > .9) { if (e.style.opacity !== '0') e.style.opacity = '0'; return; }
      const [x, y] = B(u); at(e, x + (hash(i, 2) - .5) * 10, y + 4 + (hash(i, 3) - .5) * 10, 1 - age * 1.1, (1 - age / .84) * .9);
    });
  }
  // sheep graze, villagers stroll, the kite flies
  for (const sh of SHEEP) {
    let u = mod(tau + sh.ph, LOOP), x, y, face = sh.face || 1, fr = 3, walking = false;
    for (let j = 0; j < 4; j++) {
      if (u < sh.graze) { [x, y] = sh.wp[j]; face = x >= sh.wp[(j + 3) % 4][0] ? 1 : -1; fr = mod(u, 6) > 4.6 ? 0 : 3; break; }
      u -= sh.graze;
      if (u < sh.walk[j]) { const w = sh.wp[j], n = sh.wp[(j + 1) % 4], q = u / sh.walk[j]; x = w[0] + (n[0] - w[0]) * q; y = w[1] + (n[1] - w[1]) * q; face = n[0] >= w[0] ? 1 : -1; fr = mod(tau * 3, 1) < .5 ? 1 : 2; walking = true; break; }
      u -= sh.walk[j];
    }
    const hop = sh.lamb && walking ? -3.2 * Math.abs(Math.sin(tau * Math.PI * 3)) : 0;
    setFrame(sh.e, fr); pose(sh.e, x, y + hop, 0, face * sh.scale, sh.scale);
  }
  for (const w of WALKERS) {
    const going = tau >= w.out[0] && tau < w.out[1], coming = tau >= w.back[0] && tau < w.back[1], moving = going || coming;
    const lastOut = mod(tau - w.out[1], LOOP) < mod(tau - w.back[1], LOOP);
    const d = going ? (tau - w.out[0]) / (w.out[1] - w.out[0]) : coming ? 1 - (tau - w.back[0]) / (w.back[1] - w.back[0]) : lastOut ? 1 : 0;
    const sgn = going ? 1 : coming ? -1 : lastOut ? 1 : -1;
    const P = w.path, [x, y] = P.at(d * P.len), [x2] = P.at(clamp(d + .02 * sgn, 0, 1) * P.len), [x0] = P.at(clamp(d - .02 * sgn, 0, 1) * P.len);
    const face = x2 - x0 >= 0 ? 1 : -1, s = 1.5 * (1 + (y - 800) / 600), step = mod(tau * 4.5, 1) < .5;
    const bob = moving ? -.7 * Math.abs(Math.sin(tau * Math.PI * 4.5)) : 0;
    pose(w.a, x, y + bob, 0, face * s, s); pose(w.b, x, y + bob, 0, face * s, s);
    show(w.a, !moving || step); show(w.b, moving && !step);
  }
  {
    pose(kid, KID.x, KID.y, 0, -1.6, 1.6);
    const kx = 690 + 22 * wave(tau, 6) + 8 * wave(tau, 2.5, 1), ky = 520 + 12 * wave(tau, 4, 1) + 5 * wave(tau, 1.5), ka = 12 * wave(tau, 3) + 6 * wave(tau, 1.2, 2);
    pose(kite, kx, ky, ka, 1.6, 1.6);
    const hx = KID.x - 5.5 * 1.6, hy = KID.y - 15.5 * 1.6, ra = ka * Math.PI / 180, bx = kx - 16 * Math.sin(ra), by = ky + 16 * Math.cos(ra);
    kstr.setAttribute('d', `M${hx.toFixed(1)} ${hy.toFixed(1)} Q${((hx + bx) / 2 + 30).toFixed(1)} ${((hy + by) / 2 + 60).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`);
    let tail = `M${bx.toFixed(1)} ${by.toFixed(1)}`;
    for (let k = 1; k <= 7; k++) tail += ` L${(bx - 4 * k + 3 * Math.sin(TAU * tau * 1.5 - k * .8)).toFixed(1)} ${(by + 6 * k).toFixed(1)}`;
    ktail.setAttribute('d', tail);
  }
  // the fox spirit and its fox-fires
  {
    const { x, y, s } = FOX;
    foxTails.forEach((t, i) => pose(t.e, x - 6 * s, y - 4 * s, t.a + 9 * wave(tau, 3, i * 1.3) + 4 * wave(tau, 1.2, i), s, s));
    pose(foxEl, x, y + .4 * wave(tau, 4), 0, s, s * (1 + .012 * wave(tau, 4)));
    FIRES.forEach(f => {
      const a = TAU * tau / 6 + f.i * TAU / 3, fx = x + 48 * Math.cos(a), fy = y - 46 + 14 * Math.sin(a) + 4 * wave(tau, 2, f.i);
      pose(f.e, fx, fy, 6 * wave(tau, 1, f.i), 1.7 + .1 * wave(tau, .5, f.i), 1.3 + .2 * wave(tau, .5, f.i + 1));
      at(f.g, fx, fy - 2, 1, .65 + .3 * wave(tau, 1, f.i));
    });
  }
  // the train
  const tr = trainAt(tau);
  for (const car of TRAIN) { show(car.e, !!tr); car.wheels.forEach(w => show(w.e, !!tr)); }
  show(rod, !!tr);
  if (tr) {
    for (const car of TRAIN) {
      const [x, y, a] = carPose(tr, car.off), deg = a * 180 / Math.PI, c = Math.cos(a), s = Math.sin(a);
      pose(car.e, x, y + (tr.v > 20 ? .4 * Math.sin(tr.p * .21 + car.off) : 0), deg, tr.dir, 1);
      for (const w of car.wheels) {
        const lx = w.lx * tr.dir;
        w.wx = x + lx * c - w.ly * s; w.wy = y + lx * s + w.ly * c;
        w.rot = tr.dir * tr.p / w.r;
        pose(w.e, w.wx, w.wy, w.rot * 180 / Math.PI);
      }
      if (car.off === 42) {
        const [d1, d2] = car.wheels.filter(w => w.r === 8), rr = 4;
        const px = (d1.wx + d2.wx) / 2 + rr * Math.cos(d1.rot + a), py = (d1.wy + d2.wy) / 2 + rr * Math.sin(d1.rot + a);
        rod.style.transform = `translate(${px.toFixed(2)}px,${py.toFixed(2)}px) rotate(${deg.toFixed(2)}deg)`;
      }
    }
  }
  const tp = []; trainPuffs(t, tp); drawPool(POOL_TRAIN, tp);
  // butterflies and the wind in the near grass
  BFLIES.forEach((b, i) => {
    const x = b.x + 46 * wave(tau, 12, b.ph) + 20 * wave(tau, 5, b.ph * 2), y = b.y + 22 * wave(tau, 6, b.ph) - 10 * Math.abs(wave(tau, 2, b.ph));
    pose(b.e, x, y, 10 * wave(tau, 3, b.ph), .2 + .8 * Math.abs(Math.sin(TAU * tau * 2 + i)), 1);
  });
  const gustX = -400 + 2800 * mod(tau / 10, 1);
  at(GUST, gustX, 400 + 60 * wave(tau, 30), 1, .9);
  for (const g of GRASS) {
    const push = Math.exp(-(((g.x - gustX) / 260) ** 2));
    pose(g.e, g.x, g.y, 2.2 * wave(tau, 4, g.x / 300) + 7 * push, g.s, g.s);
  }
  SHADOWS.forEach((s, i) => at(s.e, -700 + 3400 * mod((tau + s.ph) / LOOP, 1), i ? 420 : 240, 1, 1));
  // the sun's glint and its lens flare
  {
    const sx = 156, sy = 52;
    pose(star, sx, sy, tau * 6, 1 + .18 * wave(tau, 4), 1 + .18 * wave(tau, 4));
    star.style.opacity = (.7 + .25 * wave(tau, 3)).toFixed(3);
    FLARES.forEach(f => at(f.e, sx + (1150 - sx) * f.k, sy + (640 - sy) * f.k, 1, .7 + .3 * wave(tau, 5, f.k * 6)));
  }
  // the hour: afternoon to night, set by whoever embeds the scene
  {
    const [c, o] = hourTint(HOUR), night = ease((HOUR - .55) / .4), sun = MOOD.dull || MOOD.dark ? 0 : 1 - night;
    const late = Math.max(night, MOOD.dark ? 1 : 0);      // a host that paints its own night still gets the fireflies and the headlamp
    nightlife.style.opacity = late.toFixed(3);
    ground.style.opacity = MOOD.dull || MOOD.dark ? '0' : '1';
    tint.style.background = `rgb(${c.join(',')})`; tint.style.opacity = o.toFixed(3);
    lights.style.opacity = night.toFixed(3);
    SUNRAYS.forEach(r => (r.e.style.opacity = (parseFloat(r.e.style.opacity) * sun).toFixed(3)));
    star.style.opacity = (parseFloat(star.style.opacity) * sun).toFixed(3);
    FLARES.forEach(f => (f.e.style.opacity = (parseFloat(f.e.style.opacity) * sun).toFixed(3)));
    if (night > 0) {
      for (const s of STARS) at(s, s.sx, s.sy, 1, (.45 + .55 * Math.abs(Math.sin(TAU * tau / 3 + s.ph))) * (1 - COVER));
      const [mx, my] = NIGHT.moon; at(moon, mx, my, 1, 1 - COVER); at(moonGlow, mx, my, 1, .8 * (1 - COVER));
      winGlow.style.opacity = (.75 + .2 * wave(tau, 4)).toFixed(3);
    }
    if (late > 0) {
      FLIES.forEach(({ i, e }) => {
        const x = 120 + mod(i * 263, 1700) + 40 * wave(tau, 10, i) + 18 * wave(tau, 3, i * 2), y = 700 + mod(i * 97, 330) + 20 * wave(tau, 6, i * 1.7);
        at(e, x, y, 1, MOOD.wet ? 0 : Math.max(0, wave(tau, [2, 3, 4, 5][i % 4], i)) ** 2);
      });
      const trn = trainAt(tau);
      if (trn) { const [x, y, a] = carPose(trn, 6); at(headlamp, x + trn.dir * 34 * Math.cos(a), y - 39, 1, .9); } else headlamp.style.opacity = '0';
    }
    FIRES.forEach(f => (f.g.style.transform += ` scale(${(1 + late).toFixed(2)})`));
    // butterflies, gulls and the kite keep to fair daylight; the villagers stay in from the rain
    const fair = !MOOD.wet && !MOOD.dark;
    for (const b of BFLIES) show(b.e, fair);
    for (const g of GULLS) show(g.e, fair);
    [kid, kite, strings].forEach(e => show(e, fair));
    if (MOOD.wet) for (const w of WALKERS) { show(w.a, false); show(w.b, false); }
  }
  // the clock
  const now = CAPTURE ? new Date(2026, 0, 1, 10, 8) : new Date();
  const m = now.getMinutes() + now.getSeconds() / 60, h = (now.getHours() % 12) + m / 60;
  hh.setAttribute('transform', `rotate(${(h * 30).toFixed(2)})`);
  mh.setAttribute('transform', `rotate(${(m * 6).toFixed(2)})`);
}

// ---------------------------------------------------------------- the camera: cover the host, then zoom toward a focus
let CAM = { zoom: 1, fx: .6, fy: .5 }, HOST = null;
function fit() {
  if (!HOST) return;
  const vw = HOST.clientWidth, vh = HOST.clientHeight;
  const k = Math.max(vw / 1956, vh / 1100) * CAM.zoom;
  const tx = clamp(vw / 2 - CAM.fx * 1956 * k, vw - 1956 * k, 0), ty = clamp(vh / 2 - CAM.fy * 1100 * k, vh - 1100 * k, 0);
  stage.style.transform = `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${k.toFixed(4)})`;
}
let running = false, raf = 0, t0 = 0, last = 22;
const loop = now => { last = (now - t0) / 1000 + 4; frame(last); raf = requestAnimationFrame(loop); };
window.Meadow = {
  mount(host) { HOST = host; host.append(stage); new ResizeObserver(fit).observe(host); fit(); frame(last); return this; },
  play() { if (running || CAPTURE) return; running = true; t0 = performance.now() - (last - 4) * 1000; raf = requestAnimationFrame(loop); },
  pause() { running = false; cancelAnimationFrame(raf); },
  camera(c) { CAM = c; fit(); },
  hour(h) { HOUR = clamp(h, 0, 1); if (!running) frame(last); },
  // the real sky: { scene: clear|cloudy|rain|storm|snow|fog, intensity: 0..1, wind: 1..3.5 }, or null for the painting as it is
  weather(w) { setWeather(w); if (!running) frame(last); },
  // for a host that draws its own weather and night over the scene: { wet, dark, dull }
  mood(m) { setMood(m); if (!running) frame(last); },
  seek(t) { for (const a of stage.getAnimations({ subtree: true })) { a.pause(); a.currentTime = t * 1000; } last = t; frame(t); },
};

})();
