import { useEffect, useRef, useState } from 'react'
import { galleryImages } from '../galleryImages.js'
import Lightbox from '../components/Lightbox.jsx'
import './GalleryPage.css'

function MasonryImage({ src, name, index, onOpen }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <figure
      ref={ref}
      className={`gallery-page__item${visible ? ' visible' : ''}${imgError ? ' gallery-page__item--broken' : ''}`}
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
    >
      <button
        className="gallery-page__item-btn"
        onClick={onOpen}
        disabled={imgError}
        aria-label={`View ${name || 'photograph'}`}
      >
        <img
          src={src}
          alt={name || 'Photograph'}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </button>
      {name && <figcaption className="gallery-page__caption">{name}</figcaption>}
    </figure>
  )
}

function EmptyState() {
  return (
    <div className="gallery-page__empty">
      <div className="gallery-page__empty-bar" />
      <p className="gallery-page__empty-title">No photographs yet.</p>
      <p className="gallery-page__empty-sub">
        Drop your images into <code>src/gallery/</code> — any <code>.jpg</code>,&nbsp;
        <code>.jpeg</code>, <code>.png</code>, <code>.webp</code>, or <code>.avif</code>&nbsp;
        file appears here automatically on the next save.
      </p>
    </div>
  )
}

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const lightboxItems = galleryImages.map(img => ({
    src: img.src,
    title: img.name,
    description: img.description,
  }))

  return (
    <div className="gallery-page page-enter" id="main-content">
      <header className="gallery-page__header">
        <h1 className="gallery-page__title">Gallery</h1>
        {galleryImages.length > 0 && (
          <span className="gallery-page__count label">
            — {galleryImages.length} photograph{galleryImages.length !== 1 ? 's' : ''}
          </span>
        )}
      </header>

      {galleryImages.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="gallery-page__masonry">
          {galleryImages.map((img, i) => (
            <MasonryImage
              key={img.src}
              src={img.src}
              name={img.name}
              index={i}
              onOpen={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  )
}
