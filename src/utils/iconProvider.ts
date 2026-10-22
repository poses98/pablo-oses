export const iconProvider = (type: string): string => {
  let icon: string = '';
  switch (type) {
    case 'folder':
      icon = '/img/icons/folder.svg';
      break;
    case 'terminal':
      icon = '/img/icons/terminal_white.svg';
      break;
    case 'text':
      icon = '/img/icons/text.svg';
      break;
    case 'contact':
      icon = '/img/icons/email.svg';
      break;
    case 'pdf':
      icon = '/img/icons/pdf.svg';
      break;
    case 'browser':
      icon = '/img/icons/firefox.svg';
      break;
    case 'React':
      icon = '/img/tech/react.svg';
      break;
    case 'Express.js':
      icon = '/img/tech/express-js.svg';
      break;
    case 'MongoDB':
      icon = '/img/tech/mongodb.svg';
      break;
    case 'Next.js':
      icon = '/img/tech/next-js.svg';
      break;
    case 'Shopify':
      icon = '/img/tech/shopify.svg';
      break;
    case 'Django':
      icon = '/img/tech/django.svg';
      break;
    case 'Node.js':
      icon = '/img/tech/nodejs.svg';
      break;
    case 'WordPress':
      icon = '/img/tech/wordpress.svg';
      break;
    case 'WooCommerce':
      icon = '/img/tech/woocommerce.svg';
      break;
    case 'Python':
      icon = '/img/tech/python.svg';
      break;
    case 'Sanity':
      icon = '/img/tech/sanity.png';
      break;
    case 'Vite':
      icon = '/img/tech/vite.svg';
      break;
    case 'TypeScript':
      icon = '/img/tech/typescript.svg';
      break;
    case 'Tailwind CSS':
      icon = '/img/tech/tailwind-css.svg';
      break;
    case 'Supabase':
      icon = '/img/tech/supabase.svg';
      break;
    case 'Stripe':
      icon = '/img/tech/stripe.svg';
      break;
    case 'Turborepo':
      icon = '/img/tech/turborepo.svg';
      break;
    case 'Mux':
      icon = '/img/tech/mux.svg';
      break;
    case 'FastAPI':
      icon = '/img/tech/fastapi.svg';
      break;
    case 'PostgreSQL':
      icon = '/img/tech/postgresql.svg';
      break;
    case 'Anthropic':
      icon = '/img/tech/anthropic.svg';
      break;
    case 'Electron':
      icon = '/img/tech/electron.svg';
      break;
    case 'Puppeteer':
      icon = '/img/tech/puppeteer.svg';
      break;
    case 'Lighthouse':
      icon = '/img/tech/lighthouse.svg';
      break;
    case 'Google Maps':
      icon = '/img/tech/google-maps.svg';
      break;
    default:
      icon = '/img/icons/close.svg';
      break;
  }
  return icon;
};

// Short names used in project metadata that map to an existing icon.
const TECH_ALIASES: Record<string, string> = {
  Express: 'Express.js',
  Node: 'Node.js',
  'Anthropic API': 'Anthropic',
};

// Icon for a technology, or null when there is none (iconProvider falls back
// to a close "X", which reads as an error next to a tech name).
export const techIcon = (tech: string): string | null => {
  const icon = iconProvider(TECH_ALIASES[tech] || tech);
  return icon === '/img/icons/close.svg' ? null : icon;
};
