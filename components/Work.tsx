'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react';
import { site } from '@/data/site';
import type { WorkItem } from '@/data/site';
import { parseVideo } from '@/lib/video';
import VideoModal from './VideoModal';

const thumbOf = (e: MouseEvent<HTMLElement>) => e.currentTarget.querySelector<HTMLElement>('.thumb')!;

export default function Work() {
  const { title, items } = site.work;
  const [open, setOpen] = useState<WorkItem | null>(null);
  const [pos, setPos] = useState({ p: 0, start: true, end: false });
  const track = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(null), []);

  const update = useCallback(() => {
    const t = track.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    setPos({ p: max > 0 ? t.scrollLeft / max : 1, start: t.scrollLeft < 4, end: t.scrollLeft > max - 4 });
  }, []);

  useEffect(() => {
    update();
    addEventListener('resize', update);
    return () => removeEventListener('resize', update);
  }, [update]);

  const go = (dir: 1 | -1) => {
    const t = track.current;
    if (t) t.scrollBy({ left: dir * t.clientWidth * 0.8, behavior: 'smooth' });
  };

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
        <div className="car-nav">
          <button className="car-btn" onClick={() => go(-1)} disabled={pos.start} aria-label="Previous">←</button>
          <button className="car-btn" onClick={() => go(1)} disabled={pos.end} aria-label="Next">→</button>
        </div>
      </div>
      <div className="track" ref={track} onScroll={update}>
        {items.map((w) => {
          const m = parseVideo(w.video);
          const poster = w.poster ?? m.poster;
          return (
            <article
              key={w.id}
              data-view
              role="button"
              tabIndex={0}
              aria-label={`Play ${w.title}`}
              className="card"
              onClick={() => setOpen(w)}
              onKeyDown={(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(w); } }}
              onMouseMove={tilt}
              onMouseLeave={reset}
            >
              <div className="thumb" style={{ '--a': w.colors[0], '--b': w.colors[1], aspectRatio: w.ratio ?? '16/9' } as CSSProperties}>
                {poster ? <img className="tv" src={poster} alt="" loading="lazy" />
                  : m.kind === 'file' ? <video className="tv" src={`${m.src}#t=0.5`} muted playsInline preload="metadata" /> : null}
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
      <div className="car-bar" aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(pos.p, 0.08)})` }} /></div>
      {open && <VideoModal item={open} onClose={close} />}
    </section>
  );
}
