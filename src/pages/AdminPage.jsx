import { useEffect, useState } from 'react'
import './AdminPage.css'

const HOME_SLOTS = [
  { id: 'hero-1', label: 'Hero 1 — large left tile' },
  { id: 'hero-2', label: 'Hero 2 — top right' },
  { id: 'hero-3', label: 'Hero 3 — mid right' },
  { id: 'hero-4', label: 'Hero 4 — bottom row' },
  { id: 'hero-5', label: 'Hero 5 — bottom row' },
  { id: 'hero-6', label: 'Hero 6 — bottom right' },
  { id: 'about', label: 'About — portrait' },
]

function thumbUrl(file, photoFiles) {
  const dir = photoFiles.includes(file) ? 'photos' : 'gallery'
  return `/src/${dir}/${encodeURIComponent(file)}`
}

/* ── Photos tab: display title + description per gallery photo ── */
function MetaRow({ file, initial, photoFiles }) {
  const [title, setTitle] = useState(initial.title || '')
  const [description, setDescription] = useState(initial.description || '')
  const [status, setStatus] = useState('idle')

  async function save() {
    setStatus('saving')
    try {
      const res = await fetch('/__admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file, title, description }),
      })
      if (!res.ok) throw new Error()
      setStatus('saved')
      setTimeout(() => setStatus(s => (s === 'saved' ? 'idle' : s)), 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="admin__row">
      <div className="admin__thumb">
        <img src={thumbUrl(file, photoFiles)} alt="" loading="lazy" />
      </div>

      <div className="admin__fields">
        <span className="admin__file">{file}</span>
        <input
          className="admin__input"
          type="text"
          placeholder="Display title (shown on the site)"
          value={title}
          onChange={e => { setTitle(e.target.value); setStatus('dirty') }}
        />
        <textarea
          className="admin__input admin__textarea"
          placeholder="Description (shown in the photo viewer)"
          rows={2}
          value={description}
          onChange={e => { setDescription(e.target.value); setStatus('dirty') }}
        />
      </div>

      <div className="admin__actions">
        <button
          className="admin__save"
          onClick={save}
          disabled={status !== 'dirty' && status !== 'error'}
        >
          {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved ✓' : 'Save'}
        </button>
        {status === 'error' && <span className="admin__error">Failed — is the dev server running?</span>}
      </div>
    </div>
  )
}

/* ── Home tab: assign any photo to a hero/about slot ─────────── */
function SlotRow({ slot, label, current, allFiles, photoFiles, meta }) {
  const [value, setValue] = useState(current || '')
  const [status, setStatus] = useState('idle')

  async function assign(next) {
    setValue(next)
    setStatus('saving')
    try {
      const res = await fetch('/__admin/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot, file: next }),
      })
      if (!res.ok) throw new Error()
      setStatus('saved')
      setTimeout(() => setStatus(s => (s === 'saved' ? 'idle' : s)), 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="admin__row admin__row--slot">
      <div className="admin__thumb">
        {value
          ? <img src={thumbUrl(value, photoFiles)} alt="" loading="lazy" />
          : <span className="admin__thumb-empty">convention<br />({slot}.jpg)</span>}
      </div>

      <div className="admin__fields">
        <span className="admin__file">{label}</span>
        <select
          className="admin__input admin__select"
          value={value}
          onChange={e => assign(e.target.value)}
        >
          <option value="">— use filename convention ({slot}.jpg) —</option>
          {allFiles.map(f => (
            <option key={f} value={f}>
              {meta[f]?.title ? `${meta[f].title} — ${f}` : f}
            </option>
          ))}
        </select>
      </div>

      <div className="admin__actions admin__actions--slot">
        <span className="admin__status">
          {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved ✓' : status === 'error' ? 'Failed' : ''}
        </span>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [data, setData] = useState(null)
  const [unavailable, setUnavailable] = useState(false)
  const [tab, setTab] = useState('photos')

  useEffect(() => {
    fetch('/__admin/list')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(setData)
      .catch(() => setUnavailable(true))
  }, [])

  const photoFiles = data?.photoFiles || []
  const allFiles = data ? [...new Set([...data.files, ...photoFiles])].sort() : []

  return (
    <div className="admin page-enter" id="main-content">
      <header className="admin__header">
        <h1 className="admin__title">Admin</h1>
        <span className="admin__meta">
          {data ? `${allFiles.length} photographs — local only` : 'loading…'}
        </span>
      </header>

      {unavailable && (
        <p className="admin__notice">
          The admin panel only works while running <code>npm run dev</code> on
          your own machine. It is not part of the published site.
        </p>
      )}

      {data && (
        <>
          <div className="admin__tabs">
            <button
              className={`admin__tab${tab === 'photos' ? ' admin__tab--active' : ''}`}
              onClick={() => setTab('photos')}
            >
              Photos
            </button>
            <button
              className={`admin__tab${tab === 'home' ? ' admin__tab--active' : ''}`}
              onClick={() => setTab('home')}
            >
              Home layout
            </button>
          </div>

          {tab === 'photos' && (
            data.files.length === 0 ? (
              <p className="admin__notice">
                No photographs found — drop images into <code>src/gallery/</code> first.
              </p>
            ) : (
              <div className="admin__list">
                {data.files.map(file => (
                  <MetaRow
                    key={file}
                    file={file}
                    initial={data.meta[file] || {}}
                    photoFiles={photoFiles}
                  />
                ))}
              </div>
            )
          )}

          {tab === 'home' && (
            <>
              <p className="admin__notice admin__notice--hint">
                Assign any photograph to a hero tile or the about portrait.
                Changes apply after the page reloads. Titles &amp; descriptions
                from the Photos tab follow the photo into the hero viewer.
              </p>
              <div className="admin__list">
                {HOME_SLOTS.map(s => (
                  <SlotRow
                    key={s.id}
                    slot={s.id}
                    label={s.label}
                    current={data.home[s.id]}
                    allFiles={allFiles}
                    photoFiles={photoFiles}
                    meta={data.meta}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
