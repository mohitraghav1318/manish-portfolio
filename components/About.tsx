import type { CSSProperties } from 'react';
import { site } from '@/data/site';
import Stats from './Stats';

export default function About() {
  const a = site.about;
  return (
    <section id="about" className="about">
      <div>
        <h2>{a.title}</h2>
        {a.body.map((p, i) => <p key={i} className="lead">{p}</p>)}
        {a.stats.length > 0 && <Stats items={a.stats} />}
      </div>
      <div>
        {a.image ? (
          <img className="portrait" src={a.image} alt={site.name} />
        ) : (
          <div className="thumb ph" style={{ '--a': '#1F1F24', '--b': '#55555E', aspectRatio: '4/5', borderRadius: 6 } as CSSProperties}>
            <span className="play">📷</span>
          </div>
        )}
      </div>
    </section>
  );
}
