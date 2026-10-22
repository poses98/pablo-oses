import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import { techIcon } from '@/utils/iconProvider';
import styles from './projectfacts.module.css';

const hostname = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

// Quick-scan summary of a project: what a reviewer wants before reading.
export default function ProjectFacts({ date, techStack, deployment, url }) {
  const isLive = Boolean(url) && url !== 'none';

  return (
    <section className={styles.card} aria-label="Project summary">
      <p className={styles.title}>At a glance</p>

      <dl className={styles.list}>
        {date && (
          <div className={styles.row}>
            <dt>Period</dt>
            <dd>{date}</dd>
          </div>
        )}

        {techStack?.length > 0 && (
          <div className={`${styles.row} ${styles.rowWide}`}>
            <dt>Stack</dt>
            <dd>
              <ul className={styles.chips}>
                {techStack.map((tech) => {
                  const icon = techIcon(tech);
                  return (
                    <li key={tech} className={styles.chip}>
                      {icon && <Image src={icon} width={14} height={14} alt="" />}
                      {tech}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        )}

        {deployment?.length > 0 && (
          <div className={styles.row}>
            <dt>Deployment</dt>
            <dd>{deployment.join(' · ')}</dd>
          </div>
        )}

        <div className={styles.row}>
          <dt>Status</dt>
          <dd>
            {isLive ? (
              <span className={styles.status}>
                <span className={styles.dotLive} />
                Live
              </span>
            ) : (
              <span className={styles.status}>
                <span className={styles.dotPrivate} />
                Private / not public
              </span>
            )}
          </dd>
        </div>
      </dl>

      {isLive && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Visit {hostname(url)}
          <FiExternalLink aria-hidden />
        </a>
      )}
    </section>
  );
}
