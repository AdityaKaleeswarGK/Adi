// The jaathagam sky behind every page.
// The wheel is the birth chart from the jaathagam; on a fresh visit it spins in while the
// grahas travel by their real orbits from the morning of birth to today, then settles.
// Planet positions: JPL approximate orbital elements (Standish), geocentric, Lahiri sidereal.
// The canvas is persisted across view-transition navigations, so this runs once per visit.

var NAK = ['அசுவினி','பரணி','கார்த்திகை','ரோகிணி','மிருகசீரிடம்','திருவாதிரை','புனர்பூசம்','பூசம்','ஆயில்யம்','மகம்','பூரம்','உத்திரம்','அஸ்தம்','சித்திரை','சுவாதி','விசாகம்','அனுஷம்','கேட்டை','மூலம்','பூராடம்','உத்திராடம்','திருவோணம்','அவிட்டம்','சதயம்','பூரட்டாதி','உத்திரட்டாதி','ரேவதி'];
var RASI = ['மேஷம்','ரிஷபம்','மிதுனம்','கடகம்','சிம்மம்','கன்னி','துலாம்','விருச்சிகம்','தனுசு','மகரம்','கும்பம்','மீனம்'];
var ELEM = {
  Mercury: [[0.38709927,0.20563593,7.00497902,252.25032350,77.45779628,48.33076593],[0.00000037,0.00001906,-0.00594749,149472.67411175,0.16047689,-0.12534081]],
  Venus: [[0.72333566,0.00677672,3.39467605,181.97909950,131.60246718,76.67984255],[0.00000390,-0.00004107,-0.00078890,58517.81538729,0.00268329,-0.27769418]],
  Earth: [[1.00000261,0.01671123,-0.00001531,100.46457166,102.93768193,0.0],[0.00000562,-0.00004392,-0.01294668,35999.37244981,0.32327364,0.0]],
  Mars: [[1.52371034,0.09339410,1.84969142,-4.55343205,-23.94362959,49.55953891],[0.00001847,0.00007882,-0.00813131,19140.30268499,0.44441088,-0.29257343]],
  Jupiter: [[5.20288700,0.04838624,1.30439695,34.39644051,14.72847983,100.47390909],[-0.00011607,-0.00013253,-0.00183714,3034.74612775,0.21252668,0.20469106]],
  Saturn: [[9.53667594,0.05386179,2.48599187,49.95424423,92.59887831,113.66242448],[-0.00125060,-0.00050991,0.00193609,1222.49362201,-0.41897216,-0.28867794]]
};
// natal positions as written in the jaathagam: [nakshatra index, pada]
var BIRTH_JD = 2453350.53125;
var LAGNA = 16 * 40 / 3 + 0.5 * 10 / 3;
var GRAHAS = [
  { key: 'Sun', ta: 'சூரியன்', ab: 'சூ', color: '#F4A340', nak: 17, pada: 4, band: [0.60, 0.60], dist: [0.98, 1.02] },
  { key: 'Moon', ta: 'சந்திரன்', ab: 'சந்', color: '#F1EDE2', nak: 16, pada: 3, band: [0.16, 0.16], dist: [1, 1] },
  { key: 'Mars', ta: 'செவ்வாய்', ab: 'செ', color: '#EA5A3D', nak: 15, pada: 3, band: [0.62, 0.80], dist: [0.37, 2.68] },
  { key: 'Mercury', ta: 'புதன்', ab: 'பு', color: '#3CC79A', nak: 16, pada: 1, band: [0.22, 0.36], dist: [0.53, 1.47] },
  { key: 'Jupiter', ta: 'வியாழன்', ab: 'வி', color: '#F2C14E', nak: 12, pada: 4, band: [0.82, 0.88], dist: [3.95, 6.46] },
  { key: 'Venus', ta: 'சுக்கிரன்', ab: 'சு', color: '#F6E7F0', nak: 15, pada: 3, band: [0.38, 0.56], dist: [0.26, 1.74] },
  { key: 'Saturn', ta: 'சனி', ab: 'ச', color: '#6F86D6', nak: 6, pada: 3, band: [0.89, 0.93], dist: [8.0, 11.1] },
  { key: 'Rahu', ta: 'ராகு', ab: 'ரா', color: '#9B8FB8', nak: 0, pada: 2, band: [0.96, 0.96], dist: [1, 1] },
  { key: 'Ketu', ta: 'கேது', ab: 'கே', color: '#C9A27E', nak: 13, pada: 4, band: [0.96, 0.96], dist: [1, 1] }
];
GRAHAS.forEach(function (g) { g.natalLon = g.nak * 40 / 3 + (g.pada - 0.5) * 10 / 3; });
var EVENT_KEYS = { Sun: 1, Jupiter: 1, Saturn: 1, Rahu: 1 };

function rad(d) { return d * Math.PI / 180; }
function norm(d) { d %= 360; return d < 0 ? d + 360 : d; }
function helio(name, T) {
  var e0 = ELEM[name][0], r = ELEM[name][1], v = [];
  for (var i = 0; i < 6; i++) v.push(e0[i] + r[i] * T);
  var a = v[0], e = v[1], I = rad(v[2]), L = v[3], w = v[4], O = rad(v[5]);
  var om = rad(w) - O, M = rad(norm(L - w)), E = M;
  for (var k = 0; k < 7; k++) E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  var xp = a * (Math.cos(E) - e), yp = a * Math.sqrt(1 - e * e) * Math.sin(E);
  var co = Math.cos(om), so = Math.sin(om), cO = Math.cos(O), sO = Math.sin(O), cI = Math.cos(I), sI = Math.sin(I);
  return [
    (co * cO - so * sO * cI) * xp + (-so * cO - co * sO * cI) * yp,
    (co * sO + so * cO * cI) * xp + (-so * sO + co * cO * cI) * yp,
    (so * sI) * xp + (co * sI) * yp
  ];
}
// sidereal (Lahiri) longitude in degrees and geocentric distance in AU
function skyAt(jd) {
  var T = (jd - 2451545) / 36525, d = jd - 2451545, aya = 23.853 + 1.3969 * T;
  var E = helio('Earth', T), out = {};
  out.Sun = [norm(Math.atan2(-E[1], -E[0]) * 180 / Math.PI - 23.853), Math.hypot(E[0], E[1])];
  ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'].forEach(function (n) {
    var P = helio(n, T), x = P[0] - E[0], y = P[1] - E[1], z = P[2] - E[2];
    out[n] = [norm(Math.atan2(y, x) * 180 / Math.PI - 23.853), Math.sqrt(x * x + y * y + z * z)];
  });
  var L = 218.316 + 13.176396 * d, Mm = rad(134.963 + 13.064993 * d), D = rad(297.850 + 12.190749 * d), Ms = rad(357.529 + 0.98560028 * d);
  out.Moon = [norm(L + 6.289 * Math.sin(Mm) + 1.274 * Math.sin(2 * D - Mm) + 0.658 * Math.sin(2 * D) - 0.186 * Math.sin(Ms) - aya), 1];
  var rahu = norm(125.04452 - 1934.136261 * T - aya);
  out.Rahu = [rahu, 1]; out.Ketu = [norm(rahu + 180), 1];
  return out;
}
function jdNow() { return Date.now() / 86400000 + 2440587.5; }
function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

function smooth(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }

class Sky {
  constructor(canvas) {
    this.c0 = canvas;
  }

  init() {
    this.page = 'home';
    this.journeySec = 9;
    this.settleSec = 1.8;
    this.tries = 0;
    this.flashes = [];
    this.setup();
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.retry) clearTimeout(this.retry);
    if (this.ro2) this.ro2.disconnect();
    window.removeEventListener('resize', this.onResize);
  }

  setup() {
    var c = this.c0;
    if (!c) return;
    this.c = c; this.ctx = c.getContext('2d');
    this.trail = document.createElement('canvas');
    this.tctx = this.trail.getContext('2d');
    this.reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);
    this.time = 0;
    this.resize();
    this.startJourney();
    this.last = performance.now();
    var loop = (now) => {
      this.raf = requestAnimationFrame(loop);
      var dt = Math.min(0.05, (now - this.last) / 1000); this.last = now;
      // pages that opt out (blog posts) keep the sky paused and hidden
      if (document.documentElement.dataset.sky === 'off') return;
      this.tick(dt);
      this.draw();
    };
    if (this.reduced) { this.elapsed = this.journeySec + this.settleSec; this.tick(0); this.draw(); }
    else this.raf = requestAnimationFrame(loop);
  }

  startJourney() {
    this.elapsed = 0;
    this.trailDay = 0;
    this.prev = skyAt(BIRTH_JD);
    if (this.tctx) this.tctx.clearRect(0, 0, this.S, this.S);
  }

  // the chakra sits in the centre of every page, as large as fits with its whole rim on screen
  layoutFor(page) {
    var w = this.w, h = this.h;
    // phones: a smaller chakra centred on the page's anchor (the round photo on the home page),
    // so on landing it sits around you; it stays fixed there as the content scrolls over it
    if (w < 700) {
      var Rm = Math.min(w * 0.40, h * 0.24);
      var anchor = document.getElementById('sky-anchor');
      if (anchor) {
        var r = anchor.getBoundingClientRect();
        var y = r.top + (window.scrollY || 0) + r.height / 2;
        if (r.height > 0) return { x: w / 2, y: y, R: Rm };
      }
      return { x: w / 2, y: h * 0.42, R: Rm };
    }
    var R = (Math.min(w, h - 120) / 2 - 8) / 1.2;
    return { x: w / 2, y: h / 2 + 20, R: Math.max(80, R) };
  }

  resize() {
    var w = window.innerWidth, h = window.innerHeight;
    if (!w || !h) return;
    var dpr = Math.min(1.5, window.devicePixelRatio || 1);
    this.w = w; this.h = h;
    this.c.width = Math.round(w * dpr); this.c.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // the trail is drawn once at a reference radius and scaled with the chakra
    this.R0 = Math.min(w, h) * 0.36;
    this.S = Math.ceil(this.R0 * 2.5);
    this.trail.width = Math.round(this.S * dpr); this.trail.height = Math.round(this.S * dpr);
    this.tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cur = this.layoutFor(this.page);
    // a 3-D star field; each star has its own depth
    var seed = 5, rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    this.stars = [];
    var n = Math.round(Math.min(1400, w * h / 1000));
    for (var i = 0; i < n; i++) this.stars.push({ x: rnd() * 2 - 1, y: rnd() * 2 - 1, z: 0.05 + rnd() * 0.95, b: 0.4 + rnd() * 0.6, tw: 0.5 + rnd() * 2, ph: rnd() * 6.28 });
    var upTo = this.trailDay || 0;
    this.trailDay = 0;
    if (upTo > 0) this.extendTrail(upTo);
  }

  local(lon, frac, R) {
    var phi = Math.PI + rad(lon - LAGNA), r = R * frac;
    return [r * Math.cos(phi), -r * Math.sin(phi)];
  }

  project(p) {
    var cs = Math.cos(this.spin), sn = Math.sin(this.spin);
    return [this.cur.x + p[0] * cs - p[1] * sn, this.cur.y + (this.dy || 0) + p[0] * sn + p[1] * cs];
  }

  radius(g, dist) {
    if (g.band[0] === g.band[1]) return g.band[0];
    var t = Math.max(0, Math.min(1, (dist - g.dist[0]) / (g.dist[1] - g.dist[0])));
    return g.band[0] + t * (g.band[1] - g.band[0]);
  }

  extendTrail(toDay) {
    var from = this.trailDay;
    if (toDay <= from) return;
    var tc = this.tctx, half = this.S / 2, self = this, days = [];
    for (var d = from; d <= toDay; d += 1) days.push(skyAt(BIRTH_JD + d));
    tc.globalCompositeOperation = 'lighter';
    tc.lineWidth = 1.1;
    GRAHAS.forEach(function (g) {
      if (g.key === 'Moon') return;
      tc.strokeStyle = g.color;
      tc.globalAlpha = g.key === 'Sun' || g.key === 'Rahu' || g.key === 'Ketu' ? 0.07 : 0.24;
      tc.beginPath();
      days.forEach(function (sky, i) {
        var s = sky[g.key], p = self.local(s[0], self.radius(g, s[1]), self.R0);
        if (i === 0) tc.moveTo(half + p[0], half + p[1]); else tc.lineTo(half + p[0], half + p[1]);
      });
      tc.stroke();
    });
    tc.globalAlpha = 1;
    tc.globalCompositeOperation = 'source-over';
    this.trailDay = toDay;
  }

  tick(dt) {
    // the page can start with a zero-size viewport (a hidden tab); size the sky once it has one
    if (!this.stars) { this.resize(); if (!this.stars) return; }
    this.time += dt;
    var sy = window.scrollY || window.pageYOffset || 0;
    this.scroll = (this.scroll || 0) + (sy - (this.scroll || 0)) * Math.min(1, dt * 8);
    this.elapsed += dt;
    var nowJd = jdNow(), t = Math.min(1, this.elapsed / this.journeySec);
    this.live = t >= 1;
    this.jd = this.live ? nowJd : BIRTH_JD + ease(t) * (nowJd - BIRTH_JD);
    this.sky = skyAt(this.jd);
    this.extendTrail(Math.floor(this.jd - BIRTH_JD));
    // spin in fast, slowing to rest exactly as the sky reaches today
    this.spin = Math.PI * 5 * Math.pow(1 - ease(t), 2);
    // after it lands: planets brighten, rings step back
    this.settle = smooth((this.elapsed - this.journeySec) / this.settleSec);
    var speed = 0.02;
    this.wheelAlpha = 1;
    var self = this;
    this.stars.forEach(function (s) {
      s.pz = s.z;
      s.z -= speed * dt;
      if (s.z <= 0.03) { s.z = 1; s.pz = 1; s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; }
    });
    this.speed = speed;
  }

  // how far a layer slides as the page scrolls: nearer layers slide more, which reads as depth
  shift(k) { return -Math.min(56, (this.scroll || 0) * k); }

  annulus(ox, oy, r1, r2, c1, c2) {
    var ctx = this.ctx, g = ctx.createLinearGradient(ox - r2, oy - r2, ox + r2, oy + r2);
    g.addColorStop(0, c1); g.addColorStop(1, c2);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ox, oy, r2, 0, 6.2832); ctx.arc(ox, oy, r1, 0, 6.2832, true); ctx.fill();
  }

  draw() {
    var ctx = this.ctx, w = this.w, h = this.h, tm = this.time, self = this;
    if (!ctx || !this.sky || !this.cur) return;
    var R = this.cur.R, ox = this.cur.x, oy0 = this.cur.y, st = this.settle || 0, wa = this.wheelAlpha;
    var showLabels = false;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#030409'; ctx.fillRect(0, 0, w, h);
    // stars: each sits at its own depth, so near ones drift further when you scroll
    var fov = Math.max(w, h) * 0.5, cx = w / 2, cy = h / 2, streak = this.speed > 0.2;
    this.stars.forEach(function (s) {
      var near = 1 - s.z, sd = self.shift(0.01 + 0.07 * near);
      var sx = cx + (s.x / s.z) * fov, sy = cy + (s.y / s.z) * fov + sd;
      if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) return;
      var a = s.b * (0.55 + 0.45 * near) * (0.8 + 0.2 * Math.sin(tm * s.tw + s.ph)) * (0.8 + 0.2 * st);
      ctx.globalAlpha = Math.min(1, a);
      if (streak) {
        var px = cx + (s.x / s.pz) * fov, py = cy + (s.y / s.pz) * fov + sd;
        ctx.strokeStyle = near > 0.7 ? '#FFE2A0' : '#F3EEE2'; ctx.lineWidth = 0.6 + near * 1.6;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
      } else {
        var size = 0.8 + near * 2.2;
        ctx.fillStyle = '#F3EEE2'; ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
        if (near > 0.7) { ctx.globalAlpha *= 0.3; ctx.beginPath(); ctx.arc(sx, sy, size * 2.6, 0, 6.2832); ctx.fill(); }
      }
    });
    var ringA = wa * (1 - 0.55 * st);
    // layer 0 (deepest): the dome of light
    var oy = oy0 + this.shift(0.012);
    var dome = ctx.createRadialGradient(ox - R * 0.35, oy - R * 0.4, R * 0.05, ox, oy, R * 1.18);
    dome.addColorStop(0, 'rgba(140,160,255,' + (0.14 * ringA) + ')'); dome.addColorStop(0.6, 'rgba(70,84,170,' + (0.05 * ringA) + ')'); dome.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = 1; ctx.fillStyle = dome; ctx.beginPath(); ctx.arc(ox, oy, R * 1.18, 0, 6.2832); ctx.fill();
    // layer 1: the rosette of trails
    this.dy = this.shift(0.022);
    ctx.save();
    ctx.globalAlpha = wa * (1 - 0.35 * st);
    ctx.translate(ox, oy0 + this.dy); ctx.rotate(this.spin); ctx.scale(R / this.R0, R / this.R0);
    ctx.drawImage(this.trail, -this.S / 2, -this.S / 2, this.S, this.S);
    ctx.restore();
    function rim(cyy, frac, wdt, hi, lo) {
      var g = ctx.createLinearGradient(ox - R * frac, cyy - R * frac, ox + R * frac, cyy + R * frac);
      g.addColorStop(0, hi); g.addColorStop(1, lo);
      ctx.strokeStyle = g; ctx.lineWidth = wdt;
      ctx.beginPath(); ctx.arc(ox, cyy, R * frac, 0, 6.2832); ctx.stroke();
    }
    // layer 2: the nakshatra band, a glassy annulus with its ticks
    this.dy = this.shift(0.035);
    var y2 = oy0 + this.dy;
    ctx.globalAlpha = ringA;
    this.annulus(ox, y2, R * 1.0, R * 1.08, 'rgba(255,236,205,0.10)', 'rgba(60,70,120,0.03)');
    rim(y2, 1.0, 1.8, 'rgba(255,236,205,0.85)', 'rgba(120,130,190,0.18)');
    ctx.lineWidth = 1;
    for (var q = 0; q < 108; q++) {
      var lon = q * 10 / 3, isNak = q % 4 === 0;
      var a1 = this.project(this.local(lon, 1, R)), b1 = this.project(this.local(lon, isNak ? 1.08 : 1.025, R));
      ctx.strokeStyle = isNak ? 'rgba(220,224,236,0.6)' : 'rgba(220,224,236,0.28)';
      ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(b1[0], b1[1]); ctx.stroke();
    }
    if (showLabels) {
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = '11px "Noto Sans Tamil", sans-serif'; ctx.fillStyle = 'rgba(220,224,236,0.6)';
      for (var k = 0; k < 27; k++) { var m = this.project(this.local((k + 0.5) * 40 / 3, 1.04, R)); ctx.fillText(NAK[k], m[0], m[1]); }
    }
    // layer 3: the rasi band in gold, a step nearer
    this.dy = this.shift(0.05);
    var y3 = oy0 + this.dy;
    this.annulus(ox, y3, R * 1.08, R * 1.15, 'rgba(242,193,78,0.12)', 'rgba(242,193,78,0.02)');
    rim(y3, 1.08, 1.1, 'rgba(255,236,205,0.6)', 'rgba(120,130,190,0.12)');
    rim(y3, 1.15, 2.4, 'rgba(242,193,78,0.6)', 'rgba(120,130,190,0.08)');
    ctx.lineWidth = 1;
    for (var r = 0; r < 12; r++) {
      var a2 = this.project(this.local(r * 30, 1.08, R)), b2 = this.project(this.local(r * 30, 1.15, R));
      ctx.strokeStyle = 'rgba(242,193,78,0.7)';
      ctx.beginPath(); ctx.moveTo(a2[0], a2[1]); ctx.lineTo(b2[0], b2[1]); ctx.stroke();
    }
    // lagna and earth sit with the trails
    this.dy = this.shift(0.022);
    var l0 = this.project(this.local(LAGNA, 0.08, R)), l1 = this.project(this.local(LAGNA, 1.15, R));
    ctx.setLineDash([3, 5]); ctx.strokeStyle = 'rgba(234,90,61,0.8)';
    ctx.beginPath(); ctx.moveTo(l0[0], l0[1]); ctx.lineTo(l1[0], l1[1]); ctx.stroke(); ctx.setLineDash([]);
    ctx.globalAlpha = wa; ctx.fillStyle = '#BFD3FF'; ctx.beginPath(); ctx.arc(ox, oy0 + this.dy, 2.5, 0, 6.2832); ctx.fill();
    // layer 4 (nearest): the grahas, each band at its own depth so outer planets float a touch nearer
    GRAHAS.forEach(function (g) {
      var mid = (g.band[0] + g.band[1]) / 2;
      self.dy = self.shift(0.04 + 0.04 * mid);
      var n = self.project(self.local(g.natalLon, mid, R));
      ctx.globalAlpha = 0.45 * wa; ctx.strokeStyle = g.color; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(n[0], n[1], 5, 0, 6.2832); ctx.stroke();
      var s = self.sky[g.key], fr = self.radius(g, s[1]), p = self.project(self.local(s[0], fr, R));
      var dim = (g.key === 'Moon' && !self.live) ? 0.4 : 1;
      var size = (g.key === 'Sun' ? 5.5 : g.key === 'Jupiter' || g.key === 'Saturn' ? 4 : 3.2) * (1 + 0.45 * st) * (0.8 + 0.3 * fr) * (R / self.R0 > 0.8 ? 1 : 0.85);
      var glow = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], size * (6 + 4 * st));
      glow.addColorStop(0, g.color); glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = (0.4 + 0.35 * st) * dim * wa; ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(p[0], p[1], size * (6 + 4 * st), 0, 6.2832); ctx.fill();
      var ball = ctx.createRadialGradient(p[0] - size * 0.4, p[1] - size * 0.4, size * 0.1, p[0], p[1], size * 1.25);
      ball.addColorStop(0, '#FFFFFF'); ball.addColorStop(0.35, g.color); ball.addColorStop(1, 'rgba(3,4,9,0.9)');
      ctx.globalAlpha = dim * wa; ctx.fillStyle = ball;
      ctx.beginPath(); ctx.arc(p[0], p[1], size * 1.25, 0, 6.2832); ctx.fill();
      if (showLabels) { ctx.font = '11px "Noto Sans Tamil", sans-serif'; ctx.fillStyle = g.color; ctx.fillText(g.ab, p[0] + 12, p[1] - 10); }
    });
    this.dy = 0;
    ctx.globalAlpha = 1; ctx.lineWidth = 1;
  }

}

export function startSky(canvas) {
  if (window.__sky) return window.__sky;
  var sky = new Sky(canvas);
  sky.init();
  window.__sky = sky;
  var place = function () { if (sky.w) sky.cur = sky.layoutFor(sky.page); };
  document.addEventListener('astro:page-load', place);
  window.addEventListener('load', place);
  return sky;
}
