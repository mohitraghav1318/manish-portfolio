import { site } from '@/data/site';
import { BackToTop, Wordmark } from './FooterClient';

export default function Footer() {
  const { name, nav, socials, contact, footer, availability } = site;
  return (
    <footer>
      <div className="f-in">
        <div className="news">
          <div>
            <h3>{footer.actionTitle}</h3>
            <p>{footer.actionText}</p>
          </div>
          <div className="news-act">
            <a className="btn mag" href={`mailto:${contact.email}`}>{footer.emailLabel}</a>
            {socials.map((s) => (
              <a key={s.label} className="btn ghost mag" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </div>
        </div>
        <div className="f-grid">
          <div className="f-brand">
            <div className="logo-t">{name}</div>
            <p>{footer.blurb}</p>
            <span className="status">{availability}</span>
          </div>
          <div>
            <h4>Navigate</h4>
            {nav.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
          </div>
          <div>
            <h4>Find me</h4>
            {socials.map((s) => <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.handle}</a>)}
          </div>
          <div>
            <h4>Say hello</h4>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>}
          </div>
        </div>
      </div>
      <Wordmark text={name} />
      <div className="f-bar">
        <span>© {new Date().getFullYear()} {name}. All rights reserved.</span>
        <span>{footer.credit}</span>
        <BackToTop />
      </div>
    </footer>
  );
}
