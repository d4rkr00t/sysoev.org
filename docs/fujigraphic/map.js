// tone: iOS pad vertical axis, + brighter / lifted shadows, - darker / deeper shadows
const SIMS = {
  provia: { label: 'Provia / Standard', style: 'Standard', tone: 0, color: 0 },
  velvia: { label: 'Velvia / Vivid', style: 'Vibrant', tone: -15, color: 30, palette: 100 },
  astia: { label: 'Astia / Soft', style: 'Rose Gold', tone: 10, color: 10, palette: 60 },
  classicchrome: { label: 'Classic Chrome', style: 'Natural', tone: -15, color: -40, palette: 80, adjust: { Warmth: -5 } },
  proneghi: { label: 'Pro Neg. Hi', style: 'Neutral', tone: -5, color: -10, palette: 60 },
  pronegstd: { label: 'Pro Neg. Std', style: 'Neutral', tone: 15, color: -15, palette: 60 },
  classicneg: { label: 'Classic Negative', style: 'Dramatic', tone: -10, color: -30, palette: 60, adjust: { Warmth: 10, Tint: -4 } },
  eterna: { label: 'Eterna / Cinema', style: 'Natural', tone: 25, color: -40, palette: 80, adjust: { Warmth: -5 } },
  bleach: { label: 'Eterna Bleach Bypass', style: 'Dramatic', tone: -25, color: -80, palette: 100 },
  nostalgic: { label: 'Nostalgic Neg.', style: 'Amber', tone: 5, color: 10, palette: 80 },
  reala: { label: 'Reala Ace', style: 'Standard', tone: 0, color: 0 },
  acros: { label: 'Acros', style: 'Stark B&W', tone: -10, palette: 100, bw: true },
  mono: { label: 'Monochrome', style: 'Muted B&W', tone: 0, palette: 80, bw: true },
  sepia: { label: 'Sepia', style: 'Quiet', tone: 5, color: -80, palette: 100 },
  unknown: { label: 'Other', style: 'Standard', tone: 0, color: 0 },
}

// [label, equivalent Kelvin]; 5500 = neutral daylight
const WB = {
  auto: ['Auto', 5500],
  awp: ['Auto White Priority', 5500],
  ambience: ['Ambience Priority', 5500],
  daylight: ['Daylight', 5500],
  shade: ['Shade', 7500],
  fluorescent: ['Fluorescent', 4000],
  incandescent: ['Incandescent', 3000],
  kelvin: ['Kelvin', 5500],
}

const ADJUST = ['Exposure', 'Brilliance', 'Highlights', 'Shadows', 'Contrast', 'Brightness', 'Black Point', 'Saturation', 'Vibrance', 'Warmth', 'Tint', 'Sharpness', 'Definition', 'Noise Reduction', 'Vignette']
const POSITIVE = ['Sharpness', 'Definition', 'Noise Reduction']

const DEFAULTS = { sim: 'provia', filter: '', dr: '100', h: 0, s: 0, c: 0, nr: 0, sharp: 0, clarity: 0, grain: 'off', cce: 'off', cceBlue: 'off', wb: 'auto', kelvin: 5500, r: 0, b: 0, exp: 0 }

const KEYS = {
  filmsimulation: 'sim', simulation: 'sim',
  dynamicrange: 'dr', dr: 'dr',
  highlight: 'h', highlights: 'h', highlighttone: 'h',
  shadow: 's', shadows: 's', shadowtone: 's',
  color: 'c', colour: 'c',
  noisereduction: 'nr', highisonr: 'nr', nr: 'nr',
  sharpening: 'sharp', sharpness: 'sharp',
  clarity: 'clarity',
  graineffect: 'grain', grain: 'grain',
  colorchromeeffect: 'cce', colorchromefx: 'cce',
  colorchromeeffectblue: 'cceBlue', colorchromefxblue: 'cceBlue',
  whitebalance: 'wb', wb: 'wb',
  exposurecompensation: 'exp', exposure: 'exp',
  iso: 'iso',
}

// order matters: first substring hit wins
const SIM_MATCH = [['bleach', 'bleach'], ['eterna', 'eterna'], ['cinema', 'eterna'], ['acros', 'acros'], ['monochrome', 'mono'], ['sepia', 'sepia'], ['classicneg', 'classicneg'], ['classicchrome', 'classicchrome'], ['nostalgic', 'nostalgic'], ['reala', 'reala'], ['neghi', 'proneghi'], ['negstd', 'pronegstd'], ['velvia', 'velvia'], ['vivid', 'velvia'], ['provia', 'provia'], ['standard', 'provia'], ['astia', 'astia'], ['soft', 'astia']]

const flat = s => s.toLowerCase().replace(/[^a-z]/g, '')
const level = v => (/strong/i.test(v) ? 'strong' : /weak/i.test(v) ? 'weak' : 'off')
const num = v => {
  const m = v.match(/([+-]?\d+(?:\.\d+)?)(?:\/(\d+))?/)
  return m ? m[1] / (m[2] || 1) : 0
}

function setSim(r, v, explicit) {
  const hit = SIM_MATCH.find(([k]) => flat(v).includes(k))
  if (hit) {
    r.sim = hit[1]
    const f = v.match(/(?:acros|monochrome)\s*\+?\s*(ye|r|g)\b/i)
    r.filter = f ? f[1][0].toUpperCase() + f[1].slice(1).toLowerCase() : ''
  } else if (explicit) {
    r.sim = 'unknown'
    r.simRaw = v
  }
}

function parseWb(r, v) {
  const k = v.match(/(\d{4,5})\s*K\b/i)
  r.wb = k ? 'kelvin' : /white/i.test(v) ? 'awp' : /ambience/i.test(v) ? 'ambience' : /daylight|fine|sun/i.test(v) ? 'daylight' : /shade/i.test(v) ? 'shade' : /fluor/i.test(v) ? 'fluorescent' : /incand|tungsten/i.test(v) ? 'incandescent' : 'auto'
  if (k) r.kelvin = +k[1]
  const red = v.match(/\bR\s*:?\s*([+-]?\d+)/) || v.match(/([+-]?\d+)\s*red/i)
  const blue = v.match(/\bB\s*:?\s*([+-]?\d+)/) || v.match(/([+-]?\d+)\s*blue/i)
  if (red) r.r = +red[1]
  if (blue) r.b = +blue[1]
}

function parse(text) {
  const r = { ...DEFAULTS, unknown: [] }
  for (const line of text.replace(/[−–]/g, '-').split('\n')) {
    const i = line.indexOf(':')
    if (i < 0) {
      if (line.trim()) setSim(r, line, false)
      continue
    }
    const key = line.slice(0, i).trim()
    const v = line.slice(i + 1).trim()
    const f = KEYS[flat(key)]
    if (!f) r.unknown.push(key)
    else if (f === 'sim') setSim(r, v, true)
    else if (f === 'dr') r.dr = /auto/i.test(v) ? 'auto' : (v.match(/100|200|400/) || ['100'])[0]
    else if (f === 'grain' || f === 'cce' || f === 'cceBlue') r[f] = level(v)
    else if (f === 'wb') parseWb(r, v)
    else if (f !== 'iso') r[f] = num(v)
  }
  return r
}

function toIos(r) {
  const n = k => +r[k] || 0
  const fmt = v => (v > 0 ? '+' : '') + v
  const sim = SIMS[r.sim] || SIMS.unknown
  const notes = []
  const adj = {}
  const add = (k, v) => (adj[k] = (adj[k] || 0) + v)
  const style = { name: sim.style, tone: sim.tone, color: sim.bw ? null : sim.color + 10 * n('c'), palette: sim.palette ?? null, texture: 'Standard', textureAmount: 0, grain: false }

  if (sim === SIMS.unknown) notes.push(`Film simulation${r.simRaw ? ` "${r.simRaw}"` : ''} (not recognised, using Standard)`)
  for (const k in sim.adjust) add(k, sim.adjust[k])
  add('Highlights', ({ 200: -5, auto: -5, 400: -10 }[r.dr] || 0) + 8 * n('h'))
  add('Shadows', -8 * n('s'))
  add('Black Point', 1.5 * n('s')) // iOS Black Point: + = deeper blacks, - = washed

  if (n('nr') > 0) add('Noise Reduction', 15 * n('nr'))
  else if (n('nr') < 0) notes.push(`Noise Reduction ${fmt(n('nr'))} (below iPhone default)`)
  if (n('sharp') > 0) add('Sharpness', 15 * n('sharp'))
  if (n('clarity') > 0) add('Definition', 15 * n('clarity'))

  // Photos can't soften below 0; Glow texture is the only softening/bloom control
  const glow = Math.max(-10 * n('clarity'), -20 * n('sharp'))
  if (glow > 0) Object.assign(style, { texture: 'Glow', textureAmount: glow })

  if (r.grain === 'weak' || r.grain === 'strong') {
    style.grain = true
    notes.push('Grain strength/size (iOS grain is on/off)')
    if (style.texture === 'Standard') Object.assign(style, { texture: 'Film', textureAmount: 50 })
  }

  if (sim.bw) {
    if (r.filter) notes.push(`${r.filter} filter (not available)`)
  } else {
    add('Vibrance', { weak: 5, strong: 8 }[r.cce] || 0)
    if (r.cceBlue === 'weak' || r.cceBlue === 'strong') {
      add('Vibrance', r.cceBlue === 'strong' ? 5 : 3)
      notes.push('Color Chrome Blue (approximated, no per-hue control)')
    }
    // mired delta: Kelvin's visual effect is linear in 1e6/K, so 3000K shifts far more than 8000K
    const k = r.wb === 'kelvin' ? +r.kelvin || 5500 : (WB[r.wb] || WB.auto)[1]
    add('Warmth', 0.2 * (1e6 / 5500 - 1e6 / k) + 2 * (n('r') - n('b')))
    add('Tint', n('r') + n('b'))
  }
  add('Exposure', 30 * n('exp'))
  for (const k of r.unknown || []) notes.push(`Unrecognised: ${k}`)

  const clamp = (v, lo) => Math.max(lo, Math.min(100, Math.round(v)))
  style.tone = clamp(style.tone, -100)
  if (style.color !== null) style.color = clamp(style.color, -100)
  style.textureAmount = clamp(style.textureAmount, 0)
  const adjust = ADJUST.map(k => [k, clamp(adj[k] || 0, POSITIVE.includes(k) ? 0 : -100)]).filter(([, v]) => v)
  return { style, adjust, notes }
}

if (typeof module !== 'undefined') module.exports = { parse, toIos, SIMS, WB }
