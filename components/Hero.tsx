import type { CSSProperties } from 'react';
import { site } from '@/data/site';
import Timecode from './Timecode';

export default function Hero() {
  const { name, role, tagline, hero } = site;
  const ring = Array(3).fill(`${hero.reel} ✦ `).join('');
  return (
    <header className="hero" id="top">
      <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
      <div className="vf"><i /><i /><i /><i /></div>
      <div className="hud">
        <span className="rec">REC <Timecode /></span>
        <span>{hero.hud}</span>
      </div>
      <div className="mid">
        <a className="reel mag" href={hero.primary.href} aria-label={hero.reel}>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <defs><path id="rc" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
            <text><textPath href="#rc" textLength="289" lengthAdjust="spacing">{ring}</textPath></text>
          </svg>
          <span>▶</span>
        </a>
        <h1 className="name" aria-label={name}>
          {[...name].map((c, i) => <span key={i} style={{ '--i': i } as CSSProperties}>{c}</span>)}
        </h1>
        <p className="role">
          {role}
          <small>{tagline}</small>
        </p>
      </div>
      <div className="hero-foot">
        <div>
          <a className="btn mag" href={hero.primary.href}>{hero.primary.label}</a>{' '}
          <a className="btn ghost mag" href={hero.secondary.href}>{hero.secondary.label}</a>
        </div>
        <span className="cue">{hero.cue}</span>
      </div>
    </header>
  );
}
