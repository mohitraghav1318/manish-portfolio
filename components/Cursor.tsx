'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    if (!fine) {
      const h = document.querySelector<HTMLElement>('.hero');
      if (!h) return;
      const touch = (e: TouchEvent) => {
        const r = h.getBoundingClientRect(), t = e.touches[0];
        h.style.setProperty('--mx', ((t.clientX - r.left) / r.width) * 100 + '%');
        h.style.setProperty('--my', ((t.clientY - r.top) / r.height) * 100 + '%');
      };
      h.addEventListener('touchstart', touch, { passive: true });
      h.addEventListener('touchmove', touch, { passive: true });
      return () => { h.removeEventListener('touchstart', touch); h.removeEventListener('touchmove', touch); };
    }

    const dot = dotRef.current!, ring = ringRef.current!, label = labelRef.current!;
    const html = document.documentElement;
    html.classList.add('has-cursor');

    const hero = document.querySelector<HTMLElement>('.hero');
    const blobs = [...document.querySelectorAll<HTMLElement>('.blob')];
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, last = 0, raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
      const t = performance.now();
      if (t - last > 45) {
        last = t;
        const s = document.createElement('i');
        s.className = 'spark';
        s.style.left = x + 'px'; s.style.top = y + 'px';
        s.style.setProperty('--dx', Math.random() * 44 - 22 + 'px');
        s.style.setProperty('--dy', Math.random() * 40 - 4 + 'px');
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 700);
      }
      if (hero && y < hero.offsetHeight) {
        const r = hero.getBoundingClientRect();
        const px = (x - r.left) / r.width, py = (y - r.top) / r.height;
        hero.style.setProperty('--mx', px * 100 + '%');
        hero.style.setProperty('--my', py * 100 + '%');
        blobs.forEach((b, i) => (b.style.transform = `translate(${(px - 0.5) * (i + 1) * -40}px,${(py - 0.5) * (i + 1) * -40}px)`));
      }
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as Element).closest('[data-view],a,button,input');
      const view = !!t && t.hasAttribute('data-view');
      ring.className = 'cur-ring' + (t ? (view ? ' view' : ' link') : '');
      label.textContent = view ? 'PLAY' : '';
    };
    const down = () => ring.classList.add('down');
    const up = () => ring.classList.remove('down');
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);

    // magnetic buttons
    const magnets = [...document.querySelectorAll<HTMLElement>('.mag')].map((el) => {
      const mm = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      };
      const ml = () => { el.style.transform = ''; };
      el.addEventListener('mousemove', mm);
      el.addEventListener('mouseleave', ml);
      return () => { el.removeEventListener('mousemove', mm); el.removeEventListener('mouseleave', ml); };
    });

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
      magnets.forEach((off) => off());
      html.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cur-dot" />
      <div ref={ringRef} className="cur-ring"><div ref={labelRef} className="ri" /></div>
    </>
  );
}
