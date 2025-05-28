import { UserAvatar } from '@components/user';
import { Loader } from '@components/loader';

import { ErrorIcon, StarIcon } from '@constants/icons';
import { useGetLeadersQuery } from '@store/api/user-api';

import styles from './leaderboard.module.scss';

const RANK_OFFSET = 1;

export const Leaderboard = () => {
  const { data, isLoading, isError } = useGetLeadersQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return (
      <div className={styles.errorPlate}>
        <ErrorIcon width={58} />
        <h2>The leaderboard failed to load</h2>
        <p>Please refresh the page or try again later</p>
      </div>
    );
  }

  return (
    <div className={styles.leaderboard}>
      <h1 className={styles.title}>Leaderboard</h1>
      <div className={styles.board}>
        <div className={styles.topper}>
          <p>Rank</p>
          <p>Name</p>
          <p>Stars</p>
        </div>
        {data.map(({ id, name, stars, avatarId }, index) => {
          const userPosition = index + RANK_OFFSET;

          return (
            <article key={id} className={styles.leaderItem}>
              <p className={styles.rank}>{userPosition}</p>
              <div className={styles.userInfo}>
                <UserAvatar avatarId={avatarId} width="60px" />
                <p>{name}</p>
              </div>
              <div className={styles.rating}>
                <p>{stars}</p>
                <StarIcon width={14} height={14} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
