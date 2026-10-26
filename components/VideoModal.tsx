'use client';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { WorkItem } from '@/data/site';
import { parseVideo } from '@/lib/video';

export default function VideoModal({ item, onClose }: { item: WorkItem; onClose: () => void }) {
  const m = parseVideo(item.video);
  const [failed, setFailed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    addEventListener('keydown', key);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [onClose]);

  // size for embeds / empty state; works for 16/9 and vertical 9/16
  const [w, h] = (item.ratio ?? '16/9').split('/').map(Number);
  const frame: CSSProperties = { aspectRatio: `${w}/${h}`, width: `min(92vw, 1100px, ${((w / h) * 80).toFixed(2)}vh)` };

  return (
    <div className="mo" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <div className="mo-box" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="mo-x" onClick={onClose} aria-label="Close video">✕</button>
        {m.kind === 'file' && !failed && (
          // user click opened this, so the browser allows autoplay WITH sound
          <video src={m.src} poster={item.poster} controls autoPlay playsInline onError={() => setFailed(true)} />
        )}
        {(m.kind === 'youtube' || m.kind === 'vimeo') && (
          <iframe style={frame} src={m.src} title={item.title} allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen />
        )}
        {(m.kind === 'none' || failed) && (
          <div className="mo-empty" style={frame}>
            <p>{item.video ? 'This video could not be loaded.' : 'The video for this project is coming soon.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
