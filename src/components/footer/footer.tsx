import { socialLinks } from './config';

import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.socialNav}>
        {socialLinks.map(({ key, icon, link }) => (
          <a href={link} key={key}>
            {icon}
          </a>
        ))}
      </nav>
      <p>© 2025 Quiz App. Все права защищены</p>
    </footer>
  );
};
