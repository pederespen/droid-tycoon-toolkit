// One-off scraper: downloads droid portrait art (all variants) from the
// Fortnite Fandom wiki via the MediaWiki API and self-hosts them under
// public/droids/. Also emits src/lib/droidImages.ts mapping each droid +
// collectible slot to a local filename.
//
// Images are © Epic Games / Lucasfilm; sourced from the community Fandom wiki
// and used here for a non-commercial fan reference tool. Run with:
//   node scripts/fetch-droid-images.mjs
import { mkdir, writeFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'public', 'droids')
const MANIFEST = join(ROOT, 'src', 'lib', 'droidImages.ts')

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) DroidTycoonToolkit/1.0'
const API = 'https://fortnite.fandom.com/api.php'

// App droid name -> wiki filename base (only where they differ).
const wikiName = {
  PIT: 'Pit',
  'BU-4D': 'B-U4D',
  'VECT-ARM': 'Vect-Arm',
  LO: 'L0',
  'OPTI-Pod': 'Opti-Pod',
  'TRAK-R': 'Trak-R',
  'UTIL-TEC': 'Util-Tec',
  'HAUL-R': 'Haul-R',
  'Mono-Walker': 'Mono-WLKR',
  'OPTI-Strike': 'Opti-STRK',
  BB8: 'BB-8',
}

// Full roster (name + whether iconic). Iconic droids only have a base portrait.
const droids = [
  ...[
    'Mouse',
    'PIT',
    'Gonk',
    'CB',
    'R3',
    'R5',
    'R8',
    'Imperial Probe',
    'B1 Battle',
    'DRK-1 Probe',
    'ID10',
  ],
  ...[
    'BDX Explorer',
    'ARG',
    'Senate Hovercam',
    'BU-4D',
    'BAL-Core',
    'ROLL-R',
    '2BB',
    'A-LT',
    'R4',
    'R9',
    'B1 Security',
    'NAV-EX',
    'VECT-ARM',
    'HOV-R',
  ],
  ...[
    'Groundmech',
    'LO',
    'AMP Walker',
    'SEN-TRI',
    'OPTI-Pod',
    'Gunrunner',
    'BB',
    'R2',
    'R6',
    'TRAK-R',
    'Orb-Walker',
    'UTIL-TEC',
    'B1 Heavy',
    'B2 Super',
    'B2 Heavy',
    'Strike-Orb',
    'HAUL-R',
    'LNG-Shot',
  ],
  ...[
    'Proto-Roller',
    'Mecha-Droid',
    'Mono-Walker',
    'BB9',
    'R7',
    'B2-RP',
    'Cyclo-Grav',
    'OPTI-Strike',
  ],
].map((name) => ({ name, iconic: false }))

const iconics = ['BB8', 'Mister Bones', 'IG-11 Marshal', 'DJ-R3X', 'CB-23'].map(
  (name) => ({ name, iconic: true }),
)

const roster = [...droids, ...iconics]

// Collectible slots that have distinct art (Flawless is an effect, no portrait).
const variants = ['Basic', 'Gold', 'Diamond', 'Rainbow', 'Beskar']

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const fileFor = (name, variant) => {
  const base = wikiName[name] ?? name
  return variant === 'Basic'
    ? `${base} - Droid - Droid Tycoon.png`
    : `${base} (${variant}) - Droid - Droid Tycoon.png`
}

// Build the list of (droid, variant) targets.
const targets = []
for (const { name, iconic } of roster) {
  const slots = iconic ? ['Basic'] : variants
  for (const variant of slots) {
    targets.push({ name, variant, wikiFile: fileFor(name, variant) })
  }
}

async function resolveUrls(titles) {
  const out = {}
  // API accepts up to 50 titles per request.
  for (let i = 0; i < titles.length; i += 50) {
    const batch = titles.slice(i, i + 50)
    const params = new URLSearchParams({
      action: 'query',
      prop: 'imageinfo',
      iiprop: 'url',
      format: 'json',
      titles: batch.map((t) => `File:${t}`).join('|'),
    })
    const res = await fetch(`${API}?${params}`, {
      headers: { 'User-Agent': UA },
    })
    const data = await res.json()
    const norm = {}
    for (const n of data.query?.normalized ?? []) norm[n.to] = n.from
    for (const page of Object.values(data.query?.pages ?? {})) {
      const info = page.imageinfo?.[0]
      if (!info) continue
      const title = (norm[page.title] ?? page.title).replace(/^File:/, '')
      out[title] = info.url
    }
  }
  return out
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const existing = new Set(await readdir(OUT_DIR).catch(() => []))

  const urlByFile = await resolveUrls(targets.map((t) => t.wikiFile))

  const manifest = {} // name -> { Basic: 'file.webp', ... }
  let ok = 0
  const missing = []

  for (const t of targets) {
    const url = urlByFile[t.wikiFile]
    if (!url) {
      missing.push(t.wikiFile)
      continue
    }
    const suffix = t.variant === 'Basic' ? '' : `-${t.variant.toLowerCase()}`
    const outName = `${slug(t.name)}${suffix}.webp`
    manifest[t.name] ??= {}
    manifest[t.name][t.variant] = outName

    if (!existing.has(outName)) {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'image/webp,*/*' },
      })
      if (!res.ok) {
        missing.push(t.wikiFile)
        continue
      }
      const buf = Buffer.from(await res.arrayBuffer())
      await writeFile(join(OUT_DIR, outName), buf)
    }
    ok++
    process.stdout.write(
      `\r${ok}/${targets.length} ${t.name} ${t.variant}        `,
    )
  }

  // Emit the manifest module.
  const body =
    `// AUTO-GENERATED by scripts/fetch-droid-images.mjs — do not edit by hand.\n` +
    `// Droid portrait art © Epic Games / Lucasfilm, sourced from the Fandom wiki.\n` +
    `import type { CollectionSlot } from './types'\n\n` +
    `export const droidImages: Record<string, Partial<Record<CollectionSlot, string>>> = ${JSON.stringify(
      manifest,
      null,
      2,
    )}\n`
  await writeFile(MANIFEST, body)

  console.log(`\nDone. ${ok} images, ${Object.keys(manifest).length} droids.`)
  if (missing.length) console.log('Missing:', missing.join(', '))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
