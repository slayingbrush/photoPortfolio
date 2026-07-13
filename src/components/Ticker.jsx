import './Ticker.css'

const items = [
  'Available for select projects — 2026',
  'Knoxville, Tennessee',
  'People',
  'Smiles',
  'Stories',
  'Photo',
  'Film',
]

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[0, 1].map(copy => (
          <div className="ticker__row" key={copy}>
            {items.map((text, i) => (
              <span className="ticker__item" key={i}>
                {text}
                <span className="ticker__sep">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
