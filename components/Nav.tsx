'use client';
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { site } from '@/data/site';

export default function Nav() {
  const { nav, navCta, name, contact, availability } = site;
  const bar = nav.filter((n) => `#${n.id}` !== navCta.href);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  // lock page scroll while the mobile menu is open; close on Escape or when resized to desktop
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const size = () => innerWidth > 760 && setOpen(false);
    addEventListener('keydown', key);
    addEventListener('resize', size);
    return () => { removeEventListener('keydown', key); removeEventListener('resize', size); document.body.style.overflow = ''; };
  }, [open]);

  // highlight the section currently in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    nav.forEach(({ id }) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [nav]);

  return (
    <>
      <nav aria-label="Main">
        <a className="logo" href="#top" onClick={() => setOpen(false)}>{name}</a>
        {bar.map((n) => <a key={n.id} href={`#${n.id}`} className={'nl' + (active === n.id ? ' on' : '')}>{n.label}</a>)}
        <a className="hire nl" href={navCta.href}>{navCta.label}</a>
        <button className="burger" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Menu'}<i />
        </button>
      </nav>
      <div id="menu" className={'menu' + (open ? ' open' : '')} aria-hidden={!open}>
        {nav.map((n, i) => (
          <a key={n.id} href={`#${n.id}`} className="m" style={{ '--i': i } as CSSProperties} onClick={() => setOpen(false)}>
            {n.label}<small>{n.hint}</small>
          </a>
        ))}
        <div className="m-foot">
          <span className="status">{availability}</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
    </>
  );
}
