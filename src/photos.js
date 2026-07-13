// Local photos for the home page (hero, projects, about).
//
// Two ways to fill a home-page slot:
//  1. Convention: name a file after the slot (hero-1.jpg … hero-6.jpg,
//     about.jpg) and drop it in src/photos/ or src/gallery/.
//  2. Admin: assign any photo to any slot from the /admin page while
//     running `npm run dev` (writes src/home-config.json).
// An explicit admin assignment wins over the filename convention.
// src/photos/ wins over src/gallery/ when both have the same filename.
import homeConfig from './home-config.json'
import galleryMeta from './gallery-meta.json'

const galleryModules = import.meta.glob(
  './gallery/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default' }
)
const photoModules = import.meta.glob(
  './photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default' }
)

const byName = {} // filename without extension → src
const byFile = {} // full filename → src
for (const modules of [galleryModules, photoModules]) {
  for (const [path, src] of Object.entries(modules)) {
    const file = path.split('/').pop()
    byFile[file] = src
    byName[file.replace(/\.[^.]+$/, '')] = src
  }
}

export function photo(name, fallback) {
  if (byName[name]) return byName[name]
  if (fallback) return fallback
  console.warn(`photo('${name}') not found in src/photos/ or src/gallery/ — check the filename`)
  return ''
}

/** The actual file filling a home slot: admin assignment first,
 *  then the filename convention (hero-2.jpg etc.). Null if neither. */
export function slotFile(slot) {
  const assigned = homeConfig[slot]
  if (assigned && byFile[assigned]) return assigned
  return Object.keys(byFile).find(f => f.replace(/\.[^.]+$/, '') === slot) || null
}

/** Image for a home slot ('hero-1' … 'hero-6', 'about'). */
export function slotSrc(slot, fallback) {
  const file = slotFile(slot)
  if (file) return byFile[file]
  return photo(slot, fallback)
}

/** Title/description for the photo filling a slot — the admin-entered
 *  display name, falling back to a cleaned-up filename. Empty object
 *  when the slot has no local file yet. */
export function slotMeta(slot) {
  const file = slotFile(slot)
  if (!file) return {}
  const m = galleryMeta[file] || {}
  return {
    title: m.title || file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
    description: m.description || '',
  }
}
