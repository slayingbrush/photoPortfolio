// Drop any .mp4 / .webm / .mov file into src/videos/ and it appears
// in the home page Film section automatically on the next save.
// The first file (alphabetically) is the featured video.
const modules = import.meta.glob(
  './videos/*.{mp4,webm,mov,MP4,WEBM,MOV}',
  { eager: true, import: 'default' }
)

export const videos = Object.entries(modules).map(([path, src]) => ({
  src,
  name: path
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' '),
}))
