/* ============ Data (fiktif) ============ */
const DISTRICTS = [
  { id:'terminal', name:'Terminal Barat',  x:300, y:95,  share:13, crimes:[['Pencurian kendaraan',44],['Penjambretan',31],['Penipuan',25]], trend:[9,10,11,12,12,13] },
  { id:'stasiun',  name:'Stasiun Pusat',   x:407, y:95,  share:12, crimes:[['Penjambretan',40],['Penipuan',34],['Judi daring',26]],        trend:[11,11,12,13,12,12] },
  { id:'bandara',  name:'Bandara Utara',   x:514, y:95,  share:10, crimes:[['Penyelundupan',46],['Pemalsuan dokumen',30],['Narkotika',24]], trend:[8,9,9,10,10,10] },
  { id:'pasar',    name:'Pasar Baru',      x:246, y:188, share:14, crimes:[['Pencurian',41],['Pemalsuan uang',27],['Penipuan',32]],       trend:[12,12,13,15,14,14] },
  { id:'kota',     name:'Kota Tua',        x:353, y:188, share:9,  crimes:[['Penipuan daring',48],['Pencurian',27],['Judi daring',25]],    trend:[7,8,8,9,9,9] },
  { id:'taman',    name:'Taman Raya',      x:460, y:188, share:5,  crimes:[['Pencurian',52],['Vandalisme',28],['Penjambretan',20]],       trend:[6,5,6,5,5,5] },
  { id:'kampus',   name:'Kampus Timur',    x:567, y:188, share:7,  crimes:[['Penipuan daring',45],['Pencurian',35],['Narkotika',20]],     trend:[6,6,7,7,8,7] },
  { id:'pelabuhan',name:'Pelabuhan Lama',  x:300, y:281, share:16, crimes:[['Penyelundupan',38],['Narkotika',34],['Pencurian',28]],       trend:[12,13,14,15,16,16] },
  { id:'industri', name:'Industri Selatan',x:407, y:281, share:8,  crimes:[['Penyelundupan',36],['Pencurian',40],['Pemalsuan dokumen',24]], trend:[8,8,7,8,8,8] },
  { id:'perumahan',name:'Perumahan Mega',  x:514, y:281, share:6,  crimes:[['Pencurian',50],['Narkotika',26],['Penipuan',24]],            trend:[6,7,6,6,6,6] }
];
const D = Object.fromEntries(DISTRICTS.map(d => [d.id, d]));
const TOTAL_CASES = 1240;
const LINKS = [['terminal','stasiun'],['stasiun','bandara'],['terminal','pasar'],['stasiun','kota'],['kota','pasar'],['kota','taman'],
  ['taman','kampus'],['pasar','pelabuhan'],['pelabuhan','industri'],['industri','perumahan'],['bandara','kampus'],['kampus','perumahan'],['kota','industri']];
const NB = {}; LINKS.forEach(([a,b]) => { (NB[a] ??= []).push(b); (NB[b] ??= []).push(a); });

const SYN = [
  { id:'narkotika', name:'Jaringan narkotika',     pct:31, n:66, hot:['pelabuhan','bandara','perumahan'], modus:'Peredaran lewat kurir dan paket kiriman antarkota.', trend:'naik 12%' },
  { id:'curanmor',  name:'Pencurian kendaraan',    pct:22, n:47, hot:['terminal','pasar','industri'],     modus:'Kendaraan dicuri berkelompok lalu dijual sebagai suku cadang.', trend:'turun 5%' },
  { id:'penipuan',  name:'Penipuan daring',        pct:19, n:41, hot:['kota','kampus','stasiun'],         modus:'Tawaran investasi dan hadiah palsu lewat pesan singkat.', trend:'naik 18%' },
  { id:'judi',      name:'Perjudian daring',       pct:12, n:26, hot:['stasiun','kota'],                  modus:'Situs taruhan yang berpindah alamat dan memakai rekening pinjaman.', trend:'turun 2%' },
  { id:'selundup',  name:'Penyelundupan barang',   pct:9,  n:19, hot:['pelabuhan','bandara','industri'],  modus:'Barang bebas bea disamarkan di antara muatan resmi.', trend:'naik 3%' },
  { id:'palsu',     name:'Pemalsuan uang dan dokumen', pct:7, n:15, hot:['pasar','bandara'],            modus:'Percetakan gelap yang menyuplai pasar tradisional.', trend:'turun 9%' }
];
const S = Object.fromEntries(SYN.map(s => [s.id, s]));

const WANTED = [
  { id:'w1', alias:'Bayang',       name:'Raka Wirasena',   age:41, charge:'Pimpinan jaringan narkotika lintas pulau',  d:'pelabuhan', syn:'narkotika', bounty:750000000, danger:5, trait:'Tato naga di lengan kiri, sering memakai topi hitam.' },
  { id:'w2', alias:'Si Lintah',    name:'Darmawan Kusuma', age:47, charge:'Otak penipuan investasi dengan 3.200 korban', d:'kota',     syn:'penipuan',  bounty:500000000, danger:2, trait:'Berkacamata bulat, bicara sangat meyakinkan.' },
  { id:'w3', alias:'Kelabang',     name:'Hendra Pratama',  age:36, charge:'Pencurian kendaraan terorganisir',          d:'terminal',  syn:'curanmor',  bounty:350000000, danger:3, trait:'Bekas luka di dagu, hafal rute jalan tikus.' },
  { id:'w4', alias:'Gagak',        name:'Bimo Saputra',    age:39, charge:'Penyelundupan barang ilegal lewat pelabuhan', d:'industri', syn:'selundup',  bounty:300000000, danger:4, trait:'Badan tegap, kerap terlihat di gudang kosong.' },
  { id:'w5', alias:'Merpati',      name:'Sari Anggraini',  age:33, charge:'Bandar perjudian daring',                   d:'stasiun',   syn:'judi',      bounty:250000000, danger:2, trait:'Sering berganti gaya rambut dan nomor telepon.' },
  { id:'w6', alias:'Tukang Cetak', name:'Wahyu Hidayat',   age:52, charge:'Pemalsu uang dan dokumen',                  d:'pasar',     syn:'palsu',     bounty:150000000, danger:2, trait:'Jari tangan kanan bernoda tinta, bicara pelan.' }
];
const W = Object.fromEntries(WANTED.map(w => [w.id, w]));

/* ============ Util ============ */
const $ = (s) => document.querySelector(s);
const NS = 'http://www.w3.org/2000/svg';
const svgEl = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent && parent.appendChild(e); return e; };
const rp = (n) => 'Rp ' + n.toLocaleString('id-ID');
const rpShort = (n) => n >= 1e9 ? 'Rp ' + (n / 1e9).toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' M' : 'Rp ' + Math.round(n / 1e6) + ' jt';
const cases = (d) => Math.round(d.share * TOTAL_CASES / 100);
const wantedAt = (id) => WANTED.filter(w => w.d === id);
const synAt = (id) => SYN.filter(s => s.hot.includes(id));
const DANGER_LABEL = ['', 'Rendah', 'Sedang', 'Cukup tinggi', 'Tinggi', 'Sangat tinggi'];

function pips(n) {
  return `<span class="inline-flex items-center gap-1" role="img" aria-label="Tingkat bahaya ${n} dari 5">` +
    [1,2,3,4,5].map(i => `<span class="h-2.5 w-2.5 rounded-full" style="background:${i <= n ? 'var(--siren)' : 'var(--line)'}"></span>`).join('') + '</span>';
}
function avatar(color, size = 56) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 56 56" aria-hidden="true">
    <rect width="56" height="56" rx="12" fill="var(--surface-2)"/>
    <circle cx="28" cy="21" r="9" fill="${color}" opacity=".85"/>
    <path d="M10 50c1-11 8-16 18-16s17 5 18 16z" fill="${color}" opacity=".85"/></svg>`;
}
function spark(values, w = 250, h = 36) {
  const min = Math.min(...values), max = Math.max(...values);
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - ((v - min) / (max - min || 1)) * (h - 8) - 4]);
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const l = pts[pts.length - 1];
  return `<svg viewBox="0 0 ${w} ${h}" class="w-full" style="height:36px" aria-hidden="true"><path d="${path}" fill="none" stroke="var(--cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${l[0]}" cy="${l[1]}" r="3.5" fill="var(--siren)"/></svg>`;
}
const chip = (kind, id, label) => `<button data-pin="${kind}:${id}" data-keep="1" class="chip rounded-full px-2.5 py-1 text-xs font-semibold">${label}</button>`;

/* ============ State ============ */
const state = { hover: null, pin: null, sort: 'bounty', lastSyn: 'narkotika', lastW: 'w1' };
let clearTimer = null;
const active = () => state.hover || state.pin;
const same = (a, b) => a && b && a.kind === b.kind && a.id === b.id;

/* ============ Peta ============ */
const map = $('#map'), holo = $('#holo');
const HEX_R = 60;
const hexPts = (cx, cy) => [0,1,2,3,4,5].map(k => { const a = Math.PI / 180 * (60 * k + 30); return (cx + HEX_R * Math.cos(a)).toFixed(1) + ',' + (cy + HEX_R * Math.sin(a)).toFixed(1); }).join(' ');
const linkEls = LINKS.map(([a, b]) => ({ a, b, el: svgEl('line', { x1: D[a].x, y1: D[a].y, x2: D[b].x, y2: D[b].y, class: 'link' }, map) }));
const hexEls = {};
DISTRICTS.forEach(d => {
  const g = svgEl('g', { class: 'hex', tabindex: 0, role: 'button', 'data-pin': 'd:' + d.id, 'data-hover': 'd:' + d.id, 'aria-label': `${d.name}, ${d.share} persen kasus kota` }, map);
  svgEl('polygon', { points: hexPts(d.x, d.y), fill: `color-mix(in srgb, var(--siren) ${Math.round(14 + (d.share - 5) / 11 * 48)}%, var(--surface-2))` }, g);
  svgEl('polygon', { points: hexPts(d.x, d.y), class: 'pulse' }, g);
  const pct = svgEl('text', { x: d.x, y: d.y + 3, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: 'var(--ink)', 'font-family': 'Barlow Condensed, sans-serif' }, g); pct.textContent = d.share + '%';
  const nm = svgEl('text', { x: d.x, y: d.y + 22, 'text-anchor': 'middle', 'font-size': 10.5, 'font-weight': 600, fill: 'var(--ink)', 'font-family': 'Public Sans, sans-serif' }, g); nm.textContent = d.name;
  hexEls[d.id] = g;
});
// Pindahkan garis di belakang heksagon
linkEls.forEach(l => map.insertBefore(l.el, map.firstChild));

function setViewBox() {
  const small = window.innerWidth < 1024;
  const v = small ? { x: 190, y: 28, w: 435, h: 335 } : { x: 0, y: 0, w: 800, h: 380 };
  map.setAttribute('viewBox', `${v.x} ${v.y} ${v.w} ${v.h}`);
  $('#mapBox').style.aspectRatio = `${v.w} / ${v.h}`;
}
setViewBox(); window.addEventListener('resize', setViewBox);

/* ============ Render panel wilayah ============ */
let holoKey = '';
function districtPanel(d) {
  const sh = wantedAt(d.id), ss = synAt(d.id);
  return `<div class="relative">
    <div class="flex items-start justify-between gap-3">
      <div><h3 class="display text-2xl font-bold leading-none">${d.name}</h3>
        <p class="mt-1 text-xs" style="color: var(--muted)">${cases(d).toLocaleString('id-ID')} kasus bulan ini</p></div>
      <div class="display text-4xl font-bold leading-none" style="color: var(--siren)">${d.share}<span class="text-xl">%</span></div>
    </div>
    <div class="mt-3 space-y-2">${d.crimes.map(([n, p]) => `
      <div><div class="flex justify-between text-xs"><span>${n}</span><b>${p}%</b></div>
      <div class="mt-1 h-1.5 rounded-full" style="background: var(--surface-2)"><div class="fill h-1.5 rounded-full" style="width:${p}%; background: var(--cyan)"></div></div></div>`).join('')}</div>
    <div class="mt-3">${spark(d.trend)}<div class="text-[11px]" style="color: var(--muted)">Porsi kasus 6 bulan terakhir</div></div>
    <div class="mt-3 text-xs font-semibold">Terhubung ke ${NB[d.id].length} wilayah</div>
    <div class="mt-1.5 flex flex-wrap gap-1.5">${NB[d.id].map(id => chip('d', id, D[id].name)).join('')}</div>
    ${ss.length ? `<div class="mt-3 text-xs font-semibold">Sindikat aktif di sini</div><div class="mt-1.5 flex flex-wrap gap-1.5">${ss.map(s => chip('s', s.id, s.name)).join('')}</div>` : ''}
    ${sh.length ? `<div class="mt-3 text-xs font-semibold">Buronan terakhir terlihat di sini</div><div class="mt-1.5 flex flex-wrap gap-1.5">${sh.map(w => chip('w', w.id, w.alias + ' · ' + rpShort(w.bounty))).join('')}</div>` : ''}
  </div>`;
}

/* ============ Sindikat ============ */
$('#synList').innerHTML = SYN.map(s => `
  <li><button class="row-btn w-full rounded-xl px-3 py-2.5" data-pin="s:${s.id}" data-hover="s:${s.id}" aria-pressed="false" style="background: var(--surface-2)">
    <div class="flex items-baseline justify-between gap-3"><span class="text-sm font-semibold">${s.name}</span><span class="display text-2xl font-bold leading-none">${s.pct}%</span></div>
    <div class="mt-1.5 h-2 rounded-full" style="background: var(--bg)"><div class="fill h-2 rounded-full" style="width:${s.pct / 31 * 100}%; background: var(--blue)"></div></div>
  </button></li>`).join('');

let synKey = '';
function paintSyn(id) {
  const s = S[id];
  const rows = [...document.querySelectorAll('#synList .row-btn')];
  rows.forEach((r, i) => r.setAttribute('aria-pressed', SYN[i].id === id && active()?.kind === 's' ? 'true' : 'false'));
  if (synKey === id) return; synKey = id;
  const ws = WANTED.filter(w => w.syn === id);
  $('#synDetail').innerHTML = `<div class="relative">
    <h3 class="display text-2xl font-bold">${s.name}</h3>
    <div class="mt-1 flex items-end gap-4"><span class="display text-5xl font-bold leading-none" style="color: var(--blue)">${s.pct}%</span>
      <span class="pb-1 text-sm" style="color: var(--muted)">${s.n} orang ditangkap · ${s.trend} dari bulan lalu</span></div>
    <p class="mt-3 text-sm">${s.modus}</p>
    <div class="mt-4 text-xs font-semibold">Wilayah rawan</div>
    <div class="mt-1.5 flex flex-wrap gap-1.5">${s.hot.map(h => chip('d', h, D[h].name)).join('')}</div>
    ${ws.length ? `<div class="mt-4 text-xs font-semibold">Buronan terkait</div><div class="mt-1.5 flex flex-wrap gap-1.5">${ws.map(w => chip('w', w.id, w.alias + ' · ' + rpShort(w.bounty))).join('')}</div>` : ''}
  </div>`;
}

/* ============ Buronan ============ */
function paintWList() {
  const list = [...WANTED].sort((a, b) => state.sort === 'bounty' ? b.bounty - a.bounty : (b.danger - a.danger) || (b.bounty - a.bounty));
  $('#wList').innerHTML = list.map(w => `
    <button class="wcard rounded-2xl p-3.5" data-pin="w:${w.id}" data-hover="w:${w.id}" data-wid="${w.id}" aria-pressed="false" style="background: var(--surface-2)">
      <div class="flex gap-3">${avatar(w.danger >= 4 ? 'var(--siren)' : 'var(--brass)', 52)}
        <div class="min-w-0 flex-1">
          <div class="display text-xl font-bold leading-tight">${w.alias}</div>
          <div class="truncate text-xs" style="color: var(--muted)">${D[w.d].name}</div>
          <div class="mt-1 flex items-center justify-between gap-2"><span class="text-sm font-bold" style="color: var(--brass)">${rpShort(w.bounty)}</span>${pips(w.danger)}</div>
        </div></div>
    </button>`).join('');
  $('#sortBounty').style.cssText = state.sort === 'bounty' ? 'background: var(--ink); color: var(--bg)' : 'color: var(--muted)';
  $('#sortDanger').style.cssText = state.sort === 'danger' ? 'background: var(--ink); color: var(--bg)' : 'color: var(--muted)';
}
let wKey = '';
function paintW(id) {
  document.querySelectorAll('.wcard').forEach(c => c.setAttribute('aria-pressed', c.dataset.wid === id && active()?.kind === 'w' ? 'true' : 'false'));
  if (wKey === id) return; wKey = id;
  const w = W[id], d = D[w.d];
  $('#wDossier').innerHTML = `<div class="relative">
    <div class="flex items-center gap-4">${avatar(w.danger >= 4 ? 'var(--siren)' : 'var(--brass)', 72)}
      <div><div class="text-xs" style="color: var(--muted)">Dicari</div>
        <h3 class="display text-3xl font-bold leading-none">${w.alias}</h3>
        <div class="mt-1 text-sm">${w.name}, ${w.age} tahun</div></div></div>
    <p class="mt-3 text-sm">${w.charge}</p>
    <div class="mt-4 rounded-xl p-3" style="background: var(--surface-2)">
      <div class="text-xs" style="color: var(--muted)">Hadiah untuk informasi yang mengarah pada penangkapan</div>
      <div class="display text-4xl font-bold" style="color: var(--brass)">${rp(w.bounty)}</div></div>
    <div class="mt-3 flex items-center justify-between text-sm"><span>Tingkat bahaya: ${DANGER_LABEL[w.danger]}</span>${pips(w.danger)}</div>
    <p class="mt-3 text-sm" style="color: var(--muted)">Ciri: ${w.trait}</p>
    <div class="mt-3 text-xs font-semibold">Terakhir terlihat · jaringan</div>
    <div class="mt-1.5 flex flex-wrap gap-1.5">${chip('d', w.d, d.name)}${chip('s', w.syn, S[w.syn].name)}</div>
    <p class="mt-4 rounded-lg p-2.5 text-xs" style="background: var(--surface-2)">Jangan mendekati atau menghadapi tersangka sendiri. Segera hubungi 110.</p>
  </div>`;
}

/* ============ Pelukis utama ============ */
function paint() {
  const a = active();
  const lit = new Set(), rel = new Set();
  let caption = 'Pilih salah satu wilayah, sindikat, atau buronan untuk melihat keterkaitannya.';
  if (a?.kind === 'd') { lit.add(a.id); NB[a.id].forEach(n => rel.add(n)); caption = `${D[a.id].name} terhubung ke ${NB[a.id].map(n => D[n].name).join(', ')}.`; }
  if (a?.kind === 's') { S[a.id].hot.forEach(h => lit.add(h)); caption = `${S[a.id].name} paling aktif di ${S[a.id].hot.map(h => D[h].name).join(', ')}.`; }
  if (a?.kind === 'w') { lit.add(W[a.id].d); caption = `${W[a.id].alias} terakhir terlihat di ${D[W[a.id].d].name}.`; }
  $('#mapCaption').textContent = caption;

  Object.entries(hexEls).forEach(([id, g]) => {
    g.classList.toggle('on', lit.has(id));
    g.classList.toggle('rel', rel.has(id) && !lit.has(id));
    g.classList.toggle('dim', !!a && !lit.has(id) && !rel.has(id));
  });
  linkEls.forEach(({ a: x, b: y, el }) => {
    const on = a?.kind === 'd' && (x === a.id || y === a.id);
    el.classList.toggle('on', on);
    el.classList.toggle('dim', !!a && !on);
  });

  // Panel holo wilayah
  if (a?.kind === 'd') {
    const d = D[a.id];
    holo.dataset.side = d.x < 407 ? 'right' : 'left';
    holo.dataset.open = 'true';
    if (holoKey !== a.id) { holoKey = a.id; holo.innerHTML = districtPanel(d); }
  } else { holo.dataset.open = 'false'; }

  if (a?.kind === 's') state.lastSyn = a.id;
  if (a?.kind === 'w') state.lastW = a.id;
  paintSyn(state.lastSyn);
  paintW(state.lastW);
}

/* ============ Interaksi ============ */
const parse = (str) => { const [kind, id] = str.split(':'); return { kind, id }; };
const setHover = (h) => { clearTimeout(clearTimer); if (!same(state.hover, h)) { state.hover = h; paint(); } };
const scheduleClear = () => { clearTimeout(clearTimer); clearTimer = setTimeout(() => { if (state.hover) { state.hover = null; paint(); } }, 260); };

document.addEventListener('pointerover', (e) => {
  if (e.pointerType === 'touch') return;
  const t = e.target.closest('[data-hover]');
  if (t) setHover(parse(t.dataset.hover));
  else if (e.target.closest('.holo-float')) clearTimeout(clearTimer);
});
document.addEventListener('pointerout', (e) => {
  if (e.pointerType === 'touch') return;
  if (e.target.closest('[data-hover]') || e.target.closest('.holo-float')) scheduleClear();
});
document.addEventListener('focusin', (e) => { const t = e.target.closest?.('[data-hover]'); if (t) setHover(parse(t.dataset.hover)); });
document.addEventListener('focusout', (e) => { if (e.target.closest?.('[data-hover]')) scheduleClear(); });
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('g[data-pin]')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
});
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-pin]');
  if (t) {
    const p = parse(t.dataset.pin);
    state.pin = (!t.dataset.keep && same(state.pin, p)) ? null : p;
    state.hover = null; holoKey = state.pin?.kind === 'd' ? holoKey : holoKey;
    if (t.dataset.keep) { state.hover = null; }
    paint();
    return;
  }
  if (e.target.closest('#map') || e.target === document.body) { state.pin = null; paint(); }
});
$('#sortBounty').addEventListener('click', () => { state.sort = 'bounty'; paintWList(); paint(); });
$('#sortDanger').addEventListener('click', () => { state.sort = 'danger'; paintWList(); paint(); });

// Kartu buronan miring mengikuti kursor, seperti objek 3D
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
$('#wList').addEventListener('pointermove', (e) => {
  if (reduce.matches || e.pointerType === 'touch') return;
  const c = e.target.closest('.wcard'); if (!c) return;
  const r = c.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
  c.style.transform = `rotateY(${(px * 12).toFixed(1)}deg) rotateX(${(-py * 12).toFixed(1)}deg) translateZ(6px)`;
});
$('#wList').addEventListener('pointerout', (e) => { const c = e.target.closest('.wcard'); if (c) c.style.transform = ''; });

/* ============ KPI + tema ============ */
$('#kpiBounty').textContent = rpShort(WANTED.reduce((s, w) => s + w.bounty, 0));
$('#themeBtn').addEventListener('click', () => {
  const r = document.documentElement;
  r.setAttribute('data-theme', r.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ============ Mulai ============ */
paintWList();
paint();
