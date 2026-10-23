import { site } from '@/data/site';

export default function Kit() {
  const { title, items } = site.gear;
  return (
    <section className="kit">
      <h2>{title}</h2>
      <div className="kit-list">
        {items.map((g) => (
          <div key={g.name} className="kit-row"><i>{g.icon}</i><h3>{g.name}</h3><p>{g.text}</p></div>
        ))}
      </div>
    </section>
  );
}
