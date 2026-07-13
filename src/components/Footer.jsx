import './Footer.css'

export default function Footer({ onSection }) {
  return (
    <footer className="footer" id="contact">
      <div className="footer__contact">
        <h2 className="footer__contact-title">Say hello.</h2>
        <div className="footer__contact-links">
          <a className="footer__contact-link" href="mailto:ahadut.mengesha@gmail.com">
            ahadut.mengesha@gmail.com
          </a>
          <a
            className="footer__contact-link"
            href="https://instagram.com/am.photo6"
            target="_blank"
            rel="noopener noreferrer"
          >
            @am.photo6
          </a>
        </div>
      </div>

      <div className="footer__top">
        <div className="footer__logo">Ahadu Mengesha</div>
        <nav className="footer__nav">
          <button onClick={() => onSection?.('videos')} className="footer__link footer__link--teal">Film</button>
          <button onClick={() => onSection?.('about')} className="footer__link footer__link--coral">About</button>
          <button onClick={() => onSection?.('hire')}  className="footer__link footer__link--lime">Hire</button>
        </nav>
      </div>
      <div className="footer__bottom">
        <span className="footer__copy">
          &copy; {new Date().getFullYear()} Ahadu Mengesha. All rights reserved.
        </span>
        <span className="footer__tagline label">People. Smiles. Stories.</span>
      </div>
    </footer>
  )
}
