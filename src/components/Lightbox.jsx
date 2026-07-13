import { useEffect, useRef, useCallback } from 'react'
import './Lightbox.css'

/**
 * Full-screen photo viewer built on native <dialog> —
 * focus trap, ESC-to-close, and ::backdrop come free.
 * items: [{ src, title, description?, meta? }]
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const ref = useRef(null)
  const item = items[index]
  const many = items.length > 1

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const prev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate]
  )
  const next = useCallback(
    () => onNavigate((index + 1) % items.length),
    [index, items.length, onNavigate]
  )

  useEffect(() => {
    if (!many) return
    const onKey = e => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [many, prev, next])

  if (!item) return null

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={item.title || 'Photograph'}
      onClose={onClose}
      onClick={e => { if (e.target === ref.current) onClose() }}
    >
      <button className="lightbox__close" onClick={onClose} aria-label="Close viewer">
        <span aria-hidden="true">×</span>
      </button>

      <figure className="lightbox__figure" key={item.src}>
        <img className="lightbox__img" src={item.src} alt={item.title || 'Photograph'} />
        <figcaption className="lightbox__caption">
          {many && (
            <span className="lightbox__count label">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          )}
          {item.title && <span className="lightbox__title">{item.title}</span>}
          {item.description && <span className="lightbox__desc">{item.description}</span>}
        </figcaption>
      </figure>

      {many && (
        <>
          <button className="lightbox__arrow lightbox__arrow--prev" onClick={prev} aria-label="Previous photograph">
            <span aria-hidden="true">←</span>
          </button>
          <button className="lightbox__arrow lightbox__arrow--next" onClick={next} aria-label="Next photograph">
            <span aria-hidden="true">→</span>
          </button>
        </>
      )}
    </dialog>
  )
}
