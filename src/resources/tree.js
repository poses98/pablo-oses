export const tree = [
  {
    name: 'Client Projects',
    type: 'folder',
    route: 'client-projects',
    content: [
      {
        name: 'ElPolloPaulino',
        date: 'February 2023',
        icon: '/img/icons/paulino.png',
        description: '',
        techStack: ['MongoDB', 'Express', 'React', 'Node'],
        deployment: ['Heroku', 'Netlify'],
        url: 'https://www.elpollopaulino.com',
      },
      {
        name: 'Cisna - SmartHome',
        date: 'March 2024',
        icon: '/img/icons/cisna.png',
        description: '',
        techStack: ['Next.js'],
        deployment: ['Vercel'],
        url: 'https://www.cisnahome.es',
      },
      {
        name: 'TropycalCBD',
        date: 'April 2024',
        icon: '/img/icons/tropycal.png',
        description: '',
        techStack: ['Shopify'],
        deployment: ['Shopify'],
        url: 'https://www.tropycalcbd.com',
      },
    ],
  },
  {
    name: 'Personal Projects',
    type: 'folder',
    route: 'personal-projects',
    content: [
      {
        name: 'Wedding RSVP',
        date: 'July 2021',
        icon: '/img/icons/wedding.jpg',
        description: '',
        techStack: ['Django'],
        deployment: ['Heroku'],
        url: 'none',
      },
      {
        name: 'RouteForecast',
        date: 'August 2023',
        icon: '/img/icons/routeforecast.jpg',
        description: '',
        techStack: ['MongoDB', 'Express', 'React', 'Node'],
        deployment: ['Heroku', 'Netlify'],
        url: 'https://www.routeforecast.app',
      },
      {
        name: 'Personal Portfolio',
        date: 'April 2024',
        icon: '/img/icons/pablooses.jpg',
        description: '',
        techStack: ['Next.js'],
        deployment: ['Vercel'],
        url: 'https://www.pablo-oses.com',
      },
    ],
  },
  {
    name: 'Contact Me',
    type: 'contact',
    content: 'Lorem ipsum dolor sit amet.',
    route: 'contact',
  },
  {
    name: 'Curriculum Vitae',
    type: 'pdf',
    content: 'Lorem ipsum dolor sit amet.',
    route: 'curriculum-vitae',
  },
  {
    name: 'Who Am I',
    type: 'text',
    content: 'Lorem ipsum dolor sit amet.',
    route: 'who-am-i',
  },
];
