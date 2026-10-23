'use client';
import { useEffect, useState } from 'react';

const p = (n: number) => String(n).padStart(2, '0');

export default function Timecode() {
  const [f, setF] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setF((x) => x + 1), 1000 / 24);
    return () => clearInterval(id);
  }, []);
  return <span>{`${p(Math.floor(f / 86400))}:${p(Math.floor(f / 1440) % 60)}:${p(Math.floor(f / 24) % 60)}:${p(f % 24)}`}</span>;
}
