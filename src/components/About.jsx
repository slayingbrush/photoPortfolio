import { useReveal } from '../useReveal.js'
import { slotSrc } from '../photos.js'
import './About.css'

export default function About() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section id="about" className="about">
      <div className="about__photo">
        <img
          src={slotSrc('about', 'https://images.unsplash.com/photo-1542273917363-0e0d25c9e5b7?w=1000&q=85')}
          alt="Portrait of Ahadu Mengesha, a photographer, standing in front of a body of water."
          loading="lazy"
        />
      </div>

      <div ref={ref} className="about__content">
        <h2
          className={`about__headline reveal-left ${visible ? 'visible' : ''}`}
        >
          Creating something<br />
          out of<br />
          Nothing.
        </h2>

        <div
          className={`about__body reveal-left ${visible ? 'visible' : ''}`}
          style={{ transitionDelay: '100ms' }}
        >
          <p>
            Electrical engineering student. Photographer. Videomaker.
            The order changes depending on the day.
          </p>
          <p>
            I chase people, smiles, and stories — the small honest things
            that happen when nobody is performing. Photo and video are just
            the two ways I keep them.
          </p>
          <p>
            Based in Knoxville, Tennessee. Come say hi.
          </p>
        </div>

        <div
          className={`about__detail reveal-left ${visible ? 'visible' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="about__detail-bar" />
          <span className="label about__detail-text">
            Available for select projects in 2026
          </span>
        </div>
      </div>
    </section>
  )
}
