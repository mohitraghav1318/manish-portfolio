import { Fragment } from 'react';
import { site } from '@/data/site';
import HeroMotion from './HeroMotion';

export default function Hero() {
  const { hero } = site;
  return (
    <header className="hx" id="top">
      <div className="hx-art" aria-hidden="true">
        <svg className="hx-arc" viewBox="0 0 200 600" data-hx="arc"><path d="M10 10 A 300 300 0 0 1 10 590" /></svg>
        <img className="hx-img" src={hero.image} alt="" data-hx="img" />
        <svg className="hx-star" viewBox="0 0 24 24" data-hx="fade"><path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z" /></svg>
      </div>

      <div className="hx-copy">
        <p className="hx-eye" data-hx="fade">{hero.eyebrow}</p>
        <h1 className="hx-h" aria-label={hero.lines.join(' ')}>
          {hero.lines.map((l) => (
            <span className="ln" key={l} aria-hidden="true"><span className="ln-i" data-hx="line">{l}</span></span>
          ))}
        </h1>
        <p className="hx-p" aria-label={hero.text}>
          {hero.text.split(' ').map((w, i) => (
            <Fragment key={i}><span className="w" aria-hidden="true"><span data-hx="word">{w}</span></span>{' '}</Fragment>
          ))}
        </p>
        <div className="hx-cta" data-hx="fade">
          <a className="hx-btn mag" href={hero.primary.href}>{hero.primary.label} <span aria-hidden="true">↗</span></a>
          <a className="hx-link" href={hero.secondary.href}>{hero.secondary.label} <i aria-hidden="true">↓</i></a>
        </div>
      </div>

      <div className="hx-side" data-hx="fade">
        <small>{hero.side.top}</small>
        <strong>{hero.side.big}</strong>
        <a href={hero.side.link.href}>{hero.side.link.label} ↗</a>
      </div>
      <HeroMotion />
    </header>
  );
}
