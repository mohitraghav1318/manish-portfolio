import { site } from '@/data/site';

export default function Services() {
  const { title, items } = site.services;
  return (
    <section id="services">
      <h2>{title}</h2>
      <div style={{ marginTop: '2.4rem', borderTop: '1px solid var(--line)' }}>
        {items.map((s) => (
          <a key={s.title} className="svc" href="#contact">{s.title}<small>{s.text}</small></a>
        ))}
      </div>
    </section>
  );
}
