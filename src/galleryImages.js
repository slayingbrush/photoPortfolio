// Drop any .jpg / .jpeg / .png / .webp / .avif file into src/gallery/
// and it appears here automatically on the next save.
// Display titles & descriptions come from src/gallery-meta.json,
// edited via the /admin page while running `npm run dev`.
import meta from './gallery-meta.json'

const modules = import.meta.glob(
  './gallery/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default' }
)

export const galleryImages = Object.entries(modules).map(([path, src]) => {
  const file = path.split('/').pop()
  const m = meta[file] || {}
  return {
    src,
    file,
    name: m.title || file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
    description: m.description || '',
  }
})
