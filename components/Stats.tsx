'use client';
import { useEffect, useRef, useState } from 'react';

function Num({ n }: { n: number }) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let c = 0;
      timer = setInterval(() => {
        c = Math.min(n, c + Math.max(1, Math.round(n / 30)));
        setV(c);
        if (c >= n) clearInterval(timer);
      }, 40);
    }, { threshold: 0.6 });
    io.observe(ref.current!);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [n]);
  return <b ref={ref}>{v}+</b>;
}

export default function Stats({ items }: { items: { value: number; label: string }[] }) {
  return (
    <div className="stats">
      {items.map((s) => <div key={s.label}><Num n={s.value} /><span>{s.label}</span></div>)}
    </div>
  );
}
