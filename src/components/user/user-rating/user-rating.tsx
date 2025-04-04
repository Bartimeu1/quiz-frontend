import { StarIcon } from '@constants/icons';

import classNames from 'classnames';

import styles from './user-rating.module.scss';

interface UserRatingProps {
  rating: number;
  className?: string;
}

export const UserRating = ({ rating, className }: UserRatingProps) => {
  return (
    <div className={classNames(styles.starRating, className)}>
      <StarIcon width={12} height={12} />
      <p className={styles.ratingValue}>{rating}</p>
    </div>
  );
};
