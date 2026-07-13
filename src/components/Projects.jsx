import { useReveal } from '../useReveal.js'
import { projects } from '../data.js'
import './Projects.css'

function ProjectCard({ project, onProject }) {
  return (
    <article className="project-card" aria-label={project.title}>
      <button className="project-card__inner" onClick={() => onProject(project.id)}>
        <span className="project-card__thumb">
          <img src={project.thumbnail} alt={project.title} loading="lazy" />
          <span className="project-card__thumb-overlay" />
        </span>
        <span className="project-card__body">
          <span className="project-card__bar" style={{ background: `var(--${project.accent})` }} />
          <span className="project-card__title">{project.title}</span>
          <span className="project-card__subtitle label">{project.subtitle}</span>
          <span className="project-card__summary">{project.summary.slice(0, 120)}…</span>
          <span className="project-card__cta">
            <span className="project-card__cta-line" />
            <span>View series</span>
          </span>
        </span>
      </button>
    </article>
  )
}

export default function Projects({ onProject }) {
  const [headerRef, headerVisible] = useReveal()
  const [gridRef, gridVisible] = useReveal(0.05)

  return (
    <section id="projects" className="projects section-pad">
      <div ref={headerRef} className={`projects__header reveal ${headerVisible ? 'visible' : ''}`}>
        <h2 className="projects__title">Projects</h2>
        <span className="projects__meta label">— {projects.length} series</span>
      </div>

      <div ref={gridRef} className={`projects__grid ${gridVisible ? 'grid-visible' : ''}`}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} onProject={onProject} />
        ))}
      </div>
    </section>
  )
}
