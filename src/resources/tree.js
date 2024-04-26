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
        content: [
          {
            type: 'ProjectHeader',
            text: 'RSVP Wedding Invitations',
            logo: '/img/icons/wedding.jpg',
            date: 'July 2021',
          },
          {
            type: 'SectionHeader',
            text: 'Building an Online RSVP System for Wedding Invitations',
          },
          {
            type: 'Paragraph',
            text: 'In my journey as a software engineer, I developed an online RSVP system for wedding invitations. This system allowed couples to send invitations via email, WhatsApp, and other platforms, and receive confirmations through the RSVP module.',
          },
          {
            type: 'SectionHeader',
            text: 'The Challenge',
          },
          {
            type: 'Paragraph',
            text: 'The challenge was to create a **fast**, **secure** web app that would not only provide an exceptional user experience but also manage the invitation and confirmation process efficiently.',
          },
          {
            type: 'SectionHeader',
            text: 'The Solution',
          },
          {
            type: 'Paragraph',
            text: 'I decided to use the **Django framework** for this project.',
          },
          {
            type: 'TechStack',
            stack: [
              {
                type: 'TechCard',
                tech: 'Django',
                text: "Django allowed me to create a robust backend for the application. It provided a high-level, MVT (Model-View-Template) architectural pattern that is perfect for dealing with complex, database-driven websites. Django's admin interface, which is created automatically, was used for scaffolding to quickly set up the admin panel.",
              },
            ],
          },
          {
            type: 'SubsectionHeader',
            text: 'Modules and Models',
          },
          {
            type: 'Paragraph',
            text: "The application was structured into different modules, each serving a specific purpose. For instance, one module handled the sending of invitations, while another managed the RSVP confirmations. Django's ORM (Object-Relational Mapping) was used to define the data models. This allowed for a clear and concise representation of the database schema, with each Python class corresponding to a database table, and each attribute of the class representing a field of the table.",
          },
          {
            type: 'SectionHeader',
            text: 'The Result',
          },
          {
            type: 'Paragraph',
            text: 'The result was a **fast**, **secure**, and **user-friendly** web app that met all the needs of the users. They were able to send invitations and manage confirmations effectively.',
          },
          {
            type: 'Paragraph',
            text: "This project was a great learning experience for me and I'm proud of the result. It was a pleasure to develop the RSVP Wedding Invitations system and see it streamline the invitation and confirmation process for many couples.",
          },
        ],
        techStack: ['Django'],
        deployment: ['Heroku'],
        url: 'none',
      },
      {
        name: 'ElPolloPaulino',
        icon: '/img/icons/paulino.png',
        type: 'project',
        content: [
          {
            type: 'ProjectHeader',
            text: 'El Pollo Paulino',
            logo: '/img/icons/paulino.png',
            date: 'February 2023',
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
          {
            type: 'SectionHeader',
            text: 'The Solution',
          },
          {
            type: 'Paragraph',
            text: 'I decided to use the **MERN stack** (MongoDB, Express.js, React, and Node.js) for this project.<br/><br/>Here is how I utilized each technology:',
          },
          {
            type: 'TechStack',
            stack: [
              {
                type: 'TechCard',
                tech: 'React',
                text: 'React allowed me to create an **interactive** and **responsive** UI that works flawlessly on all devices. This ensured that the customers of the store had a seamless experience whether they accessed the website on a desktop, tablet, or mobile device.',
              },
              {
                type: 'TechCard',
                tech: 'Express.js',
                text: 'Express.js, running on Node.js, powered the backend of the application. It handled data efficiently and ensured that the app ran smoothly without any hiccups.',
              },
              {
                type: 'TechCard',
                tech: 'MongoDB',
                text: 'MongoDB was used for flexible data management. It allowed the store owners to easily update prices and other details without any hassle.',
              },
            ],
          },

          {
            type: 'SubsectionHeader',
            text: 'Secure User Authentication and Online Ordering',
          },
          {
            type: 'Paragraph',
            text: "One of the key features of the app was secure user authentication. This ensured that the users' data was safe and secure. Additionally, the app boasted an easy online ordering system, making it convenient for customers to place orders.",
          },
          {
            type: 'SectionHeader',
            text: 'The Result',
          },
          {
            type: 'Paragraph',
            text: 'The result was a **fast**, **secure**, and **user-friendly** web app that met all the needs of the store owners. They were able to manage their store effectively and provide an exceptional user experience serving 100k requests yearly.',
          },
          {
            type: 'ProjectImages',
            images: [
              {
                src: '/img/paulino/paulino-landing.png',
                width: 200,
                height: 360,
                alt: 'Landing Page El Pollo Paulino',
              },
              {
                src: '/img/paulino/paulino-order.png',
                width: 200,
                height: 360,
                alt: 'Order Page El Pollo Paulino',
              },
              {
                src: '/img/paulino/paulino-login.png',
                width: 200,
                height: 360,
                alt: 'Login Modal El Pollo Paulino',
              },
            ],
          },
          {
            type: 'Paragraph',
            text: "This project was a great learning experience for me and I'm proud of the result. It was a pleasure to help my friends with their new venture and see the app contribute to the store's success.",
          },
          { type: 'Link', url: 'https://www.elpollopaulino.com' },
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
        content: [
          {
            type: 'ProjectHeader',
            text: 'CISNA SmartHome',
            logo: '/img/icons/cisna.png',
            date: 'March 2024',
          },
          {
            type: 'SectionHeader',
            text: 'Building a Web System for a Home Automation Company',
          },
          {
            type: 'Paragraph',
            text: 'While expanding my expertise in software engineering, I embarked on a project to build a web system for a home automation company, CISNA SmartHome.',
          },
          {
            type: 'SectionHeader',
            text: 'The Challenge',
          },
          {
            type: 'Paragraph',
            text: "The challenge was to create a **fast**, **secure** web app that would not only provide an exceptional user experience but also showcase the company's products and services, and include a contact form for potential customers.",
          },
          {
            type: 'SectionHeader',
            text: 'The Solution',
          },
          {
            type: 'Paragraph',
            text: 'I decided to use the **Next.js framework** for this project.',
          },
          {
            type: 'TechStack',
            stack: [
              {
                type: 'TechCard',
                tech: 'Next.js',
                text: 'Next.js allowed me to create an **interactive** and **responsive** UI that works flawlessly on all devices. This ensured that the customers of the company had a seamless experience whether they accessed the website on a desktop, tablet, or mobile device.',
              },
            ],
          },
          {
            type: 'SubsectionHeader',
            text: 'Contact Form and Product Showcase',
          },
          {
            type: 'Paragraph',
            text: "One of the key features of the app was a contact form that allowed potential customers to reach out with inquiries. Additionally, the app showcased the company's products and services, making it easy for customers to understand what CISNA SmartHome offers.",
          },
          {
            type: 'SectionHeader',
            text: 'The Result',
          },
          {
            type: 'Paragraph',
            text: 'The result was a **fast**, **secure**, and **user-friendly** web app that met all the needs of the company. They were able to showcase their products effectively and provide an exceptional user experience.',
          },
          {
            type: 'ProjectImages',
            images: [
              {
                src: '/img/cisna/landing.png',
                width: 200,
                height: 360,
                alt: 'Landing Page CISNA SmartHome',
              },
              {
                src: '/img/cisna/house.png',
                width: 200,
                height: 360,
                alt: 'House Page CISNA SmartHome',
              },
              {
                src: '/img/cisna/yubii.png',
                width: 200,
                height: 360,
                alt: 'Yubii Page CISNA SmartHome',
              },
            ],
          },
          {
            type: 'Paragraph',
            text: "This project was a great learning experience for me and I'm proud of the result. It was a pleasure to help CISNA SmartHome with their new venture and see the app contribute to the company's success.",
          },
          { type: 'Link', url: 'https://cisnahome.es' },
        ],
        techStack: ['Next.js'],
        deployment: ['Vercel'],
        url: 'https://www.cisnahome.es',
      },
      {
        name: 'TropycalCBD',
        date: 'April 2024',
        icon: '/img/icons/tropycal.png',
        type: 'project',
        content: [
          {
            type: 'ProjectHeader',
            text: 'Tropycal CBD',
            logo: '/img/icons/tropycal.png',
            date: 'April 2024',
          },
          {
            type: 'SectionHeader',
            text: 'Building an Online Store for a CBD Company',
          },
          {
            type: 'Paragraph',
            text: 'As I continued to expand my expertise in software engineering, I took on a project to build an online store for a CBD company, Tropycal CBD.',
          },
          {
            type: 'SectionHeader',
            text: 'The Challenge',
          },
          {
            type: 'Paragraph',
            text: "The challenge was to create a **fast**, **secure** web store that would not only provide an exceptional user experience but also showcase the company's products and services, and include a secure checkout system for customers.",
          },
          {
            type: 'SectionHeader',
            text: 'The Solution',
          },
          {
            type: 'Paragraph',
            text: 'I decided to use the **Shopify platform** for this project.',
          },
          {
            type: 'TechStack',
            stack: [
              {
                type: 'TechCard',
                tech: 'Shopify',
                text: 'Shopify allowed me to create an **interactive** and **responsive** UI that works flawlessly on all devices. This ensured that the customers of the company had a seamless experience whether they accessed the website on a desktop, tablet, or mobile device. It also provided a secure and reliable checkout system for customers.',
              },
            ],
          },
          {
            type: 'SubsectionHeader',
            text: 'Product Showcase and Secure Checkout',
          },
          {
            type: 'Paragraph',
            text: "One of the key features of the store was a product showcase that allowed potential customers to browse through the company's offerings. Additionally, the store included a secure checkout system, making it easy and safe for customers to make purchases.",
          },
          {
            type: 'SectionHeader',
            text: 'The Result',
          },
          {
            type: 'Paragraph',
            text: 'The result was a **fast**, **secure**, and **user-friendly** online store that met all the needs of the company. They were able to showcase their products effectively and provide an exceptional user experience.',
          },
          {
            type: 'Paragraph',
            text: 'It was a pleasure to help <a href="https://tropycalcbd.com">Tropycal CBD</a> with their new venture and see the store contribute to the company\'s success.',
          },
          {
            type: 'Link',
            url: 'https://tropycalcbd.com',
          },
        ],
        techStack: ['Shopify'],
        deployment: ['Shopify'],
        url: 'https://www.tropycalcbd.com',
      },
      {
        name: 'RouteForecast',
        date: 'August 2023',
        icon: '/img/icons/routeforecast.jpg',
        type: 'project',
        content: [
          {
            type: 'ProjectHeader',
            text: 'RouteForecast',
            logo: '/img/icons/routeforecast.jpg',
            date: 'August 2023',
          },
          {
            type: 'SectionHeader',
            text: 'Building an In-Route Weather Web Application',
          },
          {
            type: 'Paragraph',
            text: 'Inspired by personal journeys, I envisioned and brought to life an in-route weather web application, RouteForecast, aimed to be a dependable guide for fellow travelers.',
          },
          {
            type: 'SectionHeader',
            text: 'The Challenge',
          },
          {
            type: 'Paragraph',
            text: 'The challenge was to create a **fast**, **secure** web app that would not only provide an exceptional user experience but also offer accurate weather insights and precise navigation for riders.',
          },
          {
            type: 'SectionHeader',
            text: 'The Solution',
          },
          {
            type: 'Paragraph',
            text: 'I decided to use the **MERN stack** (MongoDB, Express.js, React, and Node.js) for this project, with Chakra UI for a visually appealing frontend.',
          },
          {
            type: 'TechStack',
            stack: [
              {
                type: 'TechCard',
                tech: 'React',
                text: 'React, coupled with Chakra UI, allowed me to create an **interactive** and **responsive** UI that works flawlessly on all devices. This ensured that the users had a seamless experience whether they accessed the website on a desktop, tablet, or mobile device.',
              },
              {
                type: 'TechCard',
                tech: 'Express.js',
                text: 'Express.js, running on Node.js, powered the backend of the application. It handled data efficiently and ensured that the app ran smoothly without any hiccups.',
              },
            ],
          },
          {
            type: 'SubsectionHeader',
            text: 'Google Maps API and AEMET API',
          },
          {
            type: 'Paragraph',
            text: 'The application integrates the precision of the **Google Maps API** for navigation and the accuracy of the **AEMET API** for weather insights. This combination provides users with reliable route planning and weather forecasting.',
          },
          {
            type: 'SectionHeader',
            text: 'The Result',
          },
          {
            type: 'Paragraph',
            text: 'The result was a **fast**, **secure**, and **user-friendly** web app that met all the needs of the users. They were able to plan their routes effectively and get accurate weather forecasts.',
          },
          {
            type: 'ProjectImages',
            images: [
              {
                src: '/img/routeforecast/landing.png',
                width: 200,
                height: 360,
                alt: 'Landing Page RouteForecast',
              },
              {
                src: '/img/routeforecast/route.png',
                width: 200,
                height: 360,
                alt: 'Route Page RouteForecast',
              },
              {
                src: '/img/routeforecast/weather.png',
                width: 200,
                height: 360,
                alt: 'Weather Page RouteForecast',
              },
            ],
          },
          {
            type: 'Paragraph',
            text: "This project was a great learning experience for me and I'm proud of the result. It was a pleasure to develop RouteForecast and see the app contribute to the success of fellow riders.",
          },
          {
            type: 'Link',
            url: 'https://routeforecast.app',
          },
        ],
        techStack: ['MongoDB', 'Express', 'React', 'Node'],
        deployment: ['Heroku', 'Netlify'],
        url: 'https://www.routeforecast.app',
      },
      {
        name: 'My Portfolio',
        icon: '/img/icons/pablooses.jpg',
        type: 'project',
        content: [
          {
            type: 'ProjectHeader',
            text: 'My Portfolio',
            logo: '/img/icons/pablooses.jpg',
            date: 'April 2024',
          },
          {
            type: 'SectionHeader',
            text: 'Constructing a Desktop OS Styled Web Portfolio',
          },
          {
            type: 'Paragraph',
            text: 'During my journey as a software engineer, I embarked on a personal project to create a unique web portfolio that would showcase my skills and projects. The portfolio was designed to resemble a desktop operating system, complete with interactive windows and file visualizers.',
          },
          {
            type: 'SectionHeader',
            text: 'The Objective',
          },
          {
            type: 'Paragraph',
            text: 'The goal was to build a dynamic and interactive web portfolio that not only displayed my work in an engaging manner but also demonstrated my proficiency in modern web technologies. The portfolio needed to be easily updatable and capable of rendering markdown files.',
          },
          {
            type: 'SectionHeader',
            text: 'The Approach',
          },
          {
            type: 'Paragraph',
            text: 'For this project, I chose to use the Next.js framework.',
          },
          {
            type: 'TechStack',
            stack: [
              {
                type: 'TechCard',
                tech: 'Next.js',
                text: 'Next.js provided the foundation for building a dynamic and interactive web portfolio. The use of React Hooks allowed for efficient state management and component lifecycle control, ensuring a smooth user experience across all devices.',
              },
            ],
          },
          {
            type: 'SubsectionHeader',
            text: 'Automated Deployment with Vercel',
          },
          {
            type: 'Paragraph',
            text: 'One of the key features of the portfolio was its automated deployment process. By pushing changes to a specific branch on GitHub, the portfolio would automatically update on Vercel, ensuring that the latest version of my work was always available for viewing.',
          },
          {
            type: 'SectionHeader',
            text: 'The Outcome',
          },
          {
            type: 'Paragraph',
            text: 'The outcome was a dynamic, interactive, and user-friendly web portfolio that effectively showcased my skills and projects. The portfolio’s unique desktop OS design and interactive windows provided an engaging user experience.',
          },
          {
            type: 'Paragraph',
            text: 'This project was an enriching experience for me and I’m proud of the result. It was a joy to build a platform that effectively showcases my work and skills.',
          },
          {
            type: 'Link',
            url: 'https://pablooses.com',
          },
        ],
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
