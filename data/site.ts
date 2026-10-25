/**
 * ALL site content lives here. Edit this file and every section updates.
 * Nothing in /components or /app contains names, links or copy.
 */
export type WorkItem = {
  id: string;
  title: string;
  category: string;          // must match a key in work.categories
  label: string;             // small tag on the card
  year?: string;
  video?: string;            // YouTube / Vimeo link, or a file such as /videos/film.mp4 (put files in /public/videos)
  poster?: string;           // optional thumbnail, e.g. /images/film.jpg (YouTube thumbnails are automatic)
  ratio?: string;            // "16/9" (default) or "9/16" for vertical reels
  colors: [string, string];  // gradient shown until a poster/video is added
};

// Placeholder titles: rename them as needed. Each project plays a file from /public/videos.
const items: WorkItem[] = [
  { id: 'p1', title: 'Untitled short film', category: 'films', label: 'Short film', video: '/videos/copy_02D6E417-A7AB-4E61-9ED3-CF07A5572F08.mp4', poster: '/images/copy_02D6E417-A7AB-4E61-9ED3-CF07A5572F08.jpg', colors: ['#1F1F24', '#55555E'] },
  { id: 'p2', title: 'Brand film', category: 'ads', label: 'Commercial', video: '/videos/copy_36B41C65-6781-4A92-A577-021668395B2D.mp4', poster: '/images/copy_36B41C65-6781-4A92-A577-021668395B2D.jpg', ratio: '3/4', colors: ['#2A2A30', '#6E6E78'] },
  { id: 'p3', title: 'Travel reel', category: 'reels', label: 'Reel', video: '/videos/copy_3D1826E0-C0EE-4942-91E4-090243FCA61B.mp4', poster: '/images/copy_3D1826E0-C0EE-4942-91E4-090243FCA61B.jpg', ratio: '9/16', colors: ['#18181C', '#45454D'] },
  { id: 'p4', title: 'Wedding highlights', category: 'events', label: 'Event', video: '/videos/copy_63036307-4FF6-419A-B6EC-6DFA4815D015.mp4', poster: '/images/copy_63036307-4FF6-419A-B6EC-6DFA4815D015.jpg', ratio: '9/16', colors: ['#26262C', '#7A7A84'] },
  { id: 'p5', title: 'Music video', category: 'films', label: 'Short film', video: '/videos/copy_6E3E93D9-DAB2-4DA5-A081-0ED347E96276.mp4', poster: '/images/copy_6E3E93D9-DAB2-4DA5-A081-0ED347E96276.jpg', ratio: '9/16', colors: ['#1C1C21', '#5C5C66'] },
  { id: 'p6', title: 'Product launch', category: 'ads', label: 'Commercial', video: '/videos/copy_6EF48814-9276-4B4F-A401-3497662089FB.mp4', poster: '/images/copy_6EF48814-9276-4B4F-A401-3497662089FB.jpg', ratio: '9/16', colors: ['#2E2E35', '#83838D'] },
  { id: 'p7', title: 'Behind the scenes', category: 'events', label: 'Event', video: '/videos/copy_97E162EE-9BE8-43D9-B81F-FEFCBC79C5CA.mp4', poster: '/images/copy_97E162EE-9BE8-43D9-B81F-FEFCBC79C5CA.jpg', ratio: '9/16', colors: ['#202026', '#60606A'] },
  { id: 'p8', title: 'Cinematic b-roll', category: 'films', label: 'Short film', video: '/videos/copy_A4C23772-BB87-45D0-A432-2E140AED0D57.mp4', poster: '/images/copy_A4C23772-BB87-45D0-A432-2E140AED0D57.jpg', ratio: '9/16', colors: ['#24242A', '#71717B'] },
  { id: 'p9', title: 'Social reel', category: 'reels', label: 'Reel', video: '/videos/copy_A62B0B78-7593-4602-9906-3C3078253A8E.mp4', poster: '/images/copy_A62B0B78-7593-4602-9906-3C3078253A8E.jpg', ratio: '9/16', colors: ['#1A1A1F', '#4E4E57'] },
];

export const site = {
  name: 'Manish',
  role: 'Cinematographer & video editor',
  tagline: 'Stories shot on mobile and a mirrorless camera, cut and graded in DaVinci Resolve and CapCut.',
  meta: {
    title: 'Manish – Cinematographer & Video Editor',
    description: 'Portfolio of Manish, a cinematographer and video editor shooting on mobile and mirrorless, editing in DaVinci Resolve and CapCut.',
  },
  availability: 'Open for new projects',

  contact: { email: 'manishrana81234@gmail.com', phone: '' }, // leave phone empty to hide it
  socials: [{ label: 'Instagram', handle: '@manishedits.in', url: 'https://instagram.com/manishedits.in' }],

  nav: [
    { id: 'work', label: 'Work', hint: 'Selected projects' },
    { id: 'about', label: 'About', hint: 'The person behind the lens' },
    { id: 'services', label: 'Services', hint: 'What I can make for you' },
    { id: 'contact', label: 'Contact', hint: 'Start a project' },
  ],
  navCta: { label: 'Let’s talk', href: '#contact' },

  hero: {
    eyebrow: 'Stories shot, cut and graded',
    lines: ['Visual', 'Storyteller'],   // the big headline, one entry per line
    text: 'Cinematographer and video editor shooting on mobile and mirrorless, cutting and grading in DaVinci Resolve and CapCut.',
    image: '/images/manish-hero.jpg',
    side: { top: 'Available for', big: 'Freelance', link: { label: 'Projects', href: '#contact' } },
    hud: '4K · 24 fps · ISO 800',
    reel: 'Showreel',
    primary: { label: 'See the work', href: '#work' },
    secondary: { label: 'Book a shoot', href: '#contact' },
    cue: 'Scroll to roll the reel',
  },

  marquee: ['Cinematography', 'Video editing', 'Colour grading', 'Reels', 'Commercials'],

  work: {
    title: 'Selected work',
    categories: [
      { key: 'all', label: 'All' },
      { key: 'films', label: 'Films' },
      { key: 'ads', label: 'Commercial' },
      { key: 'reels', label: 'Reels' },
      { key: 'events', label: 'Events' },
    ],
    items,
  },

  about: {
    title: 'I shoot it, then I cut it.',
    body: [
      'Hi, I’m Manish, a cinematographer and video editor. I shoot on mobile and a mirrorless camera, and cut everything in DaVinci Resolve and CapCut.',
      'From the first frame to the final export, I take care of the whole process so the look you plan on set is the look that reaches the screen.',
    ],
    image: '', // e.g. '/images/manish.jpg' (file in /public/images)
    stats: [] as { value: number; label: string }[], // e.g. [{ value: 50, label: 'Projects delivered' }]; empty hides the row
  },

  gear: {
    title: 'Gear and software',
    items: [
      { icon: '📱', name: 'Mobile shoot', text: 'Fast and pocketable for b-roll, vertical reels and moments that won’t wait for a setup.' },
      { icon: '📷', name: 'Mirrorless camera', text: 'The main camera for cinematic, shallow-depth shots with full control over lenses and exposure.' },
      { icon: '🎞️', name: 'DaVinci Resolve', text: 'Editing, colour grading and the final finish for films, commercials and long-form work.' },
      { icon: '✂️', name: 'CapCut', text: 'Quick social cuts with captions, effects and trending formats for short-form platforms.' },
    ],
  },

  services: {
    title: 'What I can make for you',
    items: [
      { title: 'Cinematography', text: 'On-location shooting with a cinematic eye.' },
      { title: 'Video editing', text: 'Pacing, sound and story, cut to land.' },
      { title: 'Colour grading', text: 'A consistent look from first clip to last.' },
      { title: 'Reels and shorts', text: 'Vertical edits made to be watched twice.' },
    ],
  },

  cta: {
    title: 'Have a story to film?',
    text: 'Tell me about your project, timeline and where it will be seen.',
  },

  footer: {
    blurb: 'Cinematographer and video editor telling stories in motion.',
    actionTitle: 'Got a project in mind?',
    actionText: 'Send an email or drop a message on Instagram.',
    emailLabel: 'Email me',
    credit: 'Shot on mobile and a mirrorless camera. Cut in DaVinci Resolve and CapCut.',
  },
};
