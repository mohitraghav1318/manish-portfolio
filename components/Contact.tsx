import { site } from '@/data/site';

export default function Contact() {
  const { cta, contact, socials } = site;
  return (
    <section id="contact">
      <div className="cta">
        <h2>{cta.title}</h2>
        <p>{cta.text}</p>
        <a className="btn mag" href={`mailto:${contact.email}`}>{contact.email}</a>{' '}
        {socials.map((s) => (
          <a key={s.label} className="btn ghost mag" href={s.url} target="_blank" rel="noopener noreferrer">{s.handle}</a>
        ))}
      </div>
    </section>
  );
}
