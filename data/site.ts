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

// Placeholder projects: add a `video` link to each one to make it playable.
const items: WorkItem[] = [
  { id: 'p1', title: 'Untitled short film', category: 'films', label: 'Short film', colors: ['#6D3BD2', '#B79CF5'] },
  { id: 'p2', title: 'Brand film', category: 'ads', label: 'Commercial', colors: ['#8B5CF6', '#D9CCF6'] },
  { id: 'p3', title: 'Travel reel', category: 'reels', label: 'Reel', ratio: '9/16', colors: ['#3B1A85', '#8B5CF6'] },
  { id: 'p4', title: 'Wedding highlights', category: 'events', label: 'Event', colors: ['#A07CF2', '#E2D8F6'] },
  { id: 'p5', title: 'Music video', category: 'films', label: 'Short film', colors: ['#5B2BB8', '#C7AEF8'] },
  { id: 'p6', title: 'Product launch', category: 'ads', label: 'Commercial', colors: ['#7C4DE0', '#D9CCF6'] },
];

export const site = {
  name: 'Manish',
  role: 'Cinematographer & video editor',
  tagline: 'Stories shot on iPhone 17 and a mirrorless camera, cut and graded in DaVinci Resolve and CapCut.',
  meta: {
    title: 'Manish – Cinematographer & Video Editor',
    description: 'Portfolio of Manish, a cinematographer and video editor shooting on iPhone 17 and mirrorless, editing in DaVinci Resolve and CapCut.',
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
      'Hi, I’m Manish, a cinematographer and video editor. I shoot on iPhone 17 and a mirrorless camera, and cut everything in DaVinci Resolve and CapCut.',
      'From the first frame to the final export, I take care of the whole process so the look you plan on set is the look that reaches the screen.',
    ],
    image: '', // e.g. '/images/manish.jpg' (file in /public/images)
    stats: [] as { value: number; label: string }[], // e.g. [{ value: 50, label: 'Projects delivered' }]; empty hides the row
  },

  gear: {
    title: 'Gear and software',
    items: [
      { icon: '📱', name: 'iPhone 17', text: 'Fast and pocketable for b-roll, vertical reels and moments that won’t wait for a setup.' },
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
    credit: 'Shot on iPhone 17 and a mirrorless camera. Cut in DaVinci Resolve and CapCut.',
  },
};
