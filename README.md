# Portfolio – Next.js 15 (App Router, TypeScript)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Everything editable lives in `data/site.ts`
Name, role, contact, socials, nav, hero text, work items, bio, gear, services, footer. Components contain no hard-coded content.

## Adding videos (popup player with sound)
Each project in `work.items` takes a `video`:
- YouTube or Vimeo link: `video: 'https://youtu.be/XXXXXXXXXXX'` (thumbnail is picked automatically for YouTube)
- Your own file: put it in `public/videos/` and use `video: '/videos/film.mp4'`. Add `poster: '/images/film.jpg'` for a custom thumbnail
- Vertical reels: add `ratio: '9/16'`

Clicking a card opens the popup and plays with sound. Esc, the close button or a click outside closes it.
Use `/public/images/manish.jpg` + `about.image` for the portrait, and `about.stats` for numbers (hidden while empty).
