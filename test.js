// Smoke test: mirrors the calculation logic in index.html and verifies
// it produces sensible, finite results against known references.

const Astronomy = require('astronomy-engine');

const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];

function getEclipticLongitude(bodyName, date) {
  if (bodyName === 'Rahu' || bodyName === 'Ketu') {
    return getMeanLunarNode(date, bodyName === 'Ketu');
  }
  const time = Astronomy.MakeTime(date);
  let vec;
  if (bodyName === 'Moon') {
    vec = Astronomy.GeoMoon(time);
  } else {
    vec = Astronomy.GeoVector(bodyName, time, true);
  }
  const ecl = Astronomy.Ecliptic(vec);
  return ((ecl.elon % 360) + 360) % 360;
}

function getMeanLunarNode(date, ketu) {
  const J2000ms = Date.UTC(2000, 0, 1, 12, 0, 0);
  const T = (date.getTime() - J2000ms) / (36525 * 86400 * 1000);
  let lon = 125.04452 - 1934.13626 * T;
  lon = ((lon % 360) + 360) % 360;
  if (ketu) lon = (lon + 180) % 360;
  return lon;
}

function longitudeToSign(lon) {
  return Math.floor(((lon % 360) + 360) % 360 / 30);
}

function getAyanamsa(date) {
  const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
  const yearsSince = (date.getTime() - J2000) / (365.25 * 24 * 3600 * 1000);
  return 23.85 + 0.013979 * yearsSince;
}

function getAscendant(date, lat, lonEast) {
  const time = Astronomy.MakeTime(date);
  const gstHours = Astronomy.SiderealTime(time);
  const lstDeg = ((gstHours * 15 + lonEast) % 360 + 360) % 360;
  const epsRad = 23.4367 * Math.PI / 180;
  const phiRad = lat * Math.PI / 180;
  const ramcRad = lstDeg * Math.PI / 180;
  const y = Math.cos(ramcRad);
  const x = -(Math.sin(ramcRad) * Math.cos(epsRad) + Math.tan(phiRad) * Math.sin(epsRad));
  let asc = Math.atan2(y, x) * 180 / Math.PI;
  if (asc < 0) asc += 360;
  const diff = ((asc - lstDeg) % 360 + 360) % 360;
  if (diff > 180) asc = (asc + 180) % 360;
  return asc;
}

let failed = 0;
function assert(cond, msg) {
  if (cond) console.log('  ✓ ' + msg);
  else { console.log('  ✗ ' + msg); failed++; }
}

function approxEq(a, b, tol = 2) {
  const d = Math.abs(((a - b + 540) % 360) - 180);
  return d < tol;
}

// ===== Test 1: J2000 reference positions =====
console.log('\n— J2000 (2000-01-01 12:00 UTC) tropical positions —');
const j2000 = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
const refs = {
  Sun:     280.4,  // Capricorn
  Mercury: 271.4,
  Venus:   240.9,
  Mars:    327.5,
  Jupiter: 25.4,   // Aries
  Saturn:  40.4,   // Taurus
};
for (const [body, expected] of Object.entries(refs)) {
  const got = getEclipticLongitude(body, j2000);
  assert(approxEq(got, expected, 2),
    `${body} ≈ ${expected.toFixed(1)}° (got ${got.toFixed(2)}°, sign: ${SIGNS[longitudeToSign(got)]})`);
}
const moon = getEclipticLongitude('Moon', j2000);
assert(moon >= 0 && moon < 360, `Moon longitude is in [0,360): ${moon.toFixed(2)}°`);

// ===== Test 2: Sun returns to ~same longitude after 1 year =====
console.log('\n— Sun returns yearly —');
const oneYearLater = new Date(j2000.getTime() + 365.25 * 24 * 3600 * 1000);
const sunNow = getEclipticLongitude('Sun', j2000);
const sunYearLater = getEclipticLongitude('Sun', oneYearLater);
assert(approxEq(sunNow, sunYearLater, 1.5),
  `Sun differs by < 1.5° after one year: ${sunNow.toFixed(2)}° → ${sunYearLater.toFixed(2)}°`);

// ===== Test 3: All planet longitudes are finite and in range =====
console.log('\n— Sanity: bounded longitudes across many dates —');
const bodies = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
let badCount = 0;
for (let yr = 1950; yr <= 2050; yr += 5) {
  const d = new Date(Date.UTC(yr, 5, 15, 12, 0, 0));
  for (const b of bodies) {
    const lon = getEclipticLongitude(b, d);
    if (!Number.isFinite(lon) || lon < 0 || lon >= 360) {
      console.log(`    ! ${b} on ${yr}: ${lon}`);
      badCount++;
    }
  }
}
assert(badCount === 0, `All ${bodies.length * 21} (planet × year) values bounded and finite`);

// ===== Test 4: Ascendant is finite and bounded =====
console.log('\n— Ascendant calculation —');
const asc = getAscendant(j2000, 28.6139, 77.2090);  // Delhi
assert(Number.isFinite(asc) && asc >= 0 && asc < 360,
  `Ascendant for Delhi at J2000: ${asc.toFixed(2)}° (${SIGNS[longitudeToSign(asc)]})`);

// Test that the ascendant changes through a 24-hour day (covers full 360°)
const ascendants = [];
for (let h = 0; h < 24; h++) {
  const d = new Date(Date.UTC(2000, 0, 1, h, 0, 0));
  ascendants.push(getAscendant(d, 28.6139, 77.2090));
}
const ascSpread = Math.max(...ascendants) - Math.min(...ascendants);
assert(ascSpread > 300, `Ascendant covers most of the zodiac in 24h (spread: ${ascSpread.toFixed(0)}°)`);

// ===== Test 5: Ayanamsa drift is reasonable =====
console.log('\n— Lahiri ayanamsa drift —');
const ay2000 = getAyanamsa(j2000);
const ay2026 = getAyanamsa(new Date(Date.UTC(2026, 0, 1, 12, 0, 0)));
assert(Math.abs(ay2000 - 23.85) < 0.01, `Lahiri at J2000 ≈ 23.85° (got ${ay2000.toFixed(3)}°)`);
assert(ay2026 > ay2000 && ay2026 - ay2000 < 1, `Lahiri drifts forward modestly: ${ay2000.toFixed(3)}° → ${ay2026.toFixed(3)}°`);

// ===== Test 6a: Lunar nodes (Rahu / Ketu) =====
console.log('\n— Lunar nodes —');
const rahu = getEclipticLongitude('Rahu', j2000);
const ketu = getEclipticLongitude('Ketu', j2000);
assert(Math.abs(rahu - 125.0) < 0.5,
  `Rahu mean node at J2000 ≈ 125° (got ${rahu.toFixed(2)}°)`);
assert(Math.abs(((ketu - rahu - 180 + 540) % 360) - 180) < 0.001,
  `Ketu is exactly 180° from Rahu (Δ = ${(((ketu - rahu) + 360) % 360).toFixed(2)}°)`);
// Node moves backwards (retrograde) at ~19.3°/year
const rahuLater = getEclipticLongitude('Rahu', new Date(j2000.getTime() + 365.25 * 24 * 3600 * 1000));
const drift = ((rahu - rahuLater + 540) % 360) - 180;
assert(drift > 18 && drift < 21,
  `Rahu drifts retrograde ~19.3° per year (got ${drift.toFixed(2)}°)`);

// ===== Test 6: Sidereal Sun should differ from tropical by ~ayanamsa =====
console.log('\n— Sidereal vs tropical —');
const trop = getEclipticLongitude('Sun', j2000);
const sid  = ((trop - ay2000) % 360 + 360) % 360;
const dist = ((trop - sid + 540) % 360) - 180;
assert(Math.abs(Math.abs(dist) - ay2000) < 0.01,
  `Sidereal Sun = tropical Sun − ayanamsa (diff ${Math.abs(dist).toFixed(3)}° vs expected ${ay2000.toFixed(3)}°)`);

// ===== Test 7: Nakshatra + sub-lord (Vimshottari) =====
console.log('\n— Nakshatras & sub-lords —');
const NAKS = ['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha',
  'Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha',
  'Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishta','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];
const VL = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
const VY = [7, 20, 6, 10, 7, 18, 16, 19, 17];

function getNakshatra(longitude) {
  const lon = ((longitude % 360) + 360) % 360;
  const idx = Math.floor(lon * 27 / 360);
  const intoArcmin = lon * 60 - idx * 800;
  return { name: NAKS[idx], index: idx, lord: VL[idx % 9], intoArcmin, pada: Math.floor(intoArcmin / 200) + 1 };
}
function getSubLord(longitude) {
  const nak = getNakshatra(longitude);
  const startIdx = nak.index % 9;
  let acc = 0;
  for (let i = 0; i < 9; i++) {
    const lordIdx = (startIdx + i) % 9;
    const span = 800 * VY[lordIdx] / 120;
    if (nak.intoArcmin < acc + span) return VL[lordIdx];
    acc += span;
  }
  return VL[startIdx];
}

// 0° = Ashwini (Ketu's nakshatra)
const ash = getNakshatra(0);
assert(ash.name === 'Ashwini' && ash.lord === 'Ketu' && ash.pada === 1,
  `0° → Ashwini · Ketu · pada 1 (got ${ash.name} · ${ash.lord} · pada ${ash.pada})`);

// 13°20' = boundary into Bharani (Venus)
const bhar = getNakshatra(13.34);
assert(bhar.name === 'Bharani' && bhar.lord === 'Venus',
  `13°20' → Bharani · Venus (got ${bhar.name} · ${bhar.lord})`);

// First fraction of any nakshatra is sub-lord = nakshatra's own lord
assert(getSubLord(0.05) === 'Ketu',
  `Sub-lord at 0°03' = Ketu (got ${getSubLord(0.05)})`);

// Sub-lord cycles through all 9 lords across full 360°
const subSet = new Set();
for (let lon = 0; lon < 360; lon += 1) subSet.add(getSubLord(lon));
assert(subSet.size === 9, `Sub-lord covers all 9 Vimshottari lords (got ${subSet.size})`);

// ===== Test 8: Navamsa (D9) =====
console.log('\n— Navamsa D9 —');
function navamsaSignOf(longitude) {
  const lon = ((longitude % 360) + 360) % 360;
  const signIdx = Math.floor(lon / 30);
  const degInSign = lon - signIdx * 30;
  const navIdx = Math.floor(degInSign * 3 / 10);
  let startSign;
  if (signIdx % 3 === 0) startSign = signIdx;
  else if (signIdx % 3 === 1) startSign = (signIdx + 8) % 12;
  else startSign = (signIdx + 4) % 12;
  return (startSign + navIdx) % 12;
}
// Movable: Aries 0° → starts from Aries → navamsa Aries
assert(navamsaSignOf(0) === 0, `Aries 0° → D9 Aries (got idx ${navamsaSignOf(0)})`);
// Movable: Aries 26°40' (8th navamsa) → 8th from Aries = Sagittarius
assert(navamsaSignOf(26.7) === 8, `Aries 26°40' → D9 Sagittarius (got idx ${navamsaSignOf(26.7)})`);
// Fixed: Taurus 0° (idx 1) → starts from 9th sign = Capricorn (idx 9)
assert(navamsaSignOf(30) === 9, `Taurus 0° → D9 Capricorn (got idx ${navamsaSignOf(30)})`);
// Dual: Gemini 0° (idx 2) → starts from 5th sign = Libra (idx 6)
assert(navamsaSignOf(60) === 6, `Gemini 0° → D9 Libra (got idx ${navamsaSignOf(60)})`);

// ===== Result =====
console.log('\n' + (failed === 0 ? '✅ All tests passed.' : `❌ ${failed} test(s) failed.`));
process.exit(failed === 0 ? 0 : 1);
