export const tree = [
  {
    name: 'Web Applications',
    type: 'folder',
    route: 'web-applications',
    content: [
      {
        name: 'Wedding RSVP',
        date: 'July 2021',
        icon: '/img/icons/wedding.jpg',
        type: 'project',
        content: '/projects/wedding.md',
        techStack: ['Django'],
        deployment: ['Heroku'],
        url: 'none',
      },
      {
        name: 'ElPolloPaulino',
        date: 'February 2023',
        icon: '/img/icons/paulino.png',
        type: 'project',
        content: [
          {
            type: 'ProjectHeader',
            text: 'El Pollo Paulino',
            logo: '/img/icons/paulino.png',
          },
          {
            type: 'SectionHeader',
            text: 'Building a Web System for a Takeout Restaurant',
          },
          {
            type: 'Paragraph',
            text: 'While studying software engineering, I was approached by two friends who were on the verge of opening a new grilled chicken store. They needed a web system for their restaurant and trusted me to build it for them.',
          },
          {
            type: 'SectionHeader',
            text: 'The Challenge',
          },
          {
            type: 'Paragraph',
            text: 'The challenge was to create a **fast** and **secure** web app that would not only provide an exceptional user experience but also allow them to change prices and also capable of sending commercial emails and allowing the user to order online.',
          },
        ],
        techStack: ['MongoDB', 'Express', 'React', 'Node'],
        deployment: ['Heroku', 'Netlify'],
        url: 'https://www.elpollopaulino.com',
      },
      {
        name: 'Cisna - SmartHome',
        date: 'March 2024',
        icon: '/img/icons/cisna.png',
        type: 'project',
        content: '/projects/cisna.md',
        techStack: ['Next.js'],
        deployment: ['Vercel'],
        url: 'https://www.cisnahome.es',
      },
      {
        name: 'TropycalCBD',
        date: 'April 2024',
        icon: '/img/icons/tropycal.png',
        type: 'project',
        content: '/projects/tropycal.md',
        techStack: ['Shopify'],
        deployment: ['Shopify'],
        url: 'https://www.tropycalcbd.com',
      },
      {
        name: 'RouteForecast',
        date: 'August 2023',
        icon: '/img/icons/routeforecast.jpg',
        type: 'project',
        content: '/projects/routeforecast.md',
        techStack: ['MongoDB', 'Express', 'React', 'Node'],
        deployment: ['Heroku', 'Netlify'],
        url: 'https://www.routeforecast.app',
      },
    ],
  },

  {
    name: 'Curriculum Vitae',
    type: 'pdf',
    content: '/pdf/curriculumvitae.pdf',
    route: 'curriculum-vitae',
  },
  {
    name: 'Who Am I',
    type: 'text',
    content:
      '### Who Am I?\n\nHello! My name is **Pablo**, and I am a **Full Stack Developer** with a keen interest in software engineering. I’m ready to gain practical experience and expand my knowledge. While I’m relatively new to the professional scene, I’ve been developing my skills not only through personal projects but also through client projects.\n\n### My Focus\n\nI focus on **SOLID principles** and design patterns, aiming to write clean, efficient, and scalable code. I enjoy using technologies like **Next.js** to build applications that are centered around the user.\n\n### Growth Mindset\n\nI’m a quick learner with a growth mindset, always ready to pick up new skills and stay updated with evolving industry trends.\n\n### Looking for Opportunities\n\nI’m actively looking for opportunities where I can contribute and learn from experienced professionals. Let’s connect and discuss how I can add value to your projects while gaining valuable real-world experience. Looking forward to our conversation!',
    route: 'who-am-i',
  },
  /*   {
    name: 'Contact Me',
    type: 'contact',
    content: '**Lorem** ipsum dolor sit amet.',
    route: 'contact',
  }, */
];
