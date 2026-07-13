import { projects } from '../data.js'
import './ProjectPage.css'

export default function ProjectPage({ projectId, onBack }) {
  const project = projects.find(p => p.id === projectId)
  if (!project) return null

  return (
    <div className="project-page page-enter" id="main-content">
      {/* ── Header ── */}
      <header className="project-page__header">
        <button className="project-page__back" onClick={onBack}>
          <span className="project-page__back-line" />
          <span>All projects</span>
        </button>

        <div className="project-page__hero">
          <div className="project-page__hero-img">
            <img
              src={project.photos[0].src}
              alt={project.title}
              fetchpriority="high"
              loading="eager"
            />
            <div className="project-page__hero-veil" />
          </div>
          <div className="project-page__hero-text">
            <span
              className="project-page__accent-bar"
              style={{ background: `var(--${project.accent})` }}
            />
            <h1 className="project-page__title">{project.title}</h1>
            <p className="project-page__subtitle label">{project.subtitle}</p>
          </div>
        </div>

        {/* ── Summary ── */}
        <div className="project-page__summary">
          <p className="project-page__summary-text">{project.summary}</p>
          <span className="project-page__count label">
            {project.photos.length} photographs
          </span>
        </div>
      </header>

      {/* ── Story ── */}
      <div className="project-page__story">
        {project.photos.map((photo, i) => (
          <article key={i} className="story-frame">
            <div className="story-frame__img">
              <img src={photo.src} alt={photo.title} loading="lazy" />
            </div>
            <div className="story-frame__text">
              <span className="story-frame__index label">
                {String(i + 1).padStart(2, '0')} / {String(project.photos.length).padStart(2, '0')}
              </span>
              <h2 className="story-frame__title">{photo.title}</h2>
              <p className="story-frame__desc">{photo.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* ── Footer nav ── */}
      <div className="project-page__footer-nav">
        <button className="project-page__back project-page__back--footer" onClick={onBack}>
          <span className="project-page__back-line" />
          <span>Back to projects</span>
        </button>
      </div>
    </div>
  )
}
