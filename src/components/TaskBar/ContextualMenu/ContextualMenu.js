import Image from 'next/image';
import styles from './contextualmenu.module.css';
import React from 'react';

const ContextualMenu = React.forwardRef((props, ref) => {
  const socialMedia = [
    {
      socialMediaName: 'linkedin',
      url: 'https://www.linkedin.com/in/poses98/',
      text: 'Connect in LinkedIn',
    },
    {
      socialMediaName: 'github',
      url: 'https://www.github.com/poses98',
      text: 'Check out my GitHub',
    },
    {
      socialMediaName: 'instagram',
      url: 'https://www.instagram.com/poses.dev',
      text: 'Follow me on Instagram',
    },
  ];
  return (
    <div className={styles.container} ref={ref}>
      {socialMedia.map((socialMedia) => {
        return (
          <a
            href={socialMedia.url}
            target="_blank"
            rel="noreferrer"
            key={socialMedia.socialMediaName}
          >
            <div className={styles.menuItem} key={socialMedia.socialMediaName}>
              <Image
                src={`/img/icons/${socialMedia.socialMediaName}.svg`}
                width={30}
                height={30}
                alt={`${socialMedia.socialMediaName} icon`}
              />
              <p>{socialMedia.text} </p>
            </div>
          </a>
        );
      })}
    </div>
  );
});

ContextualMenu.displayName = 'ContextualMenu';

export default ContextualMenu;
