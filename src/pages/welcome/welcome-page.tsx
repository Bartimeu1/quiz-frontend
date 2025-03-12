import { useState } from 'react';
import styles from './welcome-page.module.scss';
import { Link } from 'react-router-dom';

import { useTimeout } from '@hooks/use-timeout';
import { routes } from '@constants/routes';

const WELCOME_TIMEOUT = 2300;

export const WelcomePage = () => {
  const [isWelcomeTextVisible, setIsWelcomeTextVisible] = useState(true);

  useTimeout(() => setIsWelcomeTextVisible(false), WELCOME_TIMEOUT);

  return (
    <>
      {isWelcomeTextVisible ? (
        <div className={styles.welcomeText}>
          <p>Ready for the challenge?</p>
        </div>
      ) : (
        <div className={styles.signIn}>
          <p>Quiz App</p>
          <Link to={routes.login}>Login</Link>
          <Link to={routes.register}>Registration</Link>
        </div>
      )}
    </>
  );
};
