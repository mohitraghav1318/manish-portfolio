'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Scroll-driven reveals for every section. Renders nothing. */
export default function ScrollFx() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // split section headings into words so each word can slide up from a mask
    const heads = Array.from(document.querySelectorAll<HTMLElement>('section h2'));
    const originals = heads.map((h) => h.innerHTML);
    heads.forEach((h) => {
      const words = (h.textContent ?? '').trim().split(/\s+/);
      h.setAttribute('aria-label', words.join(' '));
      h.innerHTML = words.map((w) => `<span class="wd" aria-hidden="true"><span>${w}</span></span>`).join(' ');
    });

    const ctx = gsap.context(() => {
      heads.forEach((h) => {
        gsap.from(h.querySelectorAll('.wd > span'), {
          yPercent: 110, rotate: 4, duration: 1.1, ease: 'power4.out', stagger: 0.08,
          scrollTrigger: { trigger: h, start: 'top 85%' },
        });
      });

      // hero parallax while scrolling away
      gsap.to('.hx-img, .hx-arc', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.hx', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hx-copy', { yPercent: -25, autoAlpha: 0.2, ease: 'none', scrollTrigger: { trigger: '.hx', start: 'top top', end: 'bottom top', scrub: true } });

      // marquee leans with scroll speed
      const strip = document.querySelector<HTMLElement>('.strip > div');
      if (strip) {
        const skew = gsap.quickTo(strip, 'skewX', { duration: 0.4, ease: 'power3' });
        ScrollTrigger.create({ onUpdate: (s) => skew(gsap.utils.clamp(-12, 12, s.getVelocity() / -150)) });
      }

      // lists and blocks fade up in sequence
      const batch = (sel: string, vars: gsap.TweenVars = {}) =>
        ScrollTrigger.batch(sel, {
          start: 'top 88%',
          onEnter: (els) => gsap.fromTo(els, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1, overwrite: true, ...vars }),
        });
      gsap.set('.lead, .kit-row, .svc, .stats, .news, .f-grid > div, .cta > p, .cta > .btn', { autoAlpha: 0 });
      batch('.lead'); batch('.kit-row'); batch('.svc'); batch('.stats'); batch('.news'); batch('.f-grid > div'); batch('.cta > p, .cta > .btn');

      // about photo: clip reveal + slow parallax
      const pic = document.querySelector('.about .portrait, .about .thumb');
      if (pic) {
        gsap.from(pic, { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: pic, start: 'top 80%' } });
        gsap.fromTo(pic, { yPercent: 8 }, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.about', scrub: true } });
      }

      // contact card grows into place
      gsap.from('.cta', { scale: 0.9, borderRadius: '6rem', ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'top 45%', scrub: true } });

      // giant footer name rises as you reach the bottom
      gsap.from('.f-word', { yPercent: 60, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.f-word', start: 'top bottom', end: 'bottom bottom', scrub: true } });
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(t);
      ctx.revert();
      heads.forEach((h, i) => { h.innerHTML = originals[i]; h.removeAttribute('aria-label'); });
    };
  }, []);
  return null;
}
