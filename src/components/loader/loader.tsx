import { LoaderIcon } from '@constants/icons';

import styles from './loader.module.scss';

import classNames from 'classnames';

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={classNames(styles.loader, className)}>
      <LoaderIcon />
    </div>
  );
};
