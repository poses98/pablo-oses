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
    default:
      icon = '/img/icons/close.svg';
      break;
  }
  return icon;
};
