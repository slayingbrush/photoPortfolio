import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Dev-only admin API: lets the /admin page read the gallery folder and
// write display titles/descriptions into src/gallery-meta.json.
// Never part of the production build — the deployed site is fully static.
function adminApi() {
  const metaPath = path.resolve(process.cwd(), 'src/gallery-meta.json')
  const homePath = path.resolve(process.cwd(), 'src/home-config.json')
  const galleryDir = path.resolve(process.cwd(), 'src/gallery')
  const photosDir = path.resolve(process.cwd(), 'src/photos')

  const readJson = p => {
    try { return JSON.parse(fs.readFileSync(p, 'utf8')) } catch { return {} }
  }
  const listDir = dir =>
    fs.existsSync(dir)
      ? fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort()
      : []

  return {
    name: 'admin-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__admin/list', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          files: listDir(galleryDir),
          photoFiles: listDir(photosDir),
          meta: readJson(metaPath),
          home: readJson(homePath),
        }))
      })

      server.middlewares.use('/__admin/home', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; return res.end() }
        let body = ''
        req.on('data', c => { body += c })
        req.on('end', () => {
          try {
            const { slot, file } = JSON.parse(body)
            const home = readJson(homePath)
            if (file) home[slot] = file
            else delete home[slot]
            fs.writeFileSync(homePath, JSON.stringify(home, null, 2) + '\n')
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (e) {
            res.statusCode = 400
            res.end(JSON.stringify({ ok: false, error: String(e) }))
          }
        })
      })

      server.middlewares.use('/__admin/save', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; return res.end() }
        let body = ''
        req.on('data', c => { body += c })
        req.on('end', () => {
          try {
            const { file, title, description } = JSON.parse(body)
            const meta = readJson(metaPath)
            const entry = {}
            if (title && title.trim()) entry.title = title.trim()
            if (description && description.trim()) entry.description = description.trim()
            if (Object.keys(entry).length === 0) delete meta[file]
            else meta[file] = entry
            fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n')
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (e) {
            res.statusCode = 400
            res.end(JSON.stringify({ ok: false, error: String(e) }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), adminApi()],
  // Vite's built-in asset list is lowercase-only; cameras name files IMG_1234.JPG.
  assetsInclude: [
    '**/*.JPG', '**/*.JPEG', '**/*.PNG', '**/*.WEBP', '**/*.AVIF',
    '**/*.MP4', '**/*.MOV', '**/*.WEBM', '**/*.mov',
  ],
})
