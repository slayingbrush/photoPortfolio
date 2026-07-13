import './Nav.css'

export default function Nav({ scrolled, page, onGallery, onProjects, onAdmin, onSection, onHome }) {
  // On home, the top of the page belongs entirely to the hero mosaic —
  // the nav slides in only once the user scrolls.
  const hidden = page === 'home' && !scrolled
  return (
    <header className={`nav${scrolled ? ' nav--solid' : ''}${hidden ? ' nav--hidden' : ''}`}>
      <button className="nav__logo" onClick={onHome}>Ahadu Mengesha</button>
      <nav className="nav__links">
        <button
          onClick={onGallery}
          className={`nav__link nav__link--gallery${page === 'gallery' ? ' nav__link--active' : ''}`}
        >
          Gallery
        </button>
        <button
          onClick={onProjects}
          className={`nav__link nav__link--gallery${page === 'projects' ? ' nav__link--active' : ''}`}
        >
          Projects
        </button>
        <button onClick={() => onSection('videos')} className="nav__link nav__link--teal">Film</button>
        <button onClick={() => onSection('about')}  className="nav__link nav__link--coral">About</button>
        <button onClick={() => onSection('hire')}   className="nav__link nav__link--lime">Hire</button>
        {import.meta.env.DEV && (
          <button
            onClick={onAdmin}
            className={`nav__link nav__link--admin${page === 'admin' ? ' nav__link--active' : ''}`}
          >
            Admin
          </button>
        )}
      </nav>
    </header>
  )
}
