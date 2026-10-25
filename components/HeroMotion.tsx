'use client';
import { useLayoutEffect } from 'react';
import gsap from 'gsap';

/** GSAP text reveal for the hero. Renders nothing; animates the [data-hx] elements of .hx. */
export default function HeroMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('.hx');
    if (!root) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const q = (s: string) => root.querySelectorAll(`[data-hx="${s}"]`);

    const ctx = gsap.context(() => {
      root.classList.add('ready');
      if (reduce) return;
      const arc = root.querySelector<SVGPathElement>('.hx-arc path');
      const len = arc?.getTotalLength() ?? 0;
      if (arc) gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });

      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from(q('img'), { clipPath: 'inset(100% 0 0 0)', scale: 1.15, duration: 1.6, ease: 'expo.out' }, 0)
        .from(q('fade')[0], { y: 20, autoAlpha: 0, duration: .8 }, .15)
        .from(q('line'), { yPercent: 110, skewY: 6, duration: 1.3, stagger: .14 }, .25)
        .from(q('word'), { yPercent: 105, duration: .9, stagger: .018 }, .7)
        .to(arc ?? {}, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, .5)
        .from(Array.from(q('fade')).slice(1), { y: 24, autoAlpha: 0, duration: .9, stagger: .12 }, 1.05);
    }, root);
    return () => { ctx.revert(); root.classList.remove('ready'); };
  }, []);
  return null;
}
