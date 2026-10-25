'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '@/data/site';
import type { WorkItem } from '@/data/site';
import { parseVideo } from '@/lib/video';
import VideoModal from './VideoModal';

gsap.registerPlugin(ScrollTrigger);

const thumbOf = (e: MouseEvent<HTMLElement>) => e.currentTarget.querySelector<HTMLElement>('.thumb')!;

export default function Work() {
  const { title, items } = site.work;
  const [open, setOpen] = useState<WorkItem | null>(null);
  const [pos, setPos] = useState({ p: 0, start: true, end: false });
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pin = useRef<ScrollTrigger | null>(null);
  const close = useCallback(() => setOpen(null), []);

  // mobile / no-pin: progress follows native swipe scroll
  const update = useCallback(() => {
    const t = track.current;
    if (!t || pin.current) return;
    const max = t.scrollWidth - t.clientWidth;
    setPos({ p: max > 0 ? t.scrollLeft / max : 1, start: t.scrollLeft < 4, end: t.scrollLeft > max - 4 });
  }, []);

  useEffect(() => {
    const t = track.current!, s = section.current!;
    const mm = gsap.matchMedia();

    // desktop: pin the section and let vertical scroll drive the carousel sideways
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      t.classList.add('pinned');
      const dist = () => Math.max(0, t.scrollWidth - t.clientWidth);
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: s,
          start: 'top top',
          end: () => '+=' + dist(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (st) => setPos({ p: st.progress, start: st.progress < 0.01, end: st.progress > 0.99 }),
        },
      });
      pin.current = tween.scrollTrigger ?? null;
      gsap.from(t.querySelectorAll('.card'), {
        y: 80, autoAlpha: 0, duration: 1, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: s, start: 'top 75%' },
      });
      return () => { t.classList.remove('pinned'); pin.current = null; };
    });

    // mobile: simple stagger in, native swipe
    mm.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from(t.querySelectorAll('.card'), {
        x: 60, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: t, start: 'top 85%' },
      });
    });

    update();
    addEventListener('resize', update);
    return () => { mm.revert(); removeEventListener('resize', update); };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const st = pin.current, t = track.current;
    if (st) {
      const step = 1 / Math.max(1, items.length - 1);
      const p = gsap.utils.clamp(0, 1, st.progress + dir * step * 1.5);
      scrollTo({ top: st.start + (st.end - st.start) * p, behavior: 'smooth' });
    } else if (t) {
      t.scrollBy({ left: dir * t.clientWidth * 0.8, behavior: 'smooth' });
    }
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
    <section id="work" ref={section}>
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
