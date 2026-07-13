import './ProjectsPage.css'

export default function ProjectsPage() {
  return (
    <div className="projects-page page-enter" id="main-content">
      <header className="projects-page__header">
        <h1 className="projects-page__title">Projects</h1>
      </header>

      <div className="projects-page__soon">
        <div className="projects-page__soon-bar" />
        <p className="projects-page__soon-title">Coming soon.</p>
        <p className="projects-page__soon-sub">
          Long-form photo series are in the works — stories told frame by
          frame, with the words to go with them. Check back shortly.
        </p>
      </div>
    </div>
  )
}
