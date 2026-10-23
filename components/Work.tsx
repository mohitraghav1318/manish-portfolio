'use client';
import { useCallback, useState } from 'react';
import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react';
import { site } from '@/data/site';
import type { WorkItem } from '@/data/site';
import { parseVideo } from '@/lib/video';
import VideoModal from './VideoModal';

const thumbOf = (e: MouseEvent<HTMLElement>) => e.currentTarget.querySelector<HTMLElement>('.thumb')!;

export default function Work() {
  const { title, categories, items } = site.work;
  const [f, setF] = useState('all');
  const [open, setOpen] = useState<WorkItem | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const tilt = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect(), t = thumbOf(e);
    t.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 10 + 'deg');
    t.style.setProperty('--rx', (0.5 - (e.clientY - r.top) / r.height) * 8 + 'deg');
  };
  const reset = (e: MouseEvent<HTMLElement>) => {
    const t = thumbOf(e);
    t.style.removeProperty('--rx'); t.style.removeProperty('--ry');
  };

  return (
    <section id="work">
      <div className="head">
        <h2>{title}</h2>
        <div className="chips">
          {categories.map((c) => (
            <button key={c.key} className={'chip' + (f === c.key ? ' on' : '')} onClick={() => setF(c.key)}>{c.label}</button>
          ))}
        </div>
      </div>
      <div className="grid">
        {items.map((w, i) => {
          const m = parseVideo(w.video);
          const poster = w.poster ?? m.poster;
          const hasImage = !!poster || m.kind === 'file';
          return (
            <article
              key={w.id}
              data-view
              role="button"
              tabIndex={0}
              aria-label={`Play ${w.title}`}
              className={'card' + (i ? '' : ' wide') + (f !== 'all' && w.category !== f ? ' hide' : '')}
              onClick={() => setOpen(w)}
              onKeyDown={(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(w); } }}
              onMouseMove={tilt}
              onMouseLeave={reset}
            >
              <div className={'thumb' + (hasImage ? '' : ' ph')} style={{ '--a': w.colors[0], '--b': w.colors[1] } as CSSProperties}>
                {poster ? <img className="tv" src={poster} alt="" loading="lazy" />
                  : m.kind === 'file' ? <video className="tv" src={`${m.src}#t=0.5`} muted playsInline preload="metadata" /> : null}
                <span className="tag">{w.label}</span>
                <span className="play">▶</span>
              </div>
              <div className="info">
                <h3>{w.title}</h3>
                {w.year && <span>{w.year}</span>}
              </div>
            </article>
          );
        })}
      </div>
      {open && <VideoModal item={open} onClose={close} />}
    </section>
  );
}
