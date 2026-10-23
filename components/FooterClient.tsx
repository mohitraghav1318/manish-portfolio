'use client';

export function Wordmark({ text }: { text: string }) {
  return (
    <div
      className="f-word"
      onMouseMove={(e) => {
        const el = e.currentTarget, r = el.getBoundingClientRect();
        el.style.setProperty('--wx', ((e.clientX - r.left) / r.width) * 100 + '%');
        el.style.setProperty('--wy', ((e.clientY - r.top) / r.height) * 100 + '%');
      }}
    >
      {text}
    </div>
  );
}

export function BackToTop() {
  return <button onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</button>;
}
