// The jaathagam sky behind every page.
// The chakra is the birth chart from the jaathagam, built as an instrument: the chart is a
// disc held in three gimbal rings (nakshatra, rasi, and a meridian ring on the lagna axis),
// seen leaning back in 3-D. A fresh visit opens on the flat chart at the moment of birth; as
// the grahas travel by their real orbits to today, it leans back and the rings tumble in and
// lock. Threads between grahas are the drishti graph of the sky as it stands.
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
function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }

// 3x3 rotations, row-major. Screen y points down and +z points at the viewer, so a positive
// turn about x brings the lower half of the chart forward.
function mul(A, B) {
  var o = new Array(9);
  for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) o[r * 3 + c] = A[r * 3] * B[c] + A[r * 3 + 1] * B[3 + c] + A[r * 3 + 2] * B[6 + c];
  return o;
}
function rotX(a) { var c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, c, -s, 0, s, c]; }
function rotY(a) { var c = Math.cos(a), s = Math.sin(a); return [c, 0, s, 0, 1, 0, -s, 0, c]; }
function rotZ(a) { var c = Math.cos(a), s = Math.sin(a); return [c, -s, 0, s, c, 0, 0, 0, 1]; }
// a turn by `a` about a diameter of the chart lying at in-plane angle `phi`
function rotAxis(phi, a) { return mul(rotZ(phi), mul(rotX(a), rotZ(-phi))); }

// graha drishti: every graha looks at the 7th house from its own; Mars, Jupiter and Saturn
// have two more each. Rahu and Ketu are looked at but do not look.
var DRISHTI = { Sun: [7], Moon: [7], Mercury: [7], Venus: [7], Mars: [4, 7, 8], Jupiter: [5, 7, 9], Saturn: [3, 7, 10] };
var TAU = Math.PI * 2;

class Sky {
  constructor(canvas) {
    this.c0 = canvas;
  }

  init() {
    this.page = 'home';
    this.journeySec = 7;
    this.settleSec = 1.8;
    this.tries = 0;
    this.flashes = [];
    this.links = {};
    this.tx = 0; this.ty = 0; this.px = 0; this.py = 0;
    this.setup();
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.retry) clearTimeout(this.retry);
    if (this.ro2) this.ro2.disconnect();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointer);
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
    // the instrument leans a few degrees toward a mouse pointer
    this.onPointer = (e) => {
      if (e.pointerType !== 'mouse' || !this.w) return;
      this.tx = e.clientX / this.w * 2 - 1; this.ty = e.clientY / this.h * 2 - 1;
    };
    if (!this.reduced) window.addEventListener('pointermove', this.onPointer, { passive: true });
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

  // how far the chart leans back at rest: less on phones, where it frames the round photo
  pose() { return this.w <= 960 ? 34 : 52; }

  // the chakra sits in the centre of every page, as large as fits with its whole rim on screen
  layoutFor(page) {
    var w = this.w, h = this.h;
    // phones: a smaller chakra centred on the page's anchor (the round photo on the home page),
    // so on landing it sits around you; it stays fixed there as the content scrolls over it
    if (w <= 960) {
      var Rm = Math.min(w * 0.40, h * 0.24);
      var anchor = document.getElementById('sky-anchor');
      if (anchor) {
        var r = anchor.getBoundingClientRect();
        var y = r.top + (window.scrollY || 0) + r.height / 2;
        if (r.height > 0) return { x: w / 2, y: y, R: Rm };
      }
      return { x: w / 2, y: h * 0.42, R: Rm };
    }
    // leaning back, the chart is wider than it is tall, so it can be larger than a flat wheel
    var R = Math.min((w / 2 - 24) / 1.3, ((h - 120) / 2 - 8) / 0.84);
    return { x: w / 2, y: h / 2 + 20, R: Math.max(80, R) };
  }

  resize() {
    var w = window.innerWidth, h = window.innerHeight;
    if (!w || !h) return;
    var dpr = Math.min(1.5, window.devicePixelRatio || 1);
    this.w = w; this.h = h;
    this.c.width = Math.round(w * dpr); this.c.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cur = this.layoutFor(this.page);
    // the trail is drawn once at a reference radius and scaled with the chakra
    this.R0 = Math.min(480, Math.max(Math.min(w, h) * 0.36, this.cur.R));
    this.S = Math.ceil(this.R0 * 2.5);
    this.trail.width = Math.round(this.S * dpr); this.trail.height = Math.round(this.S * dpr);
    this.tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // a 3-D star field; each star has its own depth
    var seed = 5, rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    this.stars = [];
    var n = Math.round(Math.min(1400, w * h / 1000));
    for (var i = 0; i < n; i++) this.stars.push({ x: rnd() * 2 - 1, y: rnd() * 2 - 1, z: 0.05 + rnd() * 0.95, b: 0.4 + rnd() * 0.6, tw: 0.5 + rnd() * 2, ph: rnd() * 6.28 });
    var upTo = this.trailDay || 0;
    this.trailDay = 0;
    if (upTo > 0) this.extendTrail(upTo);
  }

  // a point on the chart's own plane: lagna on the left, longitudes running anticlockwise
  local(lon, frac, R) {
    var phi = Math.PI + rad(lon - LAGNA), r = R * frac;
    return [r * Math.cos(phi), -r * Math.sin(phi)];
  }

  // chart-plane point (plus height off the plane) -> [screen x, screen y, depth toward the viewer]
  proj(M, p, z) {
    z = z || 0;
    return [this.ox + M[0] * p[0] + M[1] * p[1] + M[2] * z, this.oy + M[3] * p[0] + M[4] * p[1] + M[5] * z, M[6] * p[0] + M[7] * p[1] + M[8] * z];
  }

  // 0 at the far rim, 1 at the near rim
  near(z) { return clamp01(0.5 + 0.5 * z / (this.cur.R * 0.95)); }

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

  // which graha looks at which, in the sky as it stands; each link fades in and out on its own
  updateLinks(dt) {
    var sky = this.sky, want = {}, self = this;
    var rasi = function (k) { return Math.floor(sky[k][0] / 30); };
    GRAHAS.forEach(function (a) {
      var looks = DRISHTI[a.key];
      if (!looks || (a.key === 'Moon' && !self.live)) return;
      GRAHAS.forEach(function (b) {
        if (a === b || (b.key === 'Moon' && !self.live)) return;
        var house = ((rasi(b.key) - rasi(a.key) + 12) % 12) + 1;
        if (looks.indexOf(house) >= 0) want[a.key + '>' + b.key] = 1;
      });
    });
    var k, rate = dt > 0 ? Math.min(1, dt * 3) : 1;
    for (k in want) if (!(k in this.links)) this.links[k] = 0;
    for (k in this.links) {
      this.links[k] += ((want[k] ? 1 : 0) - this.links[k]) * rate;
      if (!want[k] && this.links[k] < 0.01) delete this.links[k];
    }
  }

  tick(dt) {
    // the page can start with a zero-size viewport (a hidden tab); size the sky once it has one
    if (!this.stars) { this.resize(); if (!this.stars) return; }
    this.time += dt;
    var sy = window.scrollY || window.pageYOffset || 0;
    this.scroll = (this.scroll || 0) + (sy - (this.scroll || 0)) * Math.min(1, dt * 8);
    this.px += (this.tx - this.px) * Math.min(1, dt * 2.5);
    this.py += (this.ty - this.py) * Math.min(1, dt * 2.5);
    this.elapsed += dt;
    var nowJd = jdNow(), t = Math.min(1, this.elapsed / this.journeySec);
    this.live = t >= 1;
    var e = ease(t), w = 1 - e;
    this.jd = this.live ? nowJd : BIRTH_JD + e * (nowJd - BIRTH_JD);
    this.sky = skyAt(this.jd);
    this.extendTrail(Math.floor(this.jd - BIRTH_JD));
    this.updateLinks(dt);
    // a page change: the camera lifts toward face-on and drops back while the gimbal rings
    // each go once round their own axis, coming to rest exactly where they were
    var pulse = 0;
    if (this.pulseT != null) {
      this.pulseT += dt;
      var pt = Math.min(1, this.pulseT / 1.1);
      pulse = Math.sin(Math.PI * pt);
      pulse *= pulse;
      if (pt >= 1) this.pulseT = null;
    }
    var turn = 0;
    if (this.ringT != null) {
      this.ringT += dt;
      var rt = Math.min(1, this.ringT / 1.5);
      turn = rt < 0.5 ? 4 * rt * rt * rt : 1 - Math.pow(-2 * rt + 2, 3) / 2;
      if (rt >= 1) { this.ringT = null; turn = 0; }
    }
    // the visit opens on the chart as the jaathagam draws it: flat, face-on, at the moment of
    // birth. As the grahas travel to today it turns once and leans back into an instrument,
    // and the rings tumble in from wherever they were and lock.
    var tilt = rad((this.pose() + Math.min(14, this.scroll * 0.02)) * e - 4 * this.py - 12 * pulse);
    var yaw = rad(6 * this.px + 2.5 * Math.sin(this.time * 0.13) * e);
    var roll = rad(-11 * e + 1.2 * Math.sin(this.time * 0.09) * e);
    this.M = mul(rotZ(roll), mul(rotY(yaw), mul(rotX(tilt), rotZ(Math.PI * 1.5 * w * w))));
    var wind = Math.pow(w, 1.5), prec = this.time * 0.07;
    // nakshatra ring, rasi ring, and the meridian ring that swings about the lagna axis:
    // at rest each sits a few degrees off the chart, and that lean slowly precesses
    this.MA = mul(this.M, mul(rotAxis(prec, rad(7) * e), rotAxis(rad(20), TAU * (1.1 * wind + turn))));
    this.MB = mul(this.M, mul(rotAxis(prec + 2.1, rad(-9) * e), rotAxis(rad(110), -TAU * (0.8 * wind + turn))));
    this.MC = mul(this.M, rotX(rad(64) + rad(5) * Math.sin(prec * 1.7) + TAU * (0.6 * wind + turn)));
    // after it lands: planets brighten, rings step back
    this.settle = smooth((this.elapsed - this.journeySec) / this.settleSec);
    this.wheelAlpha = smooth(this.elapsed / 0.9);
    this.grow = 0.84 + 0.16 * (1 - Math.pow(1 - Math.min(1, this.elapsed / 1.8), 3));
    var speed = 0.02 + 0.16 * pulse;
    this.stars.forEach(function (s) {
      s.pz = s.z;
      s.z -= speed * dt;
      if (s.z <= 0.03) { s.z = 1; s.pz = 1; s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; }
    });
    this.speed = speed;
  }

  // how far a layer slides as the page scrolls: nearer layers slide more, which reads as depth
  shift(k) { return -Math.min(56, (this.scroll || 0) * k); }

  // run `fn` with the canvas mapped onto a ring's (or the chart's) own plane
  onPlane(M, fn) {
    var ctx = this.ctx;
    ctx.save();
    ctx.transform(M[0], M[3], M[1], M[4], this.ox, this.oy);
    fn(ctx);
    ctx.restore();
  }

  // one circle of a ring, drawn in short arcs so the near side is bright and heavy and the
  // far side thin and faint; `front` picks which half to draw
  rim(M, frac, width, color, alpha, front) {
    var ctx = this.ctx, R = this.R, N = 120, step = 3;
    ctx.strokeStyle = color;
    for (var i = 0; i < N; i += step) {
      var am = (i + step / 2) / N * TAU;
      var z = (M[6] * Math.cos(am) + M[7] * Math.sin(am)) * R * frac;
      if ((z >= 0) !== front) continue;
      var nr = this.near(z);
      ctx.globalAlpha = alpha * (0.22 + 0.78 * nr); ctx.lineWidth = width * (0.5 + 0.8 * nr);
      ctx.beginPath();
      for (var j = 0; j <= step; j++) {
        var a = (i + j) / N * TAU, x = R * frac * Math.cos(a), y = R * frac * Math.sin(a);
        var X = this.ox + M[0] * x + M[1] * y, Y = this.oy + M[3] * x + M[4] * y;
        if (j === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      }
      ctx.stroke();
    }
  }

  ticks(M, count, r1, r2of, color, alphaOf, front) {
    var ctx = this.ctx, R = this.R;
    ctx.strokeStyle = color; ctx.lineWidth = 1;
    for (var q = 0; q < count; q++) {
      var lon = q * 360 / count;
      var a = this.proj(M, this.local(lon, r1, R)), b = this.proj(M, this.local(lon, r2of(q), R));
      if ((a[2] >= 0) !== front) continue;
      ctx.globalAlpha = alphaOf(q) * (0.25 + 0.75 * this.near(a[2]));
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    }
  }

  // the three gimbal rings; called once for their far halves and once for their near halves
  rings(front, ringA) {
    var isNak = function (q) { return q % 4 === 0; };
    this.rim(this.MC, this.w <= 960 ? 1.21 : 1.27, 1.1, 'rgb(160,176,232)', 0.55 * ringA, front);
    this.rim(this.MA, 1.0, 1.8, 'rgb(255,236,205)', 0.9 * ringA, front);
    this.rim(this.MA, 1.075, 0.9, 'rgb(255,236,205)', 0.45 * ringA, front);
    this.ticks(this.MA, 108, 1.0, function (q) { return isNak(q) ? 1.075 : 1.025; }, 'rgb(220,224,236)', function (q) { return (isNak(q) ? 0.7 : 0.32) * ringA; }, front);
    this.rim(this.MB, 1.105, 1.1, 'rgb(255,236,205)', 0.6 * ringA, front);
    this.rim(this.MB, 1.175, 2.4, 'rgb(242,193,78)', 0.75 * ringA, front);
    this.ticks(this.MB, 12, 1.105, function () { return 1.175; }, 'rgb(242,193,78)', function () { return 0.8 * ringA; }, front);
  }

  draw() {
    var ctx = this.ctx, w = this.w, h = this.h, tm = this.time, self = this;
    if (!ctx || !this.sky || !this.cur || !this.M) return;
    var R = this.cur.R * this.grow, st = this.settle || 0, wa = this.wheelAlpha, M = this.M;
    this.R = R; this.ox = this.cur.x; this.oy = this.cur.y + this.shift(0.03);
    var ox = this.ox, oy = this.oy;
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
    var ringA = wa * (1 - 0.25 * st);
    // the pool of light the chart floats on, lying in its plane
    this.onPlane(M, function (c) {
      var dome = c.createRadialGradient(-R * 0.3, -R * 0.35, R * 0.05, 0, 0, R * 1.2);
      dome.addColorStop(0, 'rgba(140,160,255,' + (0.15 * ringA) + ')'); dome.addColorStop(0.6, 'rgba(70,84,170,' + (0.05 * ringA) + ')'); dome.addColorStop(1, 'rgba(0,0,0,0)');
      c.globalAlpha = 1; c.fillStyle = dome; c.beginPath(); c.arc(0, 0, R * 1.2, 0, 6.2832); c.fill();
    });
    // the glassy faces of the two bands, each in its own plane
    var band = function (Mr, r1, r2, rgb, a) {
      self.onPlane(Mr, function (c) {
        c.globalAlpha = ringA; c.fillStyle = 'rgba(' + rgb + ',' + a + ')';
        c.beginPath(); c.arc(0, 0, R * r2, 0, 6.2832); c.arc(0, 0, R * r1, 0, 6.2832, true); c.fill();
      });
    };
    band(this.MA, 1.0, 1.075, '255,236,205', 0.06);
    band(this.MB, 1.105, 1.175, '242,193,78', 0.07);
    // far halves of the rings go behind everything on the chart
    this.rings(false, ringA);
    // the rosette of trails, lying on the chart
    this.onPlane(M, function (c) {
      c.globalAlpha = wa * (1 - 0.35 * st);
      c.scale(R / self.R0, R / self.R0);
      c.drawImage(self.trail, -self.S / 2, -self.S / 2, self.S, self.S);
    });
    // lagna line, the axle through the chart, and earth at the centre
    var l0 = this.proj(M, this.local(LAGNA, 0.08, R)), l1 = this.proj(M, this.local(LAGNA, 1.0, R));
    ctx.globalAlpha = ringA; ctx.lineWidth = 1;
    ctx.setLineDash([3, 5]); ctx.strokeStyle = 'rgba(234,90,61,0.8)';
    ctx.beginPath(); ctx.moveTo(l0[0], l0[1]); ctx.lineTo(l1[0], l1[1]); ctx.stroke(); ctx.setLineDash([]);
    var ax0 = this.proj(M, [0, 0], -R * 0.2), ax1 = this.proj(M, [0, 0], R * 0.2);
    ctx.globalAlpha = 0.5 * ringA; ctx.strokeStyle = 'rgb(160,176,232)';
    ctx.beginPath(); ctx.moveTo(ax0[0], ax0[1]); ctx.lineTo(ax1[0], ax1[1]); ctx.stroke();
    ctx.globalAlpha = wa; ctx.fillStyle = '#BFD3FF'; ctx.beginPath(); ctx.arc(ox, oy, 2.5, 0, 6.2832); ctx.fill();
    // where each graha stood at birth: a small mark lying flat on the chart
    this.onPlane(M, function (c) {
      c.lineWidth = 1;
      GRAHAS.forEach(function (g) {
        var n = self.local(g.natalLon, (g.band[0] + g.band[1]) / 2, R);
        c.globalAlpha = 0.5 * wa; c.strokeStyle = g.color;
        c.beginPath(); c.arc(n[0], n[1], 5.5, 0, 6.2832); c.stroke();
      });
    });
    // where each graha is now
    var at = {}, order = [];
    GRAHAS.forEach(function (g) {
      var s = self.sky[g.key], fr = self.radius(g, s[1]);
      at[g.key] = { g: g, fr: fr, p: self.proj(M, self.local(s[0], fr, R)) };
      order.push(at[g.key]);
    });
    // the drishti graph: a thread from each graha to the ones it looks at, with a pulse
    // running along it in the direction of the gaze
    var k;
    for (k in this.links) {
      var ends = k.split('>'), A = at[ends[0]], B = at[ends[1]], la = this.links[k] * wa * (0.3 + 0.7 * st);
      if (la < 0.01) continue;
      var grad = ctx.createLinearGradient(A.p[0], A.p[1], B.p[0], B.p[1]);
      grad.addColorStop(0, A.g.color); grad.addColorStop(1, B.g.color);
      ctx.globalAlpha = 0.3 * la; ctx.strokeStyle = grad; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.moveTo(A.p[0], A.p[1]); ctx.lineTo(B.p[0], B.p[1]); ctx.stroke();
      if (!this.reduced) {
        var u = (tm * 0.32 + (k.charCodeAt(0) * 7 + k.charCodeAt(k.length - 2) * 13) % 10 / 10) % 1;
        ctx.globalAlpha = 0.9 * la * Math.sin(Math.PI * u); ctx.fillStyle = A.g.color;
        ctx.beginPath(); ctx.arc(A.p[0] + (B.p[0] - A.p[0]) * u, A.p[1] + (B.p[1] - A.p[1]) * u, 1.5, 0, 6.2832); ctx.fill();
      }
    }
    // the grahas, far ones first; nearer ones are drawn larger
    order.sort(function (a, b) { return a.p[2] - b.p[2]; });
    order.forEach(function (o) {
      var g = o.g, p = o.p, nr = self.near(p[2]);
      var dim = (g.key === 'Moon' && !self.live) ? 0.4 : 1;
      var size = (g.key === 'Sun' ? 5.5 : g.key === 'Jupiter' || g.key === 'Saturn' ? 4 : 3.2) * (1 + 0.45 * st) * (0.8 + 0.3 * o.fr) * (0.72 + 0.56 * nr) * (R > 240 ? 1 : 0.85);
      var glow = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], size * (6 + 4 * st));
      glow.addColorStop(0, g.color); glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = (0.4 + 0.35 * st) * dim * wa; ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(p[0], p[1], size * (6 + 4 * st), 0, 6.2832); ctx.fill();
      var ball = ctx.createRadialGradient(p[0] - size * 0.4, p[1] - size * 0.4, size * 0.1, p[0], p[1], size * 1.25);
      ball.addColorStop(0, '#FFFFFF'); ball.addColorStop(0.35, g.color); ball.addColorStop(1, 'rgba(3,4,9,0.9)');
      ctx.globalAlpha = dim * wa; ctx.fillStyle = ball;
      ctx.beginPath(); ctx.arc(p[0], p[1], size * 1.25, 0, 6.2832); ctx.fill();
    });
    // near halves of the rings pass in front
    this.rings(true, ringA);
    ctx.globalAlpha = 1; ctx.lineWidth = 1;
  }

}

export function startSky(canvas) {
  if (window.__sky) return window.__sky;
  var sky = new Sky(canvas);
  sky.init();
  window.__sky = sky;
  var place = function () { if (sky.w) sky.cur = sky.layoutFor(sky.page); };
  document.addEventListener('astro:before-preparation', function () { if (!sky.reduced) { sky.pulseT = 0; sky.ringT = 0; } });
  document.addEventListener('astro:page-load', place);
  window.addEventListener('load', place);
  return sky;
}
