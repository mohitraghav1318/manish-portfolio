export type Media = { kind: 'youtube' | 'vimeo' | 'file' | 'none'; src: string; poster?: string };

/** Turns a YouTube / Vimeo link or a file path into something the player can use. */
export function parseVideo(url?: string): Media {
  if (!url) return { kind: 'none', src: '' };
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/);
  if (yt) {
    return {
      kind: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&playsinline=1`,
      poster: `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`,
    };
  }
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: 'vimeo', src: `https://player.vimeo.com/video/${vm[1]}?autoplay=1` };
  return { kind: 'file', src: url };
}
