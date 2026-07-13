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
          Building things.<br />
          Telling stories.
        </h2>

        <div
          className={`about__body reveal-left ${visible ? 'visible' : ''}`}
          style={{ transitionDelay: '100ms' }}
        >
          <p>
            I'm an electrical engineering student who also happens to love
            photo and video work.
          </p>
          <p>
            I like creating things — new ideas, new ways of looking at
            something ordinary. But more than anything, I love telling
            stories. A photo or a film is just the form that story happens
            to take.
          </p>
          <p>
            Based in Knoxville, Tennessee.
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
