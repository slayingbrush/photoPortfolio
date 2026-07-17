import { useReveal } from '../useReveal.js'
import { videos } from '../videos.js'
import './Videos.css'

function EmptyState() {
  return (
    <div className="videos__empty">
      <div className="videos__empty-bar" />
      <p className="videos__empty-title">No films yet.</p>
      <p className="videos__empty-sub">
        Drop a video into <code>src/videos/</code> — any <code>.mp4</code>,&nbsp;
        <code>.webm</code>, or <code>.mov</code> file appears here automatically
        on the next save.
      </p>
    </div>
  )
}

export default function Videos() {
  const [headerRef, headerVisible] = useReveal()
  const [frameRef, frameVisible] = useReveal(0.05)
  const feature = videos[0]

  return (
    <section id="videos" className="videos section-pad">
      <div
        ref={headerRef}
        className={`videos__header reveal ${headerVisible ? 'visible' : ''}`}
      >
        <h2 className="videos__title">Film</h2>
        {feature && <span className="videos__meta label">— {feature.name}</span>}
      </div>

      {feature ? (
        <div
          ref={frameRef}
          className={`videos__frame reveal ${frameVisible ? 'visible' : ''}`}
        >
          <video
            className="videos__player"
            src={`${feature.src}#t=2`}
            controls
            preload="metadata"
            playsInline
          />
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  )
}
