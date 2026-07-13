import { useReveal } from '../useReveal.js'
import { services } from '../data.js'
import './ForHire.css'

function ServiceCard({ service }) {
  return (
    <div
      className="service-card"
      style={{ '--accent': `var(--${service.accent})` }}
    >
      <div className="service-card__bar" />
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <ul className="service-card__list">
        {service.details.map(d => (
          <li key={d}>
            <span className="service-card__dot" />
            {d}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ForHire() {
  const [headerRef, headerVisible] = useReveal()
  const [cardsRef, cardsVisible] = useReveal(0.08)

  return (
    <section id="hire" className="for-hire section-pad">
      <div
        ref={headerRef}
        className={`for-hire__header reveal ${headerVisible ? 'visible' : ''}`}
      >
        <h2 className="for-hire__title">
          Let's make<br />something real.
        </h2>
        <p className="for-hire__sub">
          Select project work, booked directly. No agency middlemen.
        </p>
      </div>

      <div
        ref={cardsRef}
        className={`for-hire__cards ${cardsVisible ? 'cards-visible' : ''}`}
      >
        {services.map(s => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>

      <div
        className={`for-hire__cta reveal ${headerVisible ? 'visible' : ''}`}
        style={{ transitionDelay: '300ms' }}
      >
        <a href="mailto:ahadut.mengesha@gmail.com" className="for-hire__btn">
          Get in touch
        </a>
        <span className="for-hire__cta-note label">Response within 48 hours</span>
      </div>
    </section>
  )
}
