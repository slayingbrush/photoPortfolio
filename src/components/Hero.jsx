import { useState } from 'react'
import { photos } from '../data.js'
import { slotMeta } from '../photos.js'
import Lightbox from './Lightbox.jsx'
import './Hero.css'

export default function Hero() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // When a slot is filled by one of your own photos, its admin-entered
  // title/description is used; the data.js placeholder copy only applies
  // to slots still showing stock fallbacks.
  const items = photos.map((p, i) => {
    const m = slotMeta(`hero-${i + 1}`)
    return {
      src: p.url,
      title: m.title || p.name,
      description: m.title ? m.description : p.description,
    }
  })

  return (
    <section className="hero" aria-label="Selected photographs">
      <div className="hero__grid">
        <h1 className="hero__block">
          <span className="hero__name">Ahadu Mengesha</span>
          <span className="hero__role label">Creative Portfolio</span>
          <a
            className="hero__ig"
            href="https://instagram.com/am.photo6"
            target="_blank"
            rel="noopener noreferrer"
          >
            @am.photo6
          </a>
        </h1>

        {photos.map((photo, i) => (
          <button
            key={photo.id}
            className={`hero__tile hero__tile--${i + 1}`}
            onClick={() => setLightboxIndex(i)}
            aria-label={`View ${photo.name} — ${photo.category}`}
          >
            <img
              src={photo.url}
              alt=""
              fetchpriority={i === 0 ? 'high' : undefined}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  )
}
