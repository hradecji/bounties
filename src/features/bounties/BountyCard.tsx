import type { Bounty } from './types';
import styles from './BountyCard.module.css';

interface BountyCardProps {
  bounty: Bounty;
}

export function BountyCard({ bounty }: BountyCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.inner}>
        <img
          src="/bountypaper.png"
          alt=""
          className={styles.cardImage}
          aria-hidden="true"
        />
        <div className={styles.content}>
          <h2 className={styles.title}>{bounty.title}</h2>
          <div className={styles.player}>by {bounty.playerName}</div>
          <p className={styles.description}>{bounty.description}</p>
        </div>
      </div>
    </article>
  );
}

